import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfocvvPage } from './infocvv.page';

const routes: Routes = [
  {
    path: '',
    component: InfocvvPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfocvvPageRoutingModule {}
