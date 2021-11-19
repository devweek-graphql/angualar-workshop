import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character, GetCharactersFilters } from '../interfaces/interfaces';


const CHARACTERS_REST_API_URL = 'http://localhost:7070/characters'
@Injectable({
  providedIn: 'root'
})
export class ApiFetchServiceRestService {
  constructor(private httpClient: HttpClient) { }

  getCharactersWithFilters(filters?: GetCharactersFilters): Observable<Character[]> {
    return this.httpClient.get<Character[]>(this.buildUrlWithParameters(filters));
  }

  getCharacterById(characterId: string): Observable<Character> {
    return this.httpClient.get<Character>(`${CHARACTERS_REST_API_URL}/${characterId}`);
  }

  deleteCharacter(characterId: string): void {
    this.httpClient.delete(`${CHARACTERS_REST_API_URL}/${characterId}`).subscribe();
  }

  createCharacter(charcater: Character): Observable<Character> {
    return this.httpClient.post<Character>(CHARACTERS_REST_API_URL, charcater);
  }

  updateCharacter(character: Character, characterId: string): Observable<Character> {
    return this.httpClient.put<Character>(`${CHARACTERS_REST_API_URL}/${characterId}`, character);
  }


  private buildUrlWithParameters(filters?: GetCharactersFilters) {
    const universe  = filters?.universe;
    const order = filters?.order;
    const sortBy = filters?.sortBy;
    const limit = filters?.limit;
    const offset = filters?.offset;
    const start = filters?.start;

    let uri = '?';
    uri.concat(universe ? `universe=${universe}` : '');

    let conjuntion = sortBy || order || limit || offset || start ? '&' : '';

    uri.concat(sortBy ? `${conjuntion}sortBy=${sortBy}` : '');
    uri.concat(order ? `${conjuntion}order=${order}` : '');
    uri.concat(limit ? `${conjuntion}limit=${limit}` : '');
    uri.concat(offset ? `${conjuntion}offset=${offset}` : '');

    return `${CHARACTERS_REST_API_URL}/${uri}`;
  }

}
