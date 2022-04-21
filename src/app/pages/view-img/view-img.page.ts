import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Imagenarray } from 'src/app/interfaces/interfaces';
import Swiper, { EffectCoverflow, FreeMode, Pagination, SwiperOptions } from 'swiper';

@Component({
  selector: 'app-view-img',
  templateUrl: './view-img.page.html',
  styleUrls: ['./view-img.page.scss'],
})
export class ViewImgPage implements OnInit {
@Input() imgs: Imagenarray[]=[];
config: SwiperOptions = {
  slidesPerView:1,
  pagination:  { clickable: true },
  effect:'coverflow'
};
  constructor(private modalctrl: ModalController) { }

  ngOnInit() {
    Swiper.use([Pagination, EffectCoverflow, FreeMode]);

  }
  didcerrar(){
    this.modalctrl.dismiss();
  }
}
