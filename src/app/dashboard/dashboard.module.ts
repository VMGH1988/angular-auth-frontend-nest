import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { UserPageComponent } from './layouts/pages/user-page/user-page.component';
import { AdminPageComponent } from './layouts/pages/admin-page/admin-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MunicipiosModule } from '../municipios/municipios.module';
import { AemetModule } from '../aemet/aemet.module';
import { ArduinoModule } from '../arduino/arduino.module';
import { SuperAdminComponent } from './layouts/pages/super-admin/super-admin.component';
import { ContactoModule } from '../contacto/contacto.module';



@NgModule({
  declarations: [
    DashboardLayoutComponent,
    UserPageComponent,
    AdminPageComponent,
    SuperAdminComponent,


  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    AemetModule,
    MunicipiosModule,
    ArduinoModule,
    ContactoModule,
  ]
})
export class DashboardModule { }
