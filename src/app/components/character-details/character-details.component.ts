import { Component, OnInit } from '@angular/core';
import { CharacterAbility } from 'src/app/interfaces/character-ability';
import { CharacterFriend } from 'src/app/interfaces/character-friend';
import { CharacterTeam } from 'src/app/interfaces/character-team';
import { KeyValue } from 'src/app/interfaces/key-value';
import { ApiFetchServiceGraphQLService } from 'src/app/shared/services/api-fetch-service-graphql.service';
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

  constructor() {
  }

  ngOnInit(): void {
  }

  onAddRow(event: Event) {
    event.preventDefault();
  }
}
