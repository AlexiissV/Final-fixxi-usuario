import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-infocvv',
  templateUrl: './infocvv.page.html',
  styleUrls: ['./infocvv.page.scss'],
})
export class InfocvvPage {

  constructor(private modalctrl: ModalController) { }

  cierre(){
    this.modalctrl.dismiss();
  }
}
