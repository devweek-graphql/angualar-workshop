import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Ability, AddCharacterPayload, Character, FirstAppereance, GetCharactersFilters, Team, UpdateCharacterPayload } from '../interfaces/interfaces';


const CHARACTERS_REST_API_URL = 'http://localhost:7070/characters'
const ABILITIES_REST_API_URL = 'http://localhost:7070/abilities'
const FIRST_APPEAREANCES_REST_API_URL = 'http://localhost:7070/firstAppearances'
const TEAMS_REST_API_URL = 'http://localhost:7070/teams'
@Injectable({
  providedIn: 'root'
})
export class ApiFetchServiceRestService {
  constructor(private httpClient: HttpClient) { }

  //Characters
  getCharactersWithFilters(filters?: GetCharactersFilters): Observable<Character[]> {
    console.log('getCharacters using REST');
    return this.httpClient.get<Character[]>(this.buildUrlWithParameters(filters));
  }

  getCharacterById(characterId: string): Observable<Character> {
    console.log('getCharacterById using REST');
    return this.httpClient.get<Character>(`${CHARACTERS_REST_API_URL}/${characterId}`);
  }

  deleteCharacter(characterId: string): Observable<string> {
    console.log('deleteCharacter using REST');
    const options = {
      responseType: 'text' as const,
    };

    return this.httpClient.delete(`${CHARACTERS_REST_API_URL}/${characterId}`, options);
  }

  createCharacter(charcater: AddCharacterPayload): Observable<Character> {
    console.log('createCharacter using REST');
    return this.httpClient.post<Character>(CHARACTERS_REST_API_URL, charcater);
  }

  updateCharacter(character: UpdateCharacterPayload, characterId: string): Observable<Character> {
    console.log('updateCharacter using REST');
    return this.httpClient.put<Character>(`${CHARACTERS_REST_API_URL}/${characterId}`, character);
  }


  private buildUrlWithParameters(filters?: GetCharactersFilters) {
    const universe = filters?.universe;
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

  //Abilities
  getAbilities(): Observable<Ability[]> {
    console.log('getAbilities using REST');
    return this.httpClient.get<Ability[]>(`${ABILITIES_REST_API_URL}`);
  }

  //First appereances
  getFirstAppereances(): Observable<FirstAppereance[]> {
    console.log('getFirstAppereances using REST');
    return this.httpClient.get<FirstAppereance[]>(`${FIRST_APPEAREANCES_REST_API_URL}`);
  }

  //Abilities
  getTeams(): Observable<Team[]> {
    console.log('getTeams using REST');
    return this.httpClient.get<Team[]>(`${TEAMS_REST_API_URL}`);
  }

}
