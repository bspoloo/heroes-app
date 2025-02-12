import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Hero } from '../interfaces/heroes.interface';
import { HttpClient } from '@angular/common/http';
import { enviroments } from '../../../env/enviroments';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private baseURL : string = enviroments.baseURL;

  constructor(private http : HttpClient) { }

  public getHeroes() : Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.baseURL}/heroes`);
  }
  public getHeroById(id : string) :Observable<Hero | undefined>{
    return this.http.get<Hero>(`${this.baseURL}/${id}`)
                               .pipe(
                                catchError(error => of(undefined))
                               );
  }
}
