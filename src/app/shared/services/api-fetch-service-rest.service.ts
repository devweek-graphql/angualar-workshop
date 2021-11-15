import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FilterCharacter, PageConfig, Character } from '../interfaces/interfaces';


const CHARACTERS_REST_API_URL = 'http://localhost:7070/characters'
@Injectable({
  providedIn: 'root'
})
export class ApiFetchServiceRestService {
  constructor(private httpClient: HttpClient) { }

  getCharacters(): Observable<Character[]> {
    return this.httpClient.get<Character[]>(CHARACTERS_REST_API_URL);
  }

  getCharactersWithFilters(pageConfig: PageConfig, filters: FilterCharacter): Observable<Character[]> {
    return this.httpClient.get<Character[]>(this.buildUrlWithParameters(pageConfig, filters));
  }

  deleteCharacter(name: string): void {
    this.httpClient.delete(`${CHARACTERS_REST_API_URL}/${name}`).subscribe();
  }


  private buildUrlWithParameters(pageConfig: PageConfig, filters: FilterCharacter) {
    const { pageNumber, pageSize, sortBy, order } = pageConfig;
    const { name, universe } = filters;
    if (name) {
      //Since name is de ID for character, so when this come as filter It does not make sense to add the other one
      return `${CHARACTERS_REST_API_URL}/${name}`;
    }

    let uri = '?';
    uri.concat(universe ? `universe=${universe}` : '');

    let conjuntion = sortBy || order || pageSize || pageNumber ? '&' : '';

    uri.concat(sortBy ? `${conjuntion}sortBy=${sortBy}` : '');
    uri.concat(order ? `${conjuntion}order=${order}` : '');
    uri.concat(pageSize ? `${conjuntion}limit=${pageSize}` : '');
    uri.concat(pageNumber ? `${conjuntion}offset=${pageNumber}` : '');

    return `${CHARACTERS_REST_API_URL}/${uri}`;
  }
}
