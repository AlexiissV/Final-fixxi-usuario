import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewsDiagnosticosPageRoutingModule } from './views-diagnosticos-routing.module';

import { ViewsDiagnosticosPage } from './views-diagnosticos.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ViewsDiagnosticosPageRoutingModule
  ],
  declarations: [ViewsDiagnosticosPage]
})
export class ViewsDiagnosticosPageModule {}
