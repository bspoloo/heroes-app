import { Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { Hero } from "../interfaces/heroes.interface";
import { HttpClient } from "@angular/common/http";
import { enviroments } from "../../../env/enviroments";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class HeroesService {
  private baseURL: string = enviroments.baseURL;

  constructor(private http: HttpClient, private router : Router) {}

  public getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseURL}/heroes`);
  }
  public getHeroById(id: string): Observable<Hero | undefined> {
    return this.http
      .get<Hero>(`${this.baseURL}/heroes/${id}`)
      .pipe(catchError((error) => of(undefined)));
  }
  public createHero(hero: Hero): Observable<Hero> {
    this.router.navigate(['/heroes/edit/', hero.id]);
    return this.http.post<Hero>(`${this.baseURL}/heroes`, hero);
  }
  public updateHero(hero: Hero): Observable<Hero> {
    if (!hero.id) {
      throw new Error("Id hero not found");
    }
    return this.http.patch<Hero>(`${this.baseURL}/heroes/${hero.id}`, hero);
  }
  public deleteHero(hero: Hero): Observable<boolean> {
    if (!hero.id) {
      throw new Error("Id hero not found");
    }
    console.log('hero was deleted succefully ', hero);

    return this.http.delete<boolean>(`${this.baseURL}/heroes/${hero.id}`)
    .pipe(
      catchError((err) => of(false)),
      map((resp) => true)
    );
  }
  public getSuggestions(term: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseURL}/heroes?q=${term}`);
  }
}
