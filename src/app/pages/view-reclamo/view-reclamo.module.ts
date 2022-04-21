import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ViewReclamoPageRoutingModule } from './view-reclamo-routing.module';
import { ViewReclamoPage } from './view-reclamo.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ViewReclamoPageRoutingModule
  ],
  declarations: [ViewReclamoPage]
})
export class ViewReclamoPageModule {}
