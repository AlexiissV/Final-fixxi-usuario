import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalCaliPage } from './modal-cali.page';

const routes: Routes = [
  {
    path: '',
    component: ModalCaliPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalCaliPageRoutingModule {}
