import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './layouts/weather/weather.component';
import { MunicipiosModule } from '../municipios/municipios.module';
import { SharedModule } from '../shared/shared.module';





@NgModule({
  declarations: [
    WeatherComponent
  ],
  imports: [
    CommonModule,
    MunicipiosModule,
    SharedModule
  ],
  exports:[
    WeatherComponent
  ]
})
export class AemetModule { }
