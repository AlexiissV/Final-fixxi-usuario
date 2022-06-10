import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { PopalertComponent } from './popalert/popalert.component';
import { PoppagoComponent } from './poppago/poppago.component';
import { PopvalidaComponent } from './popvalida/popvalida.component';
import { PoppassComponent } from './poppass/poppass.component';
import { PopselecComponent } from './popselec/popselec.component';
import { PopcomentarioComponent } from './popcomentario/popcomentario.component';
import { SwiperModule } from 'swiper/angular';
import { PopavisoComponent } from './popaviso/popaviso.component';
import { CancelacionComponent } from './cancelacion/cancelacion.component';


@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    PoppagoComponent,
    PopalertComponent,
    PopvalidaComponent,
    PoppassComponent,
    PopselecComponent,
    PopcomentarioComponent,
    PopavisoComponent,
    CancelacionComponent,
  ],
  exports:[
    HeaderComponent,
    MenuComponent,
    PoppagoComponent,
    PopalertComponent,
    PopvalidaComponent,
    PoppassComponent,
    PopselecComponent,
    PopcomentarioComponent,
    PopavisoComponent,
    CancelacionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    SwiperModule,
  ]
})
export class ComponentsModule { }
