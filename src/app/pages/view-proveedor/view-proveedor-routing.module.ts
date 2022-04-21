import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewProveedorPage } from './view-proveedor.page';

const routes: Routes = [
  {
    path: '',
    component: ViewProveedorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewProveedorPageRoutingModule {}
