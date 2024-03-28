import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // @ts-ignore
  private userName: string | null = null;

  constructor(private http: HttpClient) { }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/v1/auth/login', credentials)
      .pipe(
        map(response => {
           this.userName = response.user.name;  
           return response;
        }),
        catchError(error => {
          console.error('Error during login:', error);
          return of(error);
        })
      );
  }
 
  // @ts-ignore
  isAuthenticated(): boolean {
    let isLogged: boolean = localStorage.getItem("IsLogged") === "true";
    return isLogged;
  }

 
  getUserName(): string | null {
    return this.userName;
  }
 
  logout() {
    localStorage.setItem("IsLogged","false") 
    this.userName = null;
  }
}
