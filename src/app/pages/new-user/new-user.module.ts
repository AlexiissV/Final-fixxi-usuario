import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewUserPageRoutingModule } from './new-user-routing.module';

import { NewUserPage } from './new-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NewUserPageRoutingModule
  ],
  declarations: [NewUserPage]
})
export class NewUserPageModule {}
