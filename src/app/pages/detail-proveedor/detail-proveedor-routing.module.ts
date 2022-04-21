import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailProveedorPage } from './detail-proveedor.page';

const routes: Routes = [
  {
    path: '',
    component: DetailProveedorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailProveedorPageRoutingModule {}
