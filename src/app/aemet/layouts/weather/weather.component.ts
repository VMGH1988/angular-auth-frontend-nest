import { Component, Input, OnInit } from '@angular/core';
import { AemetService } from '../../services/aemet.service';
import { MunicipiosService } from '../../../shared/municipios.service';
import { AemetResponse } from '../../interfaces/aemet';
import { Datos, Dia, Origen, Prediccion } from '../../interfaces/datos';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit{


  data: any;
  datosDevueltos: any;
  nombre: any;
  id: any;
  public detalles: Datos[] =  [];
  provincia: any;


  constructor(private aemetService: AemetService, private municipiosService: MunicipiosService) {

   }

  ngOnInit() {
    this.municipiosService.getData().subscribe(data => {

      const { nombre } = data;

      this.nombre = nombre;
      this.aemetService.obtenerDatosMunicipio(data.municipioIdDc).subscribe((datosDevueltos: AemetResponse) => {
        this.datosDevueltos = datosDevueltos;
        const url = datosDevueltos.datos;


        this.aemetService.obtenerDetalles(url).subscribe(detalles => {
          this.detalles = detalles;

        });
      });




    });


  }

}
