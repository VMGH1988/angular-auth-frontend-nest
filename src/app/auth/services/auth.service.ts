import { environment } from './../../../environments/environments';

import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

import { AuthStatus, CheckTokenResponse, LoginResponse, User, registerResponse, DeleteResponse } from '../interfaces';
import { Users } from '../../dashboard/interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );

  private _currentUser = signal<User|null>(null);
  private _authStatus = signal<AuthStatus>( AuthStatus.checking );


  public currentUser = computed( () => this._currentUser() );
  public authStatus = computed( () => this._authStatus() );


  constructor() {
    this.checkAuthStatus().subscribe();
  }


  private setAuthentication(user: User, token:string): boolean {

    this._currentUser.set( user );
    this._authStatus.set( AuthStatus.authenticated );
    localStorage.setItem('token', token);

    return true;
  }



  login( email: string, password: string ): Observable<boolean> {

    const url  = `${ this.baseUrl }/auth/login`;
    const body = { email, password };

    return this.http.post<LoginResponse>( url, body )
      .pipe(
        map( ({ user, token }) => this.setAuthentication( user, token )),
        catchError( err => throwError( () => err.error.message ))
      );
  }

  register( name: string, email: string, password: string ): Observable<boolean> {

    const url  = `${ this.baseUrl }/auth/register`;
    const body = {name, email, password };

    return this.http.post<registerResponse>( url, body )
    .pipe(
      map( ({ user, token }) => this.setAuthentication( user, token )),
      catchError( err => throwError( () => err.error.message ))
    );
  }
  mail( name: string, email: string): Observable<boolean> {

    const url  = `${ this.baseUrl }/mails`;
    const body = {name, email};

    return this.http.post<boolean>( url, body )
    .pipe(
      catchError( err => throwError( () => err.error.message ))
    );
  }

  delete( id: string ): Observable<boolean> {
    const url  = `${ this.baseUrl }/auth/delete/${id}`;

    return this.http.delete<boolean>( url )
     .pipe(
        catchError( err => throwError( () => err.error.message ))
      );
  }



  updateAdmin( id: string, name: string, email: string, password: string, roles: [], isActive:boolean ): Observable<boolean> {

    const url  = `${ this.baseUrl }/auth/update2/${id}`;
    const body = {name, email, password, roles, isActive};

    return this.http.patch<boolean>( url, body )
      .pipe(
        catchError( err => throwError( () => err.error.message ))
      );
  }

  update( id: string, name: string, email: string, password: string): Observable<boolean> {

    const url  = `${ this.baseUrl }/auth/update/${id}`;
    const body = {name, email, password };

    return this.http.patch<registerResponse>( url, body )
      .pipe(
        map( ({ user, token}) => this.setAuthentication( user, token )),
        catchError( err => throwError( () => err.error.message ))
      );
  }



  findAll(token:string): Observable<Users[]> {
    const url = `${this.baseUrl}/auth/all`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Users[]>(url, { headers })
     .pipe(
        catchError(err => {
          console.error(err);
          return throwError(err);
        })
      );
  }

  checkAuthStatus():Observable<boolean> {

    const url   = `${ this.baseUrl }/auth/check-token`;
    const token = localStorage.getItem('token');

    if ( !token ) {
      this.logout();
      return of(false);
    }

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`);


      return this.http.get<CheckTokenResponse>(url, { headers })
        .pipe(
          map( ({ user, token }) => this.setAuthentication( user, token )),
          catchError(() => {
            this._authStatus.set( AuthStatus.notAuthenticated );
            return of(false);
          })
        );


  }


  logout() {
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set( AuthStatus.notAuthenticated );

  }

  getUserById(id: string): Observable<Users> {
    const url = `${this.baseUrl}/auth/${id}`;
    return this.http.get<Users>(url)
     .pipe(
        catchError(err => {
          console.error(err);
          return throwError(err);
        })
      );
  }

}
