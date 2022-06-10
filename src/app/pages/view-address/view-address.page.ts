import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Direccion } from 'src/app/interfaces/interfaces';
import { LocalService } from 'src/app/services/local.service';
import { PostService } from 'src/app/services/post.service';
import { AddAddressPage } from '../add-address/add-address.page';

@Component({
  selector: 'app-view-address',
  templateUrl: './view-address.page.html',
  styleUrls: ['./view-address.page.scss'],
})
export class ViewAddressPage implements OnInit {  

  myfile: File;
  cola='';

  constructor(private modalctrl: ModalController,
              private post: PostService,
              public local: LocalService) { }

  async ngOnInit() {
    if(this.local.address.length==0){
    await this.local.presentLoading('Cargando..!');
    this.post.getmisaddress().subscribe(async resp =>{   
      console.log(resp);
                     
      await this.local.detenerloadding();
      if(resp.direcciones.length>=1){
        this.local.address.push(...resp.direcciones);
      }else{
        this.local.presentAlert('NO hay información para mostrar');
      }
    },async (error) =>{
      await this.local.detenerloadding();
    });
    }
  }
 async adddireccion(){
    const modal = await this.modalctrl.create({
      component: AddAddressPage,
      backdropDismiss: true,
      componentProps:{
        eliminar: false,
        update: false
      }
    });
  await modal.present();
  const {data} = await modal.onDidDismiss();
  if(data == null || data== undefined){
    return;
  }
  this.local.address=[];
  this.ngOnInit();
  
  }
 async veraddress(item:Direccion){
  const modal = await this.modalctrl.create({
    component: AddAddressPage,
    backdropDismiss: true,
    componentProps:{
      eliminar: true,
      update: true,
      lat:item.lat,
      lng:item.lng,
      id:item.id,
      Gdireccion: item.direccion,
      etique: item.etiqueta_text,
      colonia: item.colonia
    }
  });
await modal.present();
const {data} = await modal.onDidDismiss();
if(data == null || data== undefined){
  return;
}
this.local.address=[];
this.ngOnInit();
 }
}
