import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalMiprstPageRoutingModule } from './modal-miprst-routing.module';

import { ModalMiprstPage } from './modal-miprst.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ModalMiprstPageRoutingModule
  ],
  declarations: [ModalMiprstPage]
})
export class ModalMiprstPageModule {}
