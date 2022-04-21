import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllServiPage } from './all-servi.page';

const routes: Routes = [
  {
    path: '',
    component: AllServiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllServiPageRoutingModule {}
