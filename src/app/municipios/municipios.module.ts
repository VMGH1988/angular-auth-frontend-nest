import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MunicipiosComponent } from './layouts/municipios/municipios.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    MunicipiosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports:[
    MunicipiosComponent
  ]
})
export class MunicipiosModule { }
