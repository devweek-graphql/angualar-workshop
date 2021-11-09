import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS, PageConfig } from './components/page-config';


export interface Character {
  characterId: string;
  characterName: string;
  characterType: string;
  characterDescription: string;
  characterAvatar: string;

/*
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  */
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

}


