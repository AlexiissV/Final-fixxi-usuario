import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewProveedorPageRoutingModule } from './view-proveedor-routing.module';

import { ViewProveedorPage } from './view-proveedor.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ViewProveedorPageRoutingModule
  ],
  declarations: [ViewProveedorPage]
})
export class ViewProveedorPageModule {}
