import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Character } from 'src/app/interfaces/character';

@Injectable({
  providedIn: 'root'
})
export class ApiFetchServiceRestService {
  constructor(private httpClient: HttpClient) {}

  getCharacters(): Observable<Character[]> {
    return this.httpClient.get<any>('https://rickandmortyapi.com/api/character').pipe(
      map(response => response.results.map((result: any) => this.createCharacter(result))),
    );
  }

  private createCharacter(result: any) {
    return {
      characterId: result.id,
      characterName:  result.name,
      characterType: result.gender,
      characterDescription: result.species,
      characterAvatar: result.image,
    } as Character
  }


}
