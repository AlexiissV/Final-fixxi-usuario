import { Component, OnInit } from '@angular/core';
import { TicketList } from 'src/app/interfaces/interfaces';
import { LocalService } from '../../services/local.service';
import { PostService } from '../../services/post.service';
import { ModalController } from '@ionic/angular';
import { DetailReclamoPage } from '../detail-reclamo/detail-reclamo.page';

@Component({
  selector: 'app-mis-reclamos',
  templateUrl: './mis-reclamos.page.html',
  styleUrls: ['./mis-reclamos.page.scss'],
})
export class MisReclamosPage implements OnInit {
list: TicketList[]= [];

  constructor(private local: LocalService,
              private  post: PostService,
              private modalctrl: ModalController) { }

  ngOnInit() {
    this.post.getMyTicket().subscribe(resp => {
      this.list.push(...resp.ticket_list);
      
    });
  }
  async verdetalle(item:TicketList){
    const it = await this.modalctrl.create({
      component:DetailReclamoPage,
      backdropDismiss:true,
      componentProps:{
        tarea: item
      }
    });
    await it.present()
  }
}
