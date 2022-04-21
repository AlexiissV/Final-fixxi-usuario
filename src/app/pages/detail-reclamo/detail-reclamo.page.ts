import { Component, Input, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { TicketList } from '../../interfaces/interfaces';

@Component({
  selector: 'app-detail-reclamo',
  templateUrl: './detail-reclamo.page.html',
  styleUrls: ['./detail-reclamo.page.scss'],
})
export class DetailReclamoPage implements OnInit {
@Input() tarea:TicketList;
config: SwiperOptions = {
  pagination:  { clickable: true },
  effect:'coverflow'
};
  constructor() { }

  ngOnInit() {
  }

}
