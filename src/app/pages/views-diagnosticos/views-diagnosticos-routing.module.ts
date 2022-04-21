import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewsDiagnosticosPage } from './views-diagnosticos.page';

const routes: Routes = [
  {
    path: '',
    component: ViewsDiagnosticosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewsDiagnosticosPageRoutingModule {}
