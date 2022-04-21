import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllServiPageRoutingModule } from './all-servi-routing.module';

import { AllServiPage } from './all-servi.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    AllServiPageRoutingModule
  ],
  declarations: [AllServiPage]
})
export class AllServiPageModule {}
