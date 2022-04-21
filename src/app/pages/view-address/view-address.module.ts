import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewAddressPageRoutingModule } from './view-address-routing.module';

import { ViewAddressPage } from './view-address.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ViewAddressPageRoutingModule
  ],
  declarations: [ViewAddressPage]
})
export class ViewAddressPageModule {}
