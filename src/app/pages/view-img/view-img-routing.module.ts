import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewImgPage } from './view-img.page';

const routes: Routes = [
  {
    path: '',
    component: ViewImgPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewImgPageRoutingModule {}
