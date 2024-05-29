import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );

  constructor() { }

  mailContacto( name: string, asunto: string, contenido: string): Observable<boolean> {

    const url  = `${ this.baseUrl }/mails/contacto`;
    const body = {name, asunto, contenido};

    return this.http.post<boolean>( url, body )
    .pipe(
      catchError( err => throwError( () => err.error.message ))
    );
  }
}
