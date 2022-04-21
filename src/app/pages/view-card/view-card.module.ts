import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewCardPageRoutingModule } from './view-card-routing.module';

import { ViewCardPage } from './view-card.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ViewCardPageRoutingModule
  ],
  declarations: [ViewCardPage]
})
export class ViewCardPageModule {}
