
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { UserPageComponent } from './layouts/pages/user-page/user-page.component';
import { AdminPageComponent } from './layouts/pages/admin-page/admin-page.component';
import { SuperAdminComponent } from './layouts/pages/super-admin/super-admin.component';
import { ContactoComponent } from '../contacto/layouts/contacto/contacto.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: 'user', component: UserPageComponent },
      { path: 'admin', component: AdminPageComponent },
      { path: 'Sadmin', component: SuperAdminComponent },
      { path: 'contacto', component: ContactoComponent },
      { path: '**', redirectTo: 'user' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
