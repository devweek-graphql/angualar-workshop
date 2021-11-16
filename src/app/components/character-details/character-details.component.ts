import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterTypeEnum, CharacterUniverseEnum } from 'src/app/shared/enums/enums';
import { FilterCharacter } from 'src/app/shared/interfaces/interfaces';
import { Ability, Character, KeyValue, PageConfig, Team } from 'src/app/shared/interfaces/interfaces';
import { API_TO_USE } from 'src/app/shared/properties/properties';
import { ApiFetchServiceService } from 'src/app/shared/services/api-fetch-service.service';
import { DEFAULT_PAGE_SIZE } from '../page-config';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms"
@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit {

  character!: Character;
  universes: KeyValue[] = [
    {
      key: 1,
      value: CharacterUniverseEnum.MARVEL,
    },
    {
      key: 1,
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

  characterFriends: Character[] = [];
  characterTeams: Team[] = [{name: '', description: ''}];

  displayedColumnsForAbilities: string[] = ['name', 'description'];
  displayedColumnsForFriends: string[] = ['name'];
  dataSourceAbilities: Ability[] = [{name: '', description: ''}];

  displayedColumnsTeams: string[] = ['name', 'description'];

  createFormGroup() {
    return this.fb.group({
      characterName: [{value: '', disabled: !this.isEditable}, [Validators.required]],
      characterUniverse: [{value: '', disabled: !this.isEditable}, [Validators.required]],
      characterType: [{value: '', disabled: !this.isEditable}, [Validators.required]],
      characterFirstAppeareanceComic: [{value: [''], disabled: !this.isEditable}],
      characterFirstAppeareanceYear: [{value: [''], disabled: !this.isEditable}],
      characterTeams: [''],
      characterTeamName: [{value: [''], disabled: !this.isEditable}],
      characterTeamDescription: [{value: [''], disabled: !this.isEditable}],
      characterAbilities: [''],
      characterAbilityName: [{value: [''], disabled: !this.isEditable }, [Validators.required]],
      characterAbilityDescription: [{value: [''], disabled: !this.isEditable}, [Validators.required]],
      characterAllies: [''],
      characterAlliedName: [{value: [''], disabled: !this.isEditable}],
    });
  }

  characterDetailsForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private fetchService: ApiFetchServiceService) {
  }

  isEditable = false;
  characterName!: string;

  ngOnInit(): void {

    this.isEditable = this.activatedRoute.snapshot.queryParamMap.get('editable') === 'true';
    this.characterName = this.activatedRoute.snapshot.paramMap.get('name') || '';

    this.characterDetailsForm = this.createFormGroup();

    if (!this.characterName) {
      this.router.navigateByUrl('/home');
    }

    const addRowsButtons: HTMLCollection = document.getElementsByClassName('add-row');
    addRowsButtons.length

    const pageConfig: PageConfig = {
      pageNumber: 1,
      pageSize: DEFAULT_PAGE_SIZE
    }

    const characterFilters: FilterCharacter = {
      name: this.characterName,
    }


    this.fetchService.getCharactersWithFilters(API_TO_USE, pageConfig, characterFilters)
      .subscribe(data => {
        if (!data) return;
        this.character = Array.isArray(data) ? data[0] : data;
        this.dataSourceAbilities = this.character?.abilities || [];
        this.characterFriends = this.character.allies;
        this.characterTeams = this.character.partOf;

        this.loadFormData();

        console.log(this.characterDetailsForm.controls);
      });
  }

  private loadFormData () {

    const {name, type, universe, firstAppearance, abilities, allies, partOf} = this.character;

    this.characterDetailsForm.patchValue({
      characterName: name,
      characterUniverse: universe,
      characterType: type,
      characterFirstAppeareanceComic: firstAppearance.comicName,
      characterFirstAppeareanceYear: firstAppearance.year,
      characterTeams: partOf,
      characterAbilities: abilities,
      characterAllies: allies,
    })
  }

  onAddRow(event: Event) {
    event.preventDefault();
  }

  onSaveForm() {

    console.log(this.characterDetailsForm.value);
  }

  getAvatar() {
    return this.character?.characterAvatar || './assets/avatars/default_avatar.png';
  }
}
