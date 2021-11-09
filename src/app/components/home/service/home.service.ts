import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Character } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpClient: HttpClient) {}

  getData(): Observable<Character[]> {
    return this.httpClient.get<any[]>('https://jsonplaceholder.typicode.com/photos').pipe(
      map(results => results.map(result => this.createCharacter(result)))
    );
  }

  private createCharacter(result: any) {
    return {
      characterId: result.id,
      characterName:  result.title.split(' ')[0],
      characterType: 'hero',
      characterDescription: result.title,
      characterAvatar: result.url,
    } as Character
  }
}


