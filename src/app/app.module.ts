import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MunicipiosModule } from './municipios/municipios.module';
import { AemetModule } from './aemet/aemet.module';
import { ArduinoModule } from './arduino/arduino.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactoModule } from './contacto/contacto.module';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AemetModule,
    MunicipiosModule,
    ArduinoModule,
    BrowserAnimationsModule,
    ContactoModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
