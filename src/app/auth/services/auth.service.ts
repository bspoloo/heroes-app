import { Injectable } from "@angular/core";
import { enviroments } from "../../../env/enviroments";
import { User } from "../interfaces/user.interface";
import { catchError, map, Observable, of, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private baseURL = enviroments.baseURL;
  private user?: User = undefined;
  constructor(private http: HttpClient, private route: Router) {}

  public getCurrentUser(): User | undefined {
    if (!this.user) {
      return undefined;
    }
    return  structuredClone(this.user);
  }
  public login(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}/users?id=1`).pipe(
      tap((users) => (this.user = users[0])),
      tap((users) => {
        localStorage.setItem("token", JSON.stringify(users[0]));
      })
    );
  }
  public logout(): void {
    if (!this.user) {
      return;
    }
    localStorage.clear();
    this.user = undefined;
    this.route.navigate(["/auth/login"]);
  }
  public checkAuthenticationStatus() : Observable<boolean>{
    if(!localStorage.getItem('token')){
      return of(false)
    }
    // this.user = JSON.parse(localStorage.getItem('token') as string) as User;

    return this.http.get<User[]>(`${this.baseURL}/users?id=1`)
    .pipe(
      tap(user => this.user = user[0]),
      map(user => !!user ),
      catchError(err => of(false))
    );
  }

}
