import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleDiagnosticoPage } from './detalle-diagnostico.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleDiagnosticoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleDiagnosticoPageRoutingModule {}
