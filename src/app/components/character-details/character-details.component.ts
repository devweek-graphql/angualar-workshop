import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterTypeEnum, CharacterUniverseEnum } from 'src/app/shared/enums/enums';
import { AddCharacterPayload, FirstAppereance, UpdateCharacterPayload } from 'src/app/shared/interfaces/interfaces';
import { Ability, Character, KeyValue, Team } from 'src/app/shared/interfaces/interfaces';
import { API_TO_USE, GRAPHQL_API, REST_API } from 'src/app/shared/properties/properties';
import { ApiFetchServiceService } from 'src/app/shared/services/api-fetch-service.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit {

  universes: KeyValue[] = [
    {
      key: CharacterUniverseEnum.MARVEL,
      value: CharacterUniverseEnum.MARVEL,
    },
    {
      key: CharacterUniverseEnum.DC,
      value: CharacterUniverseEnum.DC,
    }
  ]

  characterTypes: KeyValue[] = [
    {
      key: CharacterTypeEnum.HERO,
      value: CharacterTypeEnum.HERO,
    },
    {
      key: CharacterTypeEnum.VILLAIN,
      value: CharacterTypeEnum.VILLAIN,
    },
    {
      key: CharacterTypeEnum.ANTIHERO,
      value: CharacterTypeEnum.ANTIHERO,
    },
  ]

  allTeams: Team[] = []
  allAbilities: Ability[] = []
  allFirstAppereances: FirstAppereance[] = []
  allAllies: string[] = []



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
  characterFirstAppearance: FirstAppereance = { comicName: '', year: '' };
  characterAllies: string[] = [''];
  characterTeams: Team[] = [{ name: '', description: '' }];
  characterAbilities: Ability[] = [{ name: '', description: '' }];

  displayedColumnsForAbilities: string[] = ['name', 'description'];
  displayedColumnsTeams: string[] = ['name', 'description'];
  displayedColumnsForAllies: string[] = ['name'];

  isEditable!: boolean;
  isCreationMode!: boolean;
  characterNameParam!: string;

  @ViewChild('teams') teamsTable!: MatTable<Team[]>;
  @ViewChild('abilities') abilitiesTable!: MatTable<Ability[]>;
  @ViewChild('allies') alliesTable!: MatTable<String[]>;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private fetchService: ApiFetchServiceService) {
    this.fetchService.getAbilities(REST_API).subscribe(data => {
      this.allAbilities = data;
    });
    this.fetchService.getTeams(REST_API).subscribe(data => {
      this.allTeams = data
    });
    this.fetchService.getFirstAppereances(REST_API).subscribe(data => {
      this.allFirstAppereances = data
    });

    //Este metodo solo funciona para GraphQL
    this.fetchService.getCharactersIds().subscribe(data => {
      this.allAllies = data
    });
  }

  ngOnInit(): void {
    this.characterNameParam = this.activatedRoute.snapshot.paramMap.get('name') || '';
    this.isCreationMode = this.characterNameParam === 'new';
    this.isEditable = this.activatedRoute.snapshot.queryParamMap.get('editable') === 'true' || this.isCreationMode;

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
    Object.assign(this.characterFirstAppearance, this.character?.firstAppearance || { comicName: '', year: '' });
    this.characterAbilities = this.character?.abilities || [{ name: '', description: '' }];
    this.characterAllies = this.character?.allies?.map(allied => allied.name) || [''];
    this.characterTeams = this.character?.partOf || [{ name: '', description: '' }];
  }

  onLoadDescriptionForAbility(index: number): void {
    const abilityName = this.characterAbilities[index].name;
    this.characterAbilities[index].description = this.allAbilities.filter(ability => ability.name === abilityName).map(filteredAbility => filteredAbility.description)[0]
  }

  onLoadDescriptionForTeam(index: number): void {
    const teamName = this.characterTeams[index].name;
    this.characterTeams[index].description = this.allTeams.filter(team => team.name === teamName).map(filteredTeam => filteredTeam.description)[0]
  }

  loadYearForFirstAppereance(comicName: string): void {
    this.characterFirstAppearance.year = this.allFirstAppereances.filter(firstAppereance => firstAppereance.comicName === comicName).map(filteredfirstAppereance => filteredfirstAppereance.year)[0]
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
    this.characterTeams.push({ name: '', description: '' });
    this.teamsTable.renderRows();
  }
  onRemoveTeam(event: Event) {
    this.characterTeams.pop()
    this.teamsTable.renderRows();
  }

  onAddAbility(event: Event) {
    this.characterAbilities = Object.assign([], this.characterAbilities)
    this.characterAbilities.push({ name: '', description: '' });
    this.abilitiesTable.renderRows();
  }
  onRemoveAbility(event: Event) {
    this.characterAbilities.pop()
    this.abilitiesTable.renderRows();
  }

  onSaveForm() {

    if (this.isCreationMode) {
      this.fetchService.createCharacter(API_TO_USE, this.buildCharacterCreationPayload())
        .subscribe(response => {
          if (response) {
            this.router.navigateByUrl('/home');
          } else {
            throw new Error(`something happened trying to create character ${this.characterName}`)
          }
        }
        );
    } else {
      console.log(this.buildCharacterUpdatePayload());
      this.fetchService.updateCharacter(API_TO_USE, this.character?.name, this.buildCharacterUpdatePayload()).subscribe(response => {
        if (response) {
          this.router.navigateByUrl('/home');
        } else {
          throw new Error(`something happened trying to update character ${this.characterName}`)
        }
      });
    }
  }

  getComoboboxValues(TeamOrAbilityArray: Team[] | Ability[]): KeyValue[] {
    return TeamOrAbilityArray?.map(element => ({ key: element.name, value: element.name }))
  }

  getComoboboxValuesForFirstAppereance(): KeyValue[] {
    return this.allFirstAppereances?.map(element => ({ key: element.comicName, value: element.comicName }))
  }

  getComoboboxValuesForAllies(): KeyValue[] {
    return this.allAllies?.map(element => ({ key: element, value: element }))
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
      ...(this.characterFirstAppearance?.comicName !== this.character?.firstAppearance?.comicName && { firstAppearanceId: this.characterFirstAppearance?.comicName }),
      ...(newAbilities.length > 0 && { abilitiesIdsToAdd: newAbilities }),
      ...(newAllies.length > 0 && { alliesIdsToAdd: newAllies }),
      ...(newTeams.length > 0 && { partOfIdsToAdd: newTeams }),
    };
  }

  private getNewAbilities(): string[] {
    let abilitiesIds: string[] = []

    let abilitiesOnlyInCharacter = _.differenceWith(this.characterAbilities, this.character?.abilities || [], (val1, val2) => val1.name === val2.name).map(ability => ability.name);


    abilitiesIds = _.merge(abilitiesOnlyInCharacter, this.characterAbilities.map(ability =>  ability.name))
    return abilitiesIds;
  }

  private getNewAllies(): string[] {
    let alliesIds: string[] = [];

    let alliesOnlyInCharacter = _.differenceWith(this.characterAllies, this.character?.allies?.map(allied => allied.name) || [], (val1, val2) => val1 === val2);

    alliesIds = _.merge(alliesOnlyInCharacter, this.characterAllies)
    return alliesIds;
  }

  private getNewTeams(): string[] {
    let teamsIds: string[] = _.differenceWith(this.characterTeams, this.character?.partOf || [], (val1, val2) => val1.name === val2.name).map(team => team.name);

    teamsIds = _.merge(teamsIds, this.characterTeams.map(team => team.name))
    //If there is not differences, all that is on characterTeams is sent
    if (teamsIds.length === 0) {
      teamsIds = this.characterTeams.map(team => team.name)
    }

    return teamsIds;
  }


  getAvatar() {
    return this.character?.characterAvatar || './assets/avatars/default_avatar.png';
  }
}
