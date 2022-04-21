import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailReclamoPageRoutingModule } from './detail-reclamo-routing.module';

import { DetailReclamoPage } from './detail-reclamo.page';
import { ComponentsModule } from '../../components/components.module';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    SwiperModule,
    DetailReclamoPageRoutingModule
  ],
  declarations: [DetailReclamoPage]
})
export class DetailReclamoPageModule {}
