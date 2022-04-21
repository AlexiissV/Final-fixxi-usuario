import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisReclamosPageRoutingModule } from './mis-reclamos-routing.module';

import { MisReclamosPage } from './mis-reclamos.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    MisReclamosPageRoutingModule
  ],
  declarations: [MisReclamosPage]
})
export class MisReclamosPageModule {}
