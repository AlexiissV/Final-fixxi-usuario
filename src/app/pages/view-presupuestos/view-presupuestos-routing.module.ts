import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewPresupuestosPage } from './view-presupuestos.page';

const routes: Routes = [
  {
    path: '',
    component: ViewPresupuestosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewPresupuestosPageRoutingModule {}
