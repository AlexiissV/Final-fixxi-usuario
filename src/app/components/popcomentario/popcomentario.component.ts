import { Component, Input, OnInit } from '@angular/core';
import { Comentario } from 'src/app/interfaces/interfaces';
import { PopoverController, ModalController } from '@ionic/angular';
import Swiper, { EffectCoverflow, FreeMode, Pagination, SwiperOptions } from 'swiper';
import { ViewImgPage } from '../../pages/view-img/view-img.page';

@Component({
  selector: 'app-popcomentario',
  templateUrl: './popcomentario.component.html',
  styleUrls: ['./popcomentario.component.scss'],
})
export class PopcomentarioComponent implements OnInit {
@Input() item: Comentario;
config2: SwiperOptions = {
  navigation: true,
  scrollbar: true,
  slidesPerView: 2.2,
  freeMode: true
};
  constructor(private popctrl: PopoverController,
              private modalctrl: ModalController) { }

  ngOnInit() {
    Swiper.use([Pagination, EffectCoverflow, FreeMode]);

  }
  didcerrar(){
    this.popctrl.dismiss();
  }
  async verimagenes(){
    const modal = await this.modalctrl.create({
      component: ViewImgPage,
      backdropDismiss:true,
      cssClass:'imgsmodal',
      componentProps:{
        imgs: this.item.imagen_array
      }
    });
    await modal.present();
  }
}
