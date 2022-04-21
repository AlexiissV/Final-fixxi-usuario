import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popselec',
  templateUrl: './popselec.component.html',
  styleUrls: ['./popselec.component.scss'],
})
export class PopselecComponent {

  constructor(private popctrl: PopoverController) { }

  miseleccion(tipo: number){
    this.popctrl.dismiss(tipo);
  }
  didcerrar(){
    this.popctrl.dismiss();
  }
}
