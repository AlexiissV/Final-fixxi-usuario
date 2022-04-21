import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewTareaPageRoutingModule } from './new-tarea-routing.module';

import { NewTareaPage } from './new-tarea.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    NewTareaPageRoutingModule
  ],
  declarations: [NewTareaPage]
})
export class NewTareaPageModule {}
