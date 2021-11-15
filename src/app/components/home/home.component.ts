import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { API_TO_USE } from 'src/app/shared/properties/properties';
import { ApiFetchServiceService } from 'src/app/shared/services/api-fetch-service.service';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS } from '../page-config';
import { Character, PageConfig } from 'src/app/shared/interfaces/interfaces';

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

  pageConfig!: PageConfig;

  ngOnInit(): void {
    this.pageConfig = {
      pageNumber: 1,
      pageSize: DEFAULT_PAGE_NUMBER
    };

    this.apiFetchService.getCharacters(API_TO_USE, this.pageConfig)
      .subscribe(data => {
        this.characters = data;
        this.pagelength = data.length;
        console.log(data);
        console.log(this.pagelength);
      });
  }

  getAvatar(character: Character) {
    return character.characterAvatar ? character.characterAvatar : './assets/avatars/default_avatar.png';
  }

  handlePagination(event: PageEvent) {
      this.pageConfig = {
        pageNumber: event.pageIndex + 1, pageSize: event.pageSize
      };
      this.apiFetchService.getCharacters(API_TO_USE, this.pageConfig).subscribe(data => { this.characters = Array.isArray(data) ? data : Array.of(data) });
  }

  loadCharacters(characters: Character[]) {
    this.characters = characters;
    this.pagelength = characters.length;
  }
}
