import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArduinoComponent } from './layouts/arduino/arduino.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ArduinoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxChartsModule,


  ],
  exports:[
    ArduinoComponent
  ]
})
export class ArduinoModule { }
