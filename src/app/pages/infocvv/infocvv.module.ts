import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InfocvvPageRoutingModule } from './infocvv-routing.module';

import { InfocvvPage } from './infocvv.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfocvvPageRoutingModule
  ],
  declarations: [InfocvvPage]
})
export class InfocvvPageModule {}
