import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewPresupuestosPageRoutingModule } from './view-presupuestos-routing.module';

import { ViewPresupuestosPage } from './view-presupuestos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewPresupuestosPageRoutingModule
  ],
  declarations: [ViewPresupuestosPage]
})
export class ViewPresupuestosPageModule {}
