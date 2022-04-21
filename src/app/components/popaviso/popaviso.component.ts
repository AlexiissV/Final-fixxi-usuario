import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popaviso',
  templateUrl: './popaviso.component.html',
  styleUrls: ['./popaviso.component.scss'],
})
export class PopavisoComponent {

  constructor(private popctrl: PopoverController) { }

  onClick(){
    this.popctrl.dismiss();
  }
}
