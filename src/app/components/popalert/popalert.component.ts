import { Component, Input, OnInit } from '@angular/core';
import { Categoria } from 'src/app/interfaces/interfaces';
import { PopoverController } from '@ionic/angular';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-popalert',
  templateUrl: './popalert.component.html',
  styleUrls: ['./popalert.component.scss'],
})
export class PopalertComponent {
@Input() categoria: Categoria;

  constructor(private popctrl_: PopoverController,
              private local: LocalService) { }

  opcion(id:number){
    if(this.local.is_experto){
      this.local.is_experto=false;
    }
    this.local.Cat= this.categoria;
    this.popctrl_.dismiss({id});
  }
  didcerrar(){
    this.popctrl_.dismiss();
  }
}
