import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewImgPageRoutingModule } from './view-img-routing.module';

import { ViewImgPage } from './view-img.page';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwiperModule,
    ViewImgPageRoutingModule
  ],
  declarations: [ViewImgPage]
})
export class ViewImgPageModule {}
