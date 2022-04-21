import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPresupuestoPageRoutingModule } from './detail-presupuesto-routing.module';

import { DetailPresupuestoPage } from './detail-presupuesto.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    DetailPresupuestoPageRoutingModule
  ],
  declarations: [DetailPresupuestoPage]
})
export class DetailPresupuestoPageModule {}
