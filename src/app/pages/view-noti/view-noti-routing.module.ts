import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewNotiPage } from './view-noti.page';

const routes: Routes = [
  {
    path: '',
    component: ViewNotiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewNotiPageRoutingModule {}
