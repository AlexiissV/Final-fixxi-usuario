import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailPresupuestoPage } from './detail-presupuesto.page';

const routes: Routes = [
  {
    path: '',
    component: DetailPresupuestoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailPresupuestoPageRoutingModule {}
