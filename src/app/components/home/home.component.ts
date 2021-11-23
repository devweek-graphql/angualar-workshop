import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { API_TO_USE } from 'src/app/shared/properties/properties';
import { ApiFetchServiceService } from 'src/app/shared/services/api-fetch-service.service';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS } from '../page-config';
import { Character, GetCharactersFilters } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private apiFetchService: ApiFetchServiceService) { }

  characters: Character[] = [];

  pageNumber = DEFAULT_PAGE_NUMBER;
  pageSize = DEFAULT_PAGE_SIZE;
  pagelength = this.characters.length;
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS;

  filters!: GetCharactersFilters;

  ngOnInit(): void {

    this.filters = {
      limit: DEFAULT_PAGE_SIZE,
      offset: DEFAULT_PAGE_NUMBER,
    }

    this.apiFetchService.getCharactersWithFilters(API_TO_USE, this.filters)
      .subscribe(data => {
        this.characters = data;
        this.pagelength = data.length;
      });
  }

  getAvatar(character: Character) {
    return character.characterAvatar ? character.characterAvatar : './assets/avatars/default_avatar.png';
  }

  handlePagination(event: PageEvent) {
      this.filters = {
        offset: event.pageIndex + 1, limit: event.pageSize
      };
      this.apiFetchService.getCharactersWithFilters(API_TO_USE, this.filters).subscribe(data => this.characters = data);
  }

  loadCharacters(charactersToLoad: Character[]) {
      this.characters = charactersToLoad;
      this.pagelength = charactersToLoad.length;
  }

  removeCharacterCard(characterName: string) {
    this.characters = this.characters.filter(character => character.name !== characterName)
  }
}
