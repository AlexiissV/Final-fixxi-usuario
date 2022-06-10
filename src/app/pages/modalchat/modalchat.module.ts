import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalchatPageRoutingModule } from './modalchat-routing.module';

import { ModalchatPage } from './modalchat.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ModalchatPageRoutingModule
  ],
  declarations: [ModalchatPage]
})
export class ModalchatPageModule {}
