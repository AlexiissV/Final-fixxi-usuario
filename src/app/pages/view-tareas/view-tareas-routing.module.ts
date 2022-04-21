import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewTareasPage } from './view-tareas.page';

const routes: Routes = [
  {
    path: '',
    component: ViewTareasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewTareasPageRoutingModule {}
