import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { AemetResponse } from '../interfaces/aemet';
import { Datos } from '../interfaces/datos';


@Injectable({
  providedIn: 'root'
})

export class AemetService {
//  private apiUrl = 'https://opendata.aemet.es'; //${this.apiUrl}
private urlSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {}

  obtenerDatosMunicipio(municipio: string): Observable<AemetResponse> {
  // const url = `${this.apiUrl}/opendata/api/prediccion/especifica/municipio/diaria/${municipio}`;
   const url = `/especifica/${municipio}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2aWN0b3JfZ2hfODhAaG90bWFpbC5jb20iLCJqdGkiOiJkYjYyYzYyYS1lZTZiLTQ0MzItYmI5MS05ZmI5ZTc3MGVmM2MiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTcxNTMzNjgxNiwidXNlcklkIjoiZGI2MmM2MmEtZWU2Yi00NDMyLWJiOTEtOWZiOWU3NzBlZjNjIiwicm9sZSI6IiJ9.Z8AO_VkBM1uS8QSYe0eV1E8tz9kVvt9bUaS2erZJ9Bk'
    });

    return this.http.get<AemetResponse>(url, { headers }).pipe(
      map(response => {
        return {
          descripcion: response.descripcion,
          estado: response.estado,
          datos: response.datos,
          metadatos: response.metadatos
        };
      })
    );
  }


  obtenerDetalles(url: string): Observable<Datos[]> {
    return this.http.get<Datos[]>(url);
  }

}



