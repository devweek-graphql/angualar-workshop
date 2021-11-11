import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Character } from 'src/app/interfaces/character';
import { API_TO_USE, GRAPHQL_API, REST_API } from '../properties/properties';
import { ApiFetchServiceGraphQLService } from './api-fetch-service-graphql.service';
import { ApiFetchServiceRestService } from './api-fetch-service-rest.service';

@Injectable({
  providedIn: 'root'
})
export class ApiFetchServiceService {

  constructor(private gqlService: ApiFetchServiceGraphQLService, private restService: ApiFetchServiceRestService) {

  }


  getCharacters(apiToUse: string): Observable<Character[]> {
    let result: Observable<Character[]> = of([])
    if(apiToUse === GRAPHQL_API) {
      result = this.gqlService.getCharacters();
    } else if (apiToUse === REST_API) {
      console.log('I went by REST Side')
      result = this.restService.getCharacters();
    } else {
      throw new  Error('Error: API not defined')
    }
    return result;
  }
}
