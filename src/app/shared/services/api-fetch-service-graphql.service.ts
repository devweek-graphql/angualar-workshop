import { variable } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular'
import { DocumentNode } from 'graphql';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { AddCharacterPayload, Character, GetCharactersFilters, UpdateCharacterPayload } from 'src/app/shared/interfaces/interfaces';
import { MUTATION_CREATE_CHARACTER, MUTATION_DELETE_CHARACTER, MUTATION_UPDATE_CHARACTER, QUERY_CHARACTERS, QUERY_CHARACTER_BY_ID } from '../graphql/graphqlQueries';


@Injectable({
  providedIn: 'root'
})
export class ApiFetchServiceGraphQLService {

  private charactersSubject = new BehaviorSubject<any[]>([]);
  characters$ = this.charactersSubject.asObservable();

  constructor(private apolloClient: Apollo) {

  }

  getCharacters(chracterFilter?: GetCharactersFilters): Observable<Character[]> {

    return this.queryGraphQLApi<Character[]>(QUERY_CHARACTERS)

    // return this.apolloClient.watchQuery<Character[]>({
    //   query: QUERY_CHARACTERS,
    //   variables: chracterFilter
    // }).valueChanges.pipe(
    //   take(1),
    //   map(res => {
    //     console.log(res);
    //     return res.data;
    //   }),
    // )
  }

  getCharacterById(characterId: string): Observable<Character> {
    return this.queryGraphQLApi<Character>(QUERY_CHARACTER_BY_ID, {id: characterId})

    // return this.apolloClient.watchQuery<Character>({
    //   query: QUERY_CHARACTER_BY_ID,
    //   variables: {
    //     id: characterId
    //   }
    // }).valueChanges.pipe(
    //   take(1),
    //   map(res => {
    //     console.log(res);
    //     return res.data;
    //   }),
    // )
  }

  createCharacter(character: AddCharacterPayload): Observable<Character | null | undefined> {

    const variables = {
      payload: character
    }
    return this.mutateGraphQLApi<Character>(MUTATION_CREATE_CHARACTER, variables);
    // return this.apolloClient.mutate<Character>({
    //   mutation: MUTATION_CREATE_CHARACTER,
    //   variables: {
    //     payload: character
    //   }
    // }).pipe(
    //   take(1),
    //   map(res => {
    //     console.log(res);
    //     return res.data;
    //   }),
    // )
  }

  updateCharacter(updateCharacterPayload: UpdateCharacterPayload, characterId: string): Observable<Character | null | undefined> {

    const variables = {
      id: characterId,
      payload: updateCharacterPayload
    }
    return this.mutateGraphQLApi<Character>(MUTATION_UPDATE_CHARACTER, variables);

    // return this.apolloClient.mutate<Character>({
    //   mutation: MUTATION_UPDATE_CHARACTER,
    //   variables: {
    //     id: characterId,
    //     payload: updateCharacterPayload
    //   }
    // }).pipe(
    //   take(1),
    //   map(res => {
    //     console.log(res);
    //     return res.data;
    //   }),
    // )
  }

  deleteCharacter(characterId: string): Observable<Character | null | undefined> {

    const variables = {
      id: characterId
    }
    return this.mutateGraphQLApi<Character>(MUTATION_DELETE_CHARACTER, variables);

    // this.apolloClient.mutate<Character>({
    //   mutation: MUTATION_DELETE_CHARACTER,
    //   variables: {
    //     id: characterId
    //   }
    // }).pipe(
    //   take(1),
    //   map(res => {
    //     console.log(res);
    //     return res.data;
    //   }),
    // )
  }


  queryGraphQLApi<T>(query: DocumentNode, params?: any): Observable<T> {
    return this.apolloClient.watchQuery<T>({
      mutation: query,
      ...params && { variables: params }
    }).valueChanges.pipe(
      take(1),
      map(res => {
        console.log(res);
        return res.data;
      })
    );
  }

  mutateGraphQLApi<T>(query: DocumentNode, params?: any): Observable<T | null | undefined> {
    return this.apolloClient.mutate<T>({
      mutation: query,
      ...params && { variables: params }
    }).pipe(
      take(1),
      map(res => {
        console.log(res);
        return res.data;
      })
    );
  }


  // private buildFilters(chracterFilter?: GetCharactersFilters, pageConfig?: PageConfig): GetCharactersFilters {

  //   let variables: GetCharactersFilters = {}

  //   if(chracterFilter) {
  //     variables = {
  //         ...chracterFilter?.universe && { universe: chracterFilter?.universe },
  //         ...pageConfig?.order && { order: pageConfig?.order },
  //         ...pageConfig?.sortBy && { sortBy: pageConfig?.sortBy },
  //         ...pageConfig?.pageSize && { limit: pageConfig?.pageSize },
  //         ...pageConfig?.pageNumber && { offset: pageConfig?.pageNumber },
  //         start: 1
  //     };
  //   }

  //   return variables;
  // }
}

