import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterAbility } from 'src/app/shared/interfaces/character-ability';
import { CharacterFriend } from 'src/app/shared/interfaces/character-friend';
import { CharacterTeam } from 'src/app/shared/interfaces/character-team';
import { FilterCharacter } from 'src/app/shared/interfaces/filter-character';
import { KeyValue } from 'src/app/shared/interfaces/key-value';
import { PageConfig } from 'src/app/shared/interfaces/page-config';
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
    { key: 1, value: 'Marvel' },
    { key: 2, value: 'DC' },
  ]

  characterTypes: KeyValue[] = [
    { key: 1, value: 'Hero' },
    { key: 2, value: 'Villain' },
    { key: 3, value: 'Anti-Hero' },
  ]

  characterFriends: CharacterFriend[] = [
    { name: 'Batman' },
    { name: 'Wonder Woman' },
    { name: 'Aquaman' },
    { name: 'Flash' },
  ]

  characterAbilities: CharacterAbility[] = [
    { name: 'Superhuman strength', description: 'Ability of move heavy things' },
  ]

  characterTeams: CharacterTeam[] = [
    { name: 'Justice League' },
    { name: 'Daily Planet' },
  ]

  displayedColumns: string[] = ['name', 'description'];
  dataSource = this.characterAbilities;

  constructor(private activatedRoute: ActivatedRoute, private fetchService: ApiFetchServiceService) {
  }

  isEditable = false;
  characterName!: string;

  ngOnInit(): void {
    this.isEditable = this.activatedRoute.snapshot.queryParamMap.get('editable') === 'true';
    this.characterName = this.activatedRoute.snapshot.paramMap.get('name') || '';

    const pageConfig: PageConfig = {
      pageNumber: 1,
      pageSize: DEFAULT_PAGE_SIZE
    }

    const characterFilters: FilterCharacter = {
      name: this.characterName
    }
    this.fetchService.getCharacterByName(API_TO_USE, pageConfig, characterFilters)
      .subscribe(data => {
        console.log(data);
      });
  }

  onAddRow(event: Event) {
    event.preventDefault();
  }
}
