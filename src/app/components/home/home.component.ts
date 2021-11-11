import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Character } from 'src/app/interfaces/character';
import { API_TO_USE } from 'src/app/shared/properties/properties';
import { ApiFetchServiceService } from 'src/app/shared/services/api-fetch-service.service';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS } from '../page-config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private apiFetchService: ApiFetchServiceService) { }

  characters: Character[] = [
    /*{
      characterId: '1234',
      characterName: 'Superman 1',
      characterType: 'Hero',
      characterDescription: 'Superman es un superhéroe ficticio que apareció por primera vez en los cómics estadounidenses publicados por DC Comics. ​El personaje fue creado por el escritor estadounidense Jerry Siegel y el artista canadiense Joe Shuster en 1933'
    },
    {
      characterId: '1234',
      characterName: 'Superman 2',
      characterType: 'Hero',
      characterDescription: 'Superman es un superhéroe ficticio que apareció por primera vez en los cómics estadounidenses publicados por DC Comics. ​El personaje fue creado por el escritor estadounidense Jerry Siegel y el artista canadiense Joe Shuster en 1933'
    },
    {
      characterId: '1234',
      characterName: 'Superman 3',
      characterType: 'Hero',
      characterDescription: 'Superman es un superhéroe ficticio que apareció por primera vez en los cómics estadounidenses publicados por DC Comics. ​El personaje fue creado por el escritor estadounidense Jerry Siegel y el artista canadiense Joe Shuster en 1933'
    },
    {
      characterId: '1234',
      characterName: 'Superman 4',
      characterType: 'Hero',
      characterDescription: 'Superman es un superhéroe ficticio que apareció por primera vez en los cómics estadounidenses publicados por DC Comics. ​El personaje fue creado por el escritor estadounidense Jerry Siegel y el artista canadiense Joe Shuster en 1933'
    },
    {
      characterId: '1234',
      characterName: 'Superman 5',
      characterType: 'Hero',
      characterDescription: 'Superman es un superhéroe ficticio que apareció por primera vez en los cómics estadounidenses publicados por DC Comics. ​El personaje fue creado por el escritor estadounidense Jerry Siegel y el artista canadiense Joe Shuster en 1933'
    },
    {
      characterId: '1234',
      characterName: 'Superman 6',
      characterType: 'Hero',
      characterDescription: 'Superman es un superhéroe ficticio que apareció por primera vez en los cómics estadounidenses publicados por DC Comics. ​El personaje fue creado por el escritor estadounidense Jerry Siegel y el artista canadiense Joe Shuster en 1933'
    },
    {
      characterId: '1234',
      characterName: 'Superman 7',
      characterType: 'Hero',
      characterDescription: 'Superman es un superhéroe ficticio que apareció por primera vez en los cómics estadounidenses publicados por DC Comics. ​El personaje fue creado por el escritor estadounidense Jerry Siegel y el artista canadiense Joe Shuster en 1933'
    },
    {
      characterId: '1234',
      characterName: 'Superman 8',
      characterType: 'Hero',
      characterDescription: 'Superman es un superhéroe ficticio que apareció por primera vez en los cómics estadounidenses publicados por DC Comics. ​El personaje fue creado por el escritor estadounidense Jerry Siegel y el artista canadiense Joe Shuster en 1933'
    },
    {
      characterId: '1234',
      characterName: 'Superman 9',
      characterType: 'Hero',
      characterDescription: 'Superman es un superhéroe ficticio que apareció por primera vez en los cómics estadounidenses publicados por DC Comics. ​El personaje fue creado por el escritor estadounidense Jerry Siegel y el artista canadiense Joe Shuster en 1933'
    },
    {
      characterId: '1234',
      characterName: 'Superman 10',
      characterType: 'Hero',
      characterDescription: 'Superman es un superhéroe ficticio que apareció por primera vez en los cómics estadounidenses publicados por DC Comics. ​El personaje fue creado por el escritor estadounidense Jerry Siegel y el artista canadiense Joe Shuster en 1933'
    },
    {
      characterId: '1234',
      characterName: 'Superman 11',
      characterType: 'Hero',
      characterDescription: 'Superman es un superhéroe ficticio que apareció por primera vez en los cómics estadounidenses publicados por DC Comics. ​El personaje fue creado por el escritor estadounidense Jerry Siegel y el artista canadiense Joe Shuster en 1933'
    },
    {
      characterId: '1234',
      characterName: 'Superman 12',
      characterType: 'Hero',
      characterDescription: 'Superman es un superhéroe ficticio que apareció por primera vez en los cómics estadounidenses publicados por DC Comics. ​El personaje fue creado por el escritor estadounidense Jerry Siegel y el artista canadiense Joe Shuster en 1933'
    },
    {
      characterId: '1234',
      characterName: 'Superman 13',
      characterType: 'Hero',
      characterDescription: 'Superman es un superhéroe ficticio que apareció por primera vez en los cómics estadounidenses publicados por DC Comics. ​El personaje fue creado por el escritor estadounidense Jerry Siegel y el artista canadiense Joe Shuster en 1933'
    },
    {
      characterId: '1234',
      characterName: 'Superman 14',
      characterType: 'Hero',
      characterDescription: 'Superman es un superhéroe ficticio que apareció por primera vez en los cómics estadounidenses publicados por DC Comics. ​El personaje fue creado por el escritor estadounidense Jerry Siegel y el artista canadiense Joe Shuster en 1933'
    },
    {
      characterId: '1234',
      characterName: 'Superman 15',
      characterType: 'Hero',
      characterDescription: 'Superman es un superhéroe ficticio que apareció por primera vez en los cómics estadounidenses publicados por DC Comics. ​El personaje fue creado por el escritor estadounidense Jerry Siegel y el artista canadiense Joe Shuster en 1933'
    },
    {
      characterId: '1234',
      characterName: 'Superman 16',
      characterType: 'Hero',
      characterDescription: 'Superman es un superhéroe ficticio que apareció por primera vez en los cómics estadounidenses publicados por DC Comics. ​El personaje fue creado por el escritor estadounidense Jerry Siegel y el artista canadiense Joe Shuster en 1933'
    },
    {
      characterId: '1234',
      characterName: 'Superman 17',
      characterType: 'Hero',
      characterDescription: 'Superman es un superhéroe ficticio que apareció por primera vez en los cómics estadounidenses publicados por DC Comics. ​El personaje fue creado por el escritor estadounidense Jerry Siegel y el artista canadiense Joe Shuster en 1933'
    },
    {
      characterId: '1234',
      characterName: 'Superman 18',
      characterType: 'Hero',
      characterDescription: 'Superman es un superhéroe ficticio que apareció por primera vez en los cómics estadounidenses publicados por DC Comics. ​El personaje fue creado por el escritor estadounidense Jerry Siegel y el artista canadiense Joe Shuster en 1933'
    },
    {
      characterId: '1234',
      characterName: 'Superman 19',
      characterType: 'Hero',
      characterDescription: 'Superman es un superhéroe ficticio que apareció por primera vez en los cómics estadounidenses publicados por DC Comics. ​El personaje fue creado por el escritor estadounidense Jerry Siegel y el artista canadiense Joe Shuster en 1933'
    },
    {
      characterId: '1234',
      characterName: 'Superman 20',
      characterType: 'Hero',
      characterDescription: 'Superman es un superhéroe ficticio que apareció por primera vez en los cómics estadounidenses publicados por DC Comics. ​El personaje fue creado por el escritor estadounidense Jerry Siegel y el artista canadiense Joe Shuster en 1933'
    },
    {
      characterId: '1234',
      characterName: 'Superman 21',
      characterType: 'Hero',
      characterDescription: 'Superman es un superhéroe ficticio que apareció por primera vez en los cómics estadounidenses publicados por DC Comics. ​El personaje fue creado por el escritor estadounidense Jerry Siegel y el artista canadiense Joe Shuster en 1933'
    },
    {
      characterId: '1234',
      characterName: 'Superman 22',
      characterType: 'Hero',
      characterDescription: 'Superman es un superhéroe ficticio que apareció por primera vez en los cómics estadounidenses publicados por DC Comics. ​El personaje fue creado por el escritor estadounidense Jerry Siegel y el artista canadiense Joe Shuster en 1933'
    },
    {
      characterId: '1234',
      characterName: 'Superman 23',
      characterType: 'Hero',
      characterDescription: 'Superman es un superhéroe ficticio que apareció por primera vez en los cómics estadounidenses publicados por DC Comics. ​El personaje fue creado por el escritor estadounidense Jerry Siegel y el artista canadiense Joe Shuster en 1933'
    },
    {
      characterId: '1234',
      characterName: 'Superman 24',
      characterType: 'Hero',
      characterDescription: 'Superman es un superhéroe ficticio que apareció por primera vez en los cómics estadounidenses publicados por DC Comics. ​El personaje fue creado por el escritor estadounidense Jerry Siegel y el artista canadiense Joe Shuster en 1933'
    },
    {
      characterId: '1234',
      characterName: 'Superman 25',
      characterType: 'Hero',
      characterDescription: 'Superman es un superhéroe ficticio que apareció por primera vez en los cómics estadounidenses publicados por DC Comics. ​El personaje fue creado por el escritor estadounidense Jerry Siegel y el artista canadiense Joe Shuster en 1933'
    },
    {
      characterId: '1234',
      characterName: 'Superman 26',
      characterType: 'Hero',
      characterDescription: 'Superman es un superhéroe ficticio que apareció por primera vez en los cómics estadounidenses publicados por DC Comics. ​El personaje fue creado por el escritor estadounidense Jerry Siegel y el artista canadiense Joe Shuster en 1933'
    },
    {
      characterId: '1234',
      characterName: 'Superman 27',
      characterType: 'Hero',
      characterDescription: 'Superman es un superhéroe ficticio que apareció por primera vez en los cómics estadounidenses publicados por DC Comics. ​El personaje fue creado por el escritor estadounidense Jerry Siegel y el artista canadiense Joe Shuster en 1933'
    },
    {
      characterId: '1234',
      characterName: 'Superman 28',
      characterType: 'Hero',
      characterDescription: 'Superman es un superhéroe ficticio que apareció por primera vez en los cómics estadounidenses publicados por DC Comics. ​El personaje fue creado por el escritor estadounidense Jerry Siegel y el artista canadiense Joe Shuster en 1933'
    },*/
  ];

  pageNumber = DEFAULT_PAGE_NUMBER;
  pageSize = DEFAULT_PAGE_SIZE;
  pagelength = this.characters.length;
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS;


  ngOnInit(): void {
    // this.homeService.getData().subscribe(data => this.characters = data)
    this.apiFetchService.getCharacters(API_TO_USE).subscribe(data => { this.characters = data });
  }

  handlePagination(event: PageEvent) {
      this.pageNumber = event.pageIndex;
      this.pageSize = event.pageSize;
      this.apiFetchService.getCharacters(API_TO_USE).subscribe(data => { this.characters = data });
  }
}
