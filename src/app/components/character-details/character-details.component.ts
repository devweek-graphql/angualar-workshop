import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterTypeEnum, CharacterUniverseEnum } from 'src/app/shared/enums/enums';
import { AddCharacterPayload, FirstAppearance, GetCharactersFilters, UpdateCharacterPayload } from 'src/app/shared/interfaces/interfaces';
import { Ability, Character, KeyValue, Team } from 'src/app/shared/interfaces/interfaces';
import { API_TO_USE } from 'src/app/shared/properties/properties';
import { ApiFetchServiceService } from 'src/app/shared/services/api-fetch-service.service';
@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit {

  universes: KeyValue[] = [
    {
      key: CharacterUniverseEnum.MARVEL,
      value: 'Marvel',
    },
    {
      key: CharacterUniverseEnum.DC,
      value: 'DC',
    }
  ]

  characterTypes: KeyValue[] = [
    {
      key: CharacterTypeEnum.HERO,
      value: 'Hero',
    },
    {
      key: CharacterTypeEnum.VILLAIN,
      value: 'Villain',
    },
    {
      key: CharacterTypeEnum.ANTIHERO,
      value: 'Antihero',
    },
  ]

  character: Character = {
    name: '',
    type: CharacterTypeEnum.NO_DEFINE,
    universe: CharacterUniverseEnum.NO_DEFINE,
    firstAppearance: { comicName: '', year: '' },
    characterAvatar: this.getAvatar(),
    abilities: [{ name: '', description: '' }],
    allies: [],
    partOf: [{ name: '', description: '' }],
  };
  characterName!: string;
  characterUniverse!: CharacterUniverseEnum;
  characterType!: CharacterTypeEnum;
  characterFirstAppearance: FirstAppearance = { comicName: '', year: '' };
  characterAllies: string[] = [''];
  characterTeams: Team[] = [{ name: '', description: '' }];
  characterAbilities: Ability[] = [{ name: '', description: '' }];

  displayedColumnsForAbilities: string[] = ['name', 'description'];
  displayedColumnsTeams: string[] = ['name', 'description'];
  displayedColumnsForAllies: string[] = ['name'];

  isEditable!: boolean;
  characterNameParam!: string;

  @ViewChild('teams') teamsTable!: MatTable<Team[]>;
  @ViewChild('abilities') abilitiesTable!: MatTable<Ability[]>;
  @ViewChild('allies') alliesTable!: MatTable<String[]>;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private fetchService: ApiFetchServiceService) {
    this.isEditable = this.activatedRoute.snapshot.queryParamMap.get('editable') === 'true';
  }

  ngOnInit(): void {
    this.characterNameParam = this.activatedRoute.snapshot.paramMap.get('name') || '';

    if (!this.characterNameParam) {
      this.router.navigateByUrl('/home');
    }

    if (this.characterNameParam !== 'new') {
      this.fetchService.getCharacterById(API_TO_USE, this.characterNameParam)
        .subscribe(data => {
          if (!data) return;
          this.character = data;
          this.loadDataOnForms()
        });
    }
  }

  private loadDataOnForms() {
    this.characterName = this.character?.name || '';
    this.characterType = this.character?.type || '';
    this.characterUniverse = this.character?.universe || '';
    this.characterFirstAppearance = this.character?.firstAppearance || { comicName: '', year: '' };
    this.characterAbilities = this.character?.abilities || [{ name: '', description: '' }];
    this.characterAllies = this.character?.allies?.map(allied => allied.name) || [''];
    this.characterTeams = this.character?.partOf || [{ name: '', description: '' }];
  }

  onAddAllied(event: Event) {
    this.characterAllies = Object.assign([], this.characterAllies)
    this.characterAllies.push('');
    this.alliesTable.renderRows();
  }
  onRemoveAllied(event: Event) {
    this.characterAllies.pop()
    this.alliesTable.renderRows();
  }

  onAddTeam(event: Event) {
    this.characterTeams = Object.assign([], this.characterTeams)
    this.characterTeams.push({name: '', description: ''});
    this.teamsTable.renderRows();
  }
  onRemoveTeam(event: Event) {
    this.characterTeams.pop()
    this.teamsTable.renderRows();
  }

  onAddAbility(event: Event) {
    this.characterAbilities = Object.assign([], this.characterAbilities)
    this.characterAbilities.push({name: '', description: ''});
    this.abilitiesTable.renderRows();
  }
  onRemoveAbility(event: Event) {
    this.characterAbilities.pop()
    this.abilitiesTable.renderRows();
  }

  onSaveForm() {

    if (this.characterNameParam === 'new') {
      this.fetchService.createCharacter(API_TO_USE, this.buildCharacterCreationPayload())
        .subscribe(response => {
          if (response) {
            this.router.navigateByUrl(`character/${response?.name}`)
          } else {
            throw new Error(`something happened trying to create character ${this.characterName}`)
          }
        }
        );
    } else {
      console.log(this.buildCharacterUpdatePayload())
      this.fetchService.updateCharacter(API_TO_USE, this.character?.name, this.buildCharacterUpdatePayload()).subscribe(response => {
        if (response) {
          this.router.navigateByUrl(`character/${response?.name}`)
        } else {
          throw new Error(`something happened trying to update character ${this.characterName}`)
        }
      });
    }
    console.log(this.character);
  }

  onEdit() {
    this.isEditable = true;
  }

  onCancelEdit() {
    this.isEditable = false;
  }

  private buildCharacterCreationPayload(): AddCharacterPayload {

    return {
      name: this.characterName,
      universe: this.characterUniverse,
      type: this.characterType,
      alliesIds: this.characterAllies,
      abilitiesIds: this.characterAbilities.map(ability => ability.name),
      firstAppearanceId: this.characterFirstAppearance?.comicName,
      partOfIds: this.characterTeams.map(team => team.name)

    }
  }


  private buildCharacterUpdatePayload(): UpdateCharacterPayload {

    const newAbilities: string[] = this.getNewAbilities();
    const newAllies: string[] = this.getNewAllies();
    const newTeams: string[] = this.getNewTeams();

    return {
      ...(this.characterUniverse !== this.character.universe && { universe: this.characterUniverse }),
      ...(this.characterType !== this.character.type && { type: this.characterType }),
      ...(this.characterFirstAppearance?.comicName !== this.character?.firstAppearance?.comicName && { fistAppearanceId: this.characterFirstAppearance?.comicName }),
      ...(newAbilities.length > 0 && { abilitiesIdsToAdd: newAbilities}),
      ...(newAllies.length > 0 && { alliesIdsToAdd: newAllies}),
      ...(newTeams.length > 0 && { partOfIdsToAdd: newTeams}),
    };
  }

  private getNewAbilities(): string[] {
    let abilitiesIds: string[] = this.character?.abilities?.length === 0 && this.characterAbilities?.length > 0 ? this.characterAbilities.map(abilities => abilities.name) : [];
    if (abilitiesIds.length > 0) {
      return abilitiesIds;
    }
    abilitiesIds = this.characterAbilities?.
      filter(characterAbility =>
        this.character?.abilities?.filter(ability => ability?.name !== characterAbility.name)?.length !== 0
      ).map(ability => ability.name)

    return abilitiesIds;
  }

  private getNewAllies(): string[] {
    let alliesIds: string[] = this.character?.allies?.length === 0 && this.characterAllies?.length > 0 ? this.characterAllies : [];
    if (alliesIds.length > 0) {
      return alliesIds;
    }

    alliesIds = this.characterAllies?.
      filter(characterAllied =>
        this.character?.allies?.filter(allied => allied?.name !== characterAllied)?.length !== 0
      )

    return alliesIds;
  }

  private getNewTeams(): string[] {
    let abilitiesIds: string[]  = this.character?.abilities?.length === 0 && this.characterAbilities?.length > 0 ? this.characterAbilities.map(ability => ability.name) : [];
    if (abilitiesIds.length > 0) {
      return abilitiesIds;
    }
    abilitiesIds = this.characterTeams?.
      filter(characterTeam =>
        this.character?.partOf?.filter(team => team?.name !== characterTeam.name)?.length !== 0
      ).map(team => team.name)

    return abilitiesIds;
  }


  getAvatar() {
    return this.character?.characterAvatar || './assets/avatars/default_avatar.png';
  }
}
