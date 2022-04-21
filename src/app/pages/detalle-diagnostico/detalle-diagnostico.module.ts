import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleDiagnosticoPageRoutingModule } from './detalle-diagnostico-routing.module';

import { DetalleDiagnosticoPage } from './detalle-diagnostico.page';
import { ComponentsModule } from '../../components/components.module';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    SwiperModule,
    DetalleDiagnosticoPageRoutingModule
  ],
  declarations: [DetalleDiagnosticoPage]
})
export class DetalleDiagnosticoPageModule {}
