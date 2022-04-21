import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalCaliPageRoutingModule } from './modal-cali-routing.module';
import { ModalCaliPage } from './modal-cali.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalCaliPageRoutingModule
  ],
  declarations: [ModalCaliPage]
})
export class ModalCaliPageModule {}
