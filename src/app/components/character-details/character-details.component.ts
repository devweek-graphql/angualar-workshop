import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterTypeEnum, CharacterUniverseEnum } from 'src/app/shared/enums/enums';
import { FirstAppearance, GetCharactersFilters } from 'src/app/shared/interfaces/interfaces';
import { Ability, Character, KeyValue, Team } from 'src/app/shared/interfaces/interfaces';
import { API_TO_USE } from 'src/app/shared/properties/properties';
import { ApiFetchServiceService } from 'src/app/shared/services/api-fetch-service.service';
import { DEFAULT_PAGE_SIZE } from '../page-config';
@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit {

  universes: KeyValue[] = [
    {
      key: 1,
      value: CharacterUniverseEnum.MARVEL,
    },
    {
      key: 2,
      value: CharacterUniverseEnum.DC,
    }
  ]

  characterTypes: KeyValue[] = [
    {
      key: 1,
      value: CharacterTypeEnum.HERO,
    },
    {
      key: 2,
      value: CharacterTypeEnum.VILLAIN,
    },
    {
      key: 3,
      value: CharacterTypeEnum.ANTIHERO,
    },
  ]

  character: Character = {
    name: '',
    type: CharacterTypeEnum.NO_DEFINE,
    universe: CharacterUniverseEnum.NO_DEFINE,
    firstAppearance: {comicName: '', year: ''},
    characterAvatar: this.getAvatar(),
    abilities: [{name: '', description: ''}],
    allies: [],
    partOf: [{name: '', description: ''}],
  };
  characterName!: string;
  characterUniverse!: CharacterUniverseEnum;
  characterType!: CharacterTypeEnum;
  characterFirstAppearance!: FirstAppearance;
  characterAllies!: String[];// = [];
  characterTeams!: Team[];// = [{name: '', description: ''}];
  characterAbilities!: Ability[];// = [{name: '', description: ''}];

  displayedColumnsForAbilities: string[] = ['name', 'description'];
  displayedColumnsTeams: string[] = ['name', 'description'];
  displayedColumnsForAllies: string[] = ['name'];

  isEditable = false;
  characterNameParam!: string;

  @ViewChild('teams') teamsTable!: MatTable<Team[]>;
  @ViewChild('abilities') abilitiesTable!: MatTable<Ability[]>;
  @ViewChild('allies') alliesTable!: MatTable<String[]>;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private fetchService: ApiFetchServiceService) {
  }

  ngOnInit(): void {

    this.isEditable = this.activatedRoute.snapshot.queryParamMap.get('editable') === 'true';
    this.characterNameParam = this.activatedRoute.snapshot.paramMap.get('name') || '';

    if (!this.characterNameParam) {
      this.router.navigateByUrl('/home');
    }

    if (this.characterNameParam !== 'new') {
      this.fetchService.getCharacterById(API_TO_USE, this.characterNameParam)
        .subscribe(data => {
          if (!data) return;
          this.character = Array.isArray(data) ? data[0] : data;
          this.characterName = this.character?.name;
          this.characterType = this.character?.type || '';
          this.characterUniverse = this.character?.universe || '';
          this.characterFirstAppearance = this.character?.firstAppearance || { comicName: '', year: '' };
          this.characterAbilities = this.character?.abilities || [];
          this.characterAllies = this.character?.allies?.map(allied => allied.name) || [''];
          this.characterTeams = this.character?.partOf || [];

          console.log(this.characterAllies)
        });
    } else {
      this.characterName = this.character?.name;
      this.characterType = this.character?.type || '';
      this.characterUniverse = this.character?.universe || '';
      this.characterFirstAppearance = this.character?.firstAppearance || { comicName: '', year: '' };
      this.characterAbilities = this.character?.abilities || [];
      this.characterAllies = this.character?.allies?.map(allied => allied.name) || [''];
      this.characterTeams = this.character?.partOf || [];

      console.log(this.characterAllies)
    }

  }

  onAddAllied(event: Event) {
    this.characterAllies.push('');
    this.alliesTable.renderRows();
  }

  onAddTeam(event: Event) {
    this.characterTeams.push({ name: '', description: '' });
    this.teamsTable.renderRows();
  }

  onAddAbility(event: Event) {
    this.characterAbilities.push({ name: '', description: '' });
    this.abilitiesTable.renderRows();
  }

  onRemoveAllied(event: Event) {
    this.characterAllies.pop()
    this.alliesTable.renderRows();
  }

  onRemoveTeam(event: Event) {
    this.characterTeams.pop()
    this.teamsTable.renderRows();
  }

  onRemoveAbility(event: Event) {
    this.characterAbilities.pop()
    this.abilitiesTable.renderRows();
  }

  onSaveForm() {

    if (this.characterNameParam === 'new') {
      this.fetchService.createCharacter(API_TO_USE, this.character)
        .subscribe(response => {
          if (response) {
            this.router.navigateByUrl(`character/${response?.name}`)
          } else {
            throw new Error(`something happened trying to create character ${this.characterName}`)
          }
        }
        );
    } else {
      this.fetchService.updateCharacter(API_TO_USE, this.character, this.characterNameParam).subscribe(response => {
        if (response) {
          this.router.navigateByUrl(`character/${response?.name}`)
        } else {
          throw new Error(`something happened trying to update character ${this.characterName}`)
        }
      });
    }
    console.log(this.character);
  }

  buildCharacterPayload() {
    this.character.characterAvatar = this.getAvatar();
    this.character.name = this.characterName;
    this.character.type = this.characterType;
    this.character.universe = this.characterUniverse;
    this.character.firstAppearance = this.characterFirstAppearance;
    this.character.abilities = this.characterAbilities;
    // this.character.allies = this.characterAllies;
    this.character.partOf = this.characterTeams;
  }

  getAvatar() {
    return this.character?.characterAvatar || './assets/avatars/default_avatar.png';
  }
}
