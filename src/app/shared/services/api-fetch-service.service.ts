import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PageConfig } from 'src/app/shared/interfaces/page-config';
import { Character } from 'src/app/shared/interfaces/character';
import { GRAPHQL_API, REST_API } from '../properties/properties';
import { ApiFetchServiceGraphQLService } from './api-fetch-service-graphql.service';
import { ApiFetchServiceRestService } from './api-fetch-service-rest.service';
import { QueryResult } from '../interfaces/query-result';
import { FilterCharacter } from '../interfaces/filter-character';

@Injectable({
  providedIn: 'root'
})
export class ApiFetchServiceService {

  constructor(private gqlService: ApiFetchServiceGraphQLService, private restService: ApiFetchServiceRestService) {

  }


  getCharacters(apiToUse: string, pageConfig: PageConfig): Observable<QueryResult<Character>> {
    let result: Observable<QueryResult<Character>> = of({results:[], totalAmount: 0})
    if(apiToUse === GRAPHQL_API) {
      result = this.gqlService.getCharacters(pageConfig, {});
    } else if (apiToUse === REST_API) {
      result = this.restService.getCharacters();
    } else {
      throw new  Error('Error: API not defined')
    }
    return result;
  }

  getCharacterByName(apiToUse: string, pageConfig: PageConfig, filters: FilterCharacter): Observable<QueryResult<Character>> {
    let result: Observable<QueryResult<Character>> = of({results:[], totalAmount: 0})
    if(apiToUse === GRAPHQL_API) {
      result = this.gqlService.getCharacters(pageConfig, filters);
    } else if (apiToUse === REST_API) {
      result = this.restService.getCharacters();
    } else {
      throw new  Error('Error: API not defined')
    }
    return result;
  }
}
