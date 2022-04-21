import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ViewNotiPage } from '../../pages/view-noti/view-noti.page';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() menu: boolean = false;
  @Input() modal: boolean = false;
  @Input() back: boolean = false;
  @Input() back2: boolean = false;
  @Input() search: boolean = false;
  @Input() linea1: boolean = false;
  @Input() linea2: boolean = false;
  @Input() linea3: boolean = false;
  @Input() linea4: boolean = false;
  @Input() title?: string = '';
  @Input() pagina?: string = '';
  @Input() n_noti?: number = null;
  
  constructor(private modalctrl: ModalController) { }


 async modaldissmis(){
   await this.modalctrl.dismiss();
  }
  async notificaciones(){
  const modal = this.modalctrl.create({
    component: ViewNotiPage,
    backdropDismiss:true,
  });
  await (await modal).present();
  }
}
