import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewNotiPageRoutingModule } from './view-noti-routing.module';

import { ViewNotiPage } from './view-noti.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ViewNotiPageRoutingModule
  ],
  declarations: [ViewNotiPage]
})
export class ViewNotiPageModule {}
