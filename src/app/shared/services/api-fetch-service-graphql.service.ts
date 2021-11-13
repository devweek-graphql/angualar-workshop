import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular'
import { BehaviorSubject, map, Observable, take, tap } from 'rxjs';
import { PageConfig } from 'src/app/shared/interfaces/page-config';
import { Character } from 'src/app/shared/interfaces/character';
import { QueryResult } from '../interfaces/query-result';
import { FilterCharacter } from '../interfaces/filter-character';


const QUERY_CHARACTERS = gql`
  query($page: Int!, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
      }
      results {
        id
        name
        gender
        image
        species
      }
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class ApiFetchServiceGraphQLService {

  private charactersSubject = new BehaviorSubject<any[]>([]);
  characters$ = this.charactersSubject.asObservable();

  constructor(private apolloClient: Apollo) {

  }

  getCharacters(pageConfig: PageConfig, chracterFilter: FilterCharacter): Observable<QueryResult<Character>> {
    return this.apolloClient.watchQuery<any>({
      query: QUERY_CHARACTERS,
      variables: {
        page: pageConfig.pageNumber,
        filter: chracterFilter
      }
    }).valueChanges.pipe(
      take(1),
      map(res => {
        const characters: Character[] = res.data.characters.results
          .map((character: { id: string; name: string; gender: string; species: string; image: string; }) => {
            return {
              characterId: character.id,
              characterName: character.name,
              characterType: character.gender,
              characterDescription: character.species,
              characterAvatar: character.image,
            } as Character
          })
        console.log(chracterFilter);
        return { results: characters, totalAmount: res.data.characters.info.count } as QueryResult<Character>;
      }),
    )
  }
}
