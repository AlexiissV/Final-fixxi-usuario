import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalchatPage } from './modalchat.page';

const routes: Routes = [
  {
    path: '',
    component: ModalchatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalchatPageRoutingModule {}
