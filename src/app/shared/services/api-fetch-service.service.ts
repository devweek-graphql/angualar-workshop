import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { GRAPHQL_API, REST_API } from '../properties/properties';
import { ApiFetchServiceGraphQLService } from './api-fetch-service-graphql.service';
import { ApiFetchServiceRestService } from './api-fetch-service-rest.service';
import { FilterCharacter, PageConfig, Character } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiFetchServiceService {
  constructor(private gqlService: ApiFetchServiceGraphQLService, private restService: ApiFetchServiceRestService) {

  }


  getCharacters(apiToUse: string, pageConfig: PageConfig): Observable<Character[]> {
    let result: Observable<Character[]> = EMPTY;
    if(apiToUse === GRAPHQL_API) {
      // result = this.gqlService.getCharacters(pageConfig, {});
    } else if (apiToUse === REST_API) {
      result = this.restService.getCharacters();
    } else {
      throw new  Error('Error: API not defined')
    }
    return result;
  }

  getCharactersWithFilters(apiToUse: string, pageConfig: PageConfig, filters: FilterCharacter): Observable<Character[]> {
    let result: Observable<Character[]> = EMPTY;
    if(apiToUse === GRAPHQL_API) {
      // result = this.gqlService.getCharacters(pageConfig, filters);
    } else if (apiToUse === REST_API) {
      result = this.restService.getCharactersWithFilters(pageConfig, filters);
    } else {
      throw new  Error('Error: API not defined')
    }
    return result;
  }

  createCharacter(apiToUse: string, charcater: Character): Observable<Character> {
    let result: Observable<Character> = EMPTY;
    if(apiToUse === GRAPHQL_API) {
      // result = this.gqlService.getCharacters(pageConfig, filters);
    } else if (apiToUse === REST_API) {
      result = this.restService.createCharacter(charcater);
    } else {
      throw new  Error('Error: API not defined')
    }
    return result;
  }

  updateCharacter(apiToUse: string, character: Character, characterNameId: string) {
    let result: Observable<Character> = EMPTY;
    if(apiToUse === GRAPHQL_API) {
      // result = this.gqlService.getCharacters(pageConfig, filters);
    } else if (apiToUse === REST_API) {
      result = this.restService.updateCharacter(character, characterNameId);
    } else {
      throw new  Error('Error: API not defined')
    }
    return result;
  }

  deleteCharacter(apiToUse: string, name: string): void {
    if(apiToUse === GRAPHQL_API) {
      // result = this.gqlService.getCharacters(pageConfig, filters);
    } else if (apiToUse === REST_API) {
      this.restService.deleteCharacter(name);
    } else {
      throw new  Error('Error: API not defined')
    }
  }
}
