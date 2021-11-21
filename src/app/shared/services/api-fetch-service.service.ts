import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { GRAPHQL_API, REST_API } from '../properties/properties';
import { ApiFetchServiceGraphQLService } from './api-fetch-service-graphql.service';
import { ApiFetchServiceRestService } from './api-fetch-service-rest.service';
import { AddCharacterPayload, Character, GetCharactersFilters, UpdateCharacterPayload } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiFetchServiceService {
  constructor(private gqlService: ApiFetchServiceGraphQLService, private restService: ApiFetchServiceRestService) {

  }

  getCharactersWithFilters(apiToUse: string, filters?: GetCharactersFilters): Observable<Character[]> {
    let result: Observable<Character[]> = EMPTY;
    if(apiToUse === GRAPHQL_API) {
      result = this.gqlService.getCharacters(filters);
    } else if (apiToUse === REST_API) {
      result = this.restService.getCharactersWithFilters(filters);
    } else {
      throw new  Error('Error: API not defined')
    }
    return result;
  }

  getCharacterById (apiToUse: string, characterName: string): Observable<Character> {
    let result: Observable<Character> = EMPTY;
    if(apiToUse === GRAPHQL_API) {
      result = this.gqlService.getCharacterById(characterName);
    } else if (apiToUse === REST_API) {
      // result = this.restService.getCharactersWithFilters(pageConfig, filters);
    } else {
      throw new  Error('Error: API not defined')
    }
    return result;
  }

  createCharacter(apiToUse: string, character: AddCharacterPayload): Observable<Character | null | undefined> {
    let result: Observable<Character | null | undefined> = EMPTY;
    if(apiToUse === GRAPHQL_API) {
      result = this.gqlService.createCharacter(character);
    } else if (apiToUse === REST_API) {
      // result = this.restService.createCharacter(charcater);
    } else {
      throw new  Error('Error: API not defined')
    }
    return result;
  }

  updateCharacter(apiToUse: string, characterNameId: string, character: UpdateCharacterPayload): Observable<Character | undefined | null> {
    let result: Observable<Character | undefined | null> = EMPTY;
    if(apiToUse === GRAPHQL_API) {
      result = this.gqlService.updateCharacter(characterNameId, character);
    } else if (apiToUse === REST_API) {
      // result = this.restService.updateCharacter(character, characterNameId);
    } else {
      throw new  Error('Error: API not defined')
    }
    return result;
  }

  deleteCharacter(apiToUse: string, name: string): Observable<string | undefined> {
    let result: Observable<string | undefined> = of('');
    if(apiToUse === GRAPHQL_API) {
      result = this.gqlService.deleteCharacter(name);
    } else if (apiToUse === REST_API) {
      // result = this.restService.deleteCharacter(name);
    } else {
      throw new  Error('Error: API not defined')
    }

    return result;
  }
}
