import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalMiprstPage } from './modal-miprst.page';

const routes: Routes = [
  {
    path: '',
    component: ModalMiprstPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalMiprstPageRoutingModule {}
