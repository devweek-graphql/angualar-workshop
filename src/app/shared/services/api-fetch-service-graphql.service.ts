import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular'
import { DocumentNode } from 'graphql';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { AddCharacterPayload, Character, CharacterResponse, CharactersResponse, DeleteCharacterResponse, GetCharactersFilters, UpdateCharacterPayload } from 'src/app/shared/interfaces/interfaces';
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
    return this.apolloClient.watchQuery<CharactersResponse>({
      query: QUERY_CHARACTERS,
      variables: chracterFilter
    }).valueChanges.pipe(
      take(1),
      map(res => {
        console.log(res.data.getCharacters);
        return res.data.getCharacters;
      }),
    )
  }

  getCharacterById(characterId: string): Observable<Character> {
     return this.apolloClient.watchQuery<CharacterResponse>({
      query: QUERY_CHARACTER_BY_ID,
      variables: {
        id: characterId
      }
    }).valueChanges.pipe(
      take(1),
      map(res => {
        console.log(res);
        return res.data.getCharacterById;
      }),
    )
  }

  createCharacter(character: AddCharacterPayload): Observable<Character | null | undefined> {

    const variables = {
      payload: character
    }
    return this.mutateGraphQLApi<Character>(MUTATION_CREATE_CHARACTER, variables);
  }

  updateCharacter(characterId: string, updateCharacterPayload: UpdateCharacterPayload): Observable<Character | null | undefined> {

    const variables = {
      id: characterId,
      payload: updateCharacterPayload
    }
    return this.mutateGraphQLApi<Character>(MUTATION_UPDATE_CHARACTER, variables);
  }

  deleteCharacter(characterId: string): Observable<string | undefined> {

    const variables = {
      id: characterId
    }
    return this.apolloClient.mutate<DeleteCharacterResponse>({
      mutation: MUTATION_DELETE_CHARACTER,
      variables: {
        id: characterId
      }
    }).pipe(
      take(1),
      map(res => {
        console.log(res);
        return res.data?.deleteCharacter;
      }),
    )
  }


  private queryGraphQLApi<T>(query: DocumentNode, params?: any): Observable<T> {
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

  private mutateGraphQLApi<T>(query: DocumentNode, params?: any): Observable<T | null | undefined> {
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
}

