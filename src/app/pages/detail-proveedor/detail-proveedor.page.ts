import { Component, OnInit } from '@angular/core';
import { LocalService } from '../../services/local.service';
import { Comentario, Experto, Peril } from '../../interfaces/interfaces';
import Swiper, { SwiperOptions, Pagination, EffectCoverflow, FreeMode } from 'swiper';
import { ModalController, PopoverController } from '@ionic/angular';
import { NewTareaPage } from '../new-tarea/new-tarea.page';
import { PostService } from '../../services/post.service';
import { PopcomentarioComponent } from '../../components/popcomentario/popcomentario.component';

@Component({
  selector: 'app-detail-proveedor',
  templateUrl: './detail-proveedor.page.html',
  styleUrls: ['./detail-proveedor.page.scss'],
})
export class DetailProveedorPage implements OnInit {
  config2: SwiperOptions = {
    navigation: true,
    scrollbar: true,
    slidesPerView: 3.3,
    freeMode: true
  };
  experto: Peril;
  constructor(public local: LocalService,
              private modalctrl: ModalController,
              private popctrl: PopoverController) {
    this.experto = local.detalle_expert;

  }
  ngOnInit(): void {
  
    Swiper.use([Pagination, EffectCoverflow, FreeMode]);
 
  }
  async infoexperto() {
    this.local.is_experto = true;
    const mymodal = await this.modalctrl.create({
      component: NewTareaPage,
      cssClass: 'cal-modal',
      backdropDismiss:false
    });
    await mymodal.present();
  }
  async verComentario(item: Comentario){
    const pop = await this.popctrl.create({
      component: PopcomentarioComponent,
      backdropDismiss:false,
      mode:'ios',
      componentProps:{
        item
      }
    });
    pop.style.cssText = '--min-width: 80%;';
    await pop.present();

  }
}
