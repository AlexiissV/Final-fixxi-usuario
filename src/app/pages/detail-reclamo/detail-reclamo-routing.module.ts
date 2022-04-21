import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailReclamoPage } from './detail-reclamo.page';

const routes: Routes = [
  {
    path: '',
    component: DetailReclamoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailReclamoPageRoutingModule {}
