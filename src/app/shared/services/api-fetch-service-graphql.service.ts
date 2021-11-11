import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular'
import { BehaviorSubject, map, Observable, take, tap } from 'rxjs';
import { Character } from 'src/app/interfaces/character';


const QUERY_CHARACTERS = gql`
{
  characters {
    results {
      id
      name
      gender
      image
      species
    }
  }
}`;

@Injectable({
  providedIn: 'root'
})
export class ApiFetchServiceGraphQLService {

  private charactersSubject = new BehaviorSubject<any[]>([]);
  characters$ = this.charactersSubject.asObservable();

  constructor(private apolloClient: Apollo) {

  }

  getCharacters(): Observable<Character[]> {
    return this.apolloClient.watchQuery<any>({
      query: QUERY_CHARACTERS
    }).valueChanges.pipe(
      take(1),
      map(res => {
        return res.data.characters.results
          .map((character: { id: string; name: string; gender: string; species: string; image: string; }) => {
            return {
              characterId: character.id,
              characterName: character.name,
              characterType: character.gender,
              characterDescription: character.species,
              characterAvatar: character.image,
            } as Character
          })
      }),
    )
  }
}
