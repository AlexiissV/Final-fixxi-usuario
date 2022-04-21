import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisReclamosPage } from './mis-reclamos.page';

const routes: Routes = [
  {
    path: '',
    component: MisReclamosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisReclamosPageRoutingModule {}
