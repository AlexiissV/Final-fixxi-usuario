import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewTareaPage } from './new-tarea.page';

const routes: Routes = [
  {
    path: '',
    component: NewTareaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewTareaPageRoutingModule {}
