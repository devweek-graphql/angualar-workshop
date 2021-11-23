import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular'
import { DocumentNode } from 'graphql';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { AbilitiesResponse, Ability, AddCharacterPayload, Character, CharacterResponse, CharactersResponse, DeleteCharacterResponse, FirstAppereance, FirstAppereancesResponse, GetCharactersFilters, Team, TeamsResponse, UpdateCharacterPayload } from 'src/app/shared/interfaces/interfaces';
import { MUTATION_CREATE_CHARACTER, MUTATION_DELETE_CHARACTER, MUTATION_UPDATE_CHARACTER, QUERY_ABILITIES, QUERY_ALL_CHARACTERS_IDS, QUERY_APPEREANCES, QUERY_CHARACTERS, QUERY_CHARACTER_BY_ID, QUERY_TEAMS } from '../graphql/graphqlQueries';

@Injectable({
  providedIn: 'root'
})
export class ApiFetchServiceGraphQLService {

  private charactersSubject = new BehaviorSubject<any[]>([]);
  characters$ = this.charactersSubject.asObservable();

  constructor(private apolloClient: Apollo) {

  }

  //Characters
  getCharacters(chracterFilter?: GetCharactersFilters): Observable<Character[]> {
    console.log('getCharacters using GraphQL');
    return this.apolloClient.watchQuery<CharactersResponse>({
      query: QUERY_CHARACTERS,
      variables: chracterFilter
    }).valueChanges.pipe(
      take(1),
      map(res => {
        return res.data.getCharacters;
      }),
    )
  }

  getCharactersIds(): Observable<string[]> {
    console.log('getCharactersIds using GraphQL');
    return this.apolloClient.watchQuery<CharactersResponse>({
      query: QUERY_ALL_CHARACTERS_IDS,
    }).valueChanges.pipe(
      take(1),
      map(res => {
        return res.data.getCharacters?.map(character => character.name);
      }),
    )
  }

  getCharacterById(characterId: string): Observable<Character> {
    console.log('getCharacterById using GraphQL');
     return this.apolloClient.watchQuery<CharacterResponse>({
      query: QUERY_CHARACTER_BY_ID,
      variables: {
        id: characterId
      }
    }).valueChanges.pipe(
      take(1),
      map(res => {
        return res.data.getCharacterById;
      }),
    )
  }

  createCharacter(character: AddCharacterPayload): Observable<Character | null | undefined> {
    console.log('createCharacter using GraphQL');
    const variables = {
      payload: character
    }
    return this.mutateGraphQLApi<Character>(MUTATION_CREATE_CHARACTER, variables);
  }

  updateCharacter(characterId: string, updateCharacterPayload: UpdateCharacterPayload): Observable<Character | null | undefined> {
    console.log('updateCharacter using GraphQL');
    const variables = {
      id: characterId,
      payload: updateCharacterPayload
    }
    return this.mutateGraphQLApi<Character>(MUTATION_UPDATE_CHARACTER, variables);
  }

  deleteCharacter(characterId: string): Observable<string | undefined> {
    console.log('deleteCharacter using GraphQL');
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
        return res.data?.deleteCharacter;
      }),
    )
  }

  //Abilities
  getAbilities(): Observable<Ability[]> {
    console.log('getAbilities using GraphQL');
    return this.apolloClient.watchQuery<AbilitiesResponse>({
      query: QUERY_ABILITIES,
    }).valueChanges.pipe(
      take(1),
      map(res => {
        return res.data.getAbilities;
      }),
    )
  }

  //Teams
  getTeams(): Observable<Team[]> {
    console.log('getTeams using GraphQL');
    return this.apolloClient.watchQuery<TeamsResponse>({
      query: QUERY_TEAMS,
    }).valueChanges.pipe(
      take(1),
      map(res => {
        return res.data.getTeams;
      }),
    )
  }

  //FirstAppereances
  getFirstAppereances(): Observable<FirstAppereance[]> {
    console.log('getFirstAppereances using GraphQL');
    return this.apolloClient.watchQuery<FirstAppereancesResponse>({
      query: QUERY_APPEREANCES,
    }).valueChanges.pipe(
      take(1),
      map(res => {
        return res.data.getFirstAppereances;
      }),
    )
  }

  private mutateGraphQLApi<T>(query: DocumentNode, params?: any): Observable<T | null | undefined> {
    return this.apolloClient.mutate<T>({
      mutation: query,
      ...params && { variables: params }
    }).pipe(
      take(1),
      map(res => {
        return res.data;
      })
    );
  }
}

