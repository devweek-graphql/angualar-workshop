import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Character } from 'src/app/shared/interfaces/character';
import { QueryResult } from '../interfaces/query-result';

@Injectable({
  providedIn: 'root'
})
export class ApiFetchServiceRestService {
  constructor(private httpClient: HttpClient) {}

  getCharacters(): Observable<QueryResult<Character>> {
    return this.httpClient.get<any>('https://rickandmortyapi.com/api/character')
    .pipe(
      map(response => {
          const characters: Character[] = response.results.map((result: any) => this.createCharacter(result));
          const totalAmountOfRecords = response.data.info.count as number
          return { results: characters, totalAmount: totalAmountOfRecords } as QueryResult<Character>;
      }),
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
