import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewTareasPageRoutingModule } from './view-tareas-routing.module';

import { ViewTareasPage } from './view-tareas.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ViewTareasPageRoutingModule
  ],
  declarations: [ViewTareasPage]
})
export class ViewTareasPageModule {}
