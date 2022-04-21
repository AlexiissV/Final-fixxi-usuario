import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/interfaces/interfaces';
import { PostService } from '../../services/post.service';
import { PopoverController, ModalController } from '@ionic/angular';
import { PopalertComponent } from 'src/app/components/popalert/popalert.component';
import { NewTareaPage } from '../new-tarea/new-tarea.page';

@Component({
  selector: 'app-all-servi',
  templateUrl: './all-servi.page.html',
  styleUrls: ['./all-servi.page.scss'],
})
export class AllServiPage implements OnInit {
  all: Categoria[] = [];
  linea1:boolean=false;
  linea2:boolean=false;
  text: string = '';

  constructor(private post: PostService,
              private popctrl: PopoverController,
              private modalctrl: ModalController) { }

  buscar(event) {
    this.text = event.detail.value;
  }
  ngOnInit() {
    this.post.getcategorias().subscribe(resp => {
        this.all = resp.oficios;
    });
  }
  async seleccion(item: Categoria) {
    this.linea1=true;
    const popover = await this.popctrl.create({
      component: PopalertComponent,
      backdropDismiss: false,
      mode:'ios',
      componentProps: {
        categoria: item
      }
    });
    popover.style.cssText = '--min-width: 80%;';
    await popover.present();
    const {data} = await popover.onWillDismiss();    
    if(data == undefined || data.id==20){
      this.linea1= false;
    }else{  
      this.linea1= false;
      this.linea2=true; 
        const mymodal = await this.modalctrl.create({
        component: NewTareaPage,
        cssClass:'cal-modal',
        backdropDismiss: false
      });
      await mymodal.present();
      await mymodal.onWillDismiss();
      this.linea2=false;
    }
  }
}
