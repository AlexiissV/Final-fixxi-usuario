import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { PopalertComponent } from 'src/app/components/popalert/popalert.component';
import { Categoria, Direccion } from 'src/app/interfaces/interfaces';
import { PostService } from 'src/app/services/post.service';
import { NewTareaPage } from '../new-tarea/new-tarea.page';
import { LocalService } from '../../services/local.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  casa: Categoria[] = [];
  linea1:boolean=false;
  linea2:boolean=false;
  text: string = '';
  direccion:Direccion[]= [];
  n_noti: number= null;

  constructor(private post: PostService,
              private popctrl: PopoverController,
              private modalctrl: ModalController,
              public local: LocalService) { }

  buscar(event) {
    this.text = event.detail.value;
  }
  ngOnInit(): void {
    this.post.getcategorias().subscribe(resp => {                  
      for (let cat of resp.oficios) {
        if(this.casa.length<11){
        if (cat.icon == null || cat.icon == '') {
        } else {
          this.casa.push(cat);
        }
      }
    }
    });
    this.post.getmisaddress().subscribe(resp =>{
      this.direccion= resp.direcciones;      
    });
    this.post.getnotificaciones().subscribe(resp => {      
      this.n_noti= resp.lista.length;
    this.local.notificaciones= resp.lista;
    });
  }
  async seleccion(item: Categoria) {
    this.linea1=true;
    const popover = await this.popctrl.create({
      component: PopalertComponent,
      backdropDismiss:false,
      mode:'ios',
      componentProps: {
        categoria: item
      }
    });
    popover.style.cssText = '--min-width: 80%; border-radius: 10px;';
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
        backdropDismiss:false
      });
      await mymodal.present();
      await mymodal.onWillDismiss();
      this.linea2=false;
    }
  }
}