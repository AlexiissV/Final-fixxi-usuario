import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { LocalService } from '../../services/local.service';
import { PostService } from '../../services/post.service';
import { PopoverController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-popvalida',
  templateUrl: './popvalida.component.html',
  styleUrls: ['./popvalida.component.scss'],
})
export class PopvalidaComponent {
@Input() tipo: number;
@ViewChild('int1') myinput1;
@ViewChild('int2') myinput2;
@ViewChild('int3') myinput3;
@ViewChild('int4') myinput4;
@ViewChild('int5') myinput5;
@ViewChild('int6') myinput6;
lat: number = null;
lng: number =null;
array: string[]= ['','','','','',''];
folio: string='';
bandera: number=0;
  constructor(private local: LocalService,
              private post: PostService,
              private popctrl: PopoverController,
              private geolocation: Geolocation) { }

  async validando(){
    await this.local.presentLoading('Cargando...');
    await this.geolocation.getCurrentPosition().then((resp) => {
      this.lat= resp.coords.latitude;
      this.lng= resp.coords.longitude;      
     }).catch((error) => {

      });
      if(this.lat== null || this.lng== null){
        await this.local.presentLoading('Cargando...');
        this.local.presentAlert('No pudimos acceder a tu ubicacion, \n habilite la ubicación de su dispositivo');
        return;
     }
     if(this.tipo==20){
      await this.post.validarllegadadiagnostico(this.local.detalle_diagnostico.id,this.lng,this.lat, this.folio)
      .subscribe(async resp => {
        await this.local.detenerloadding();
        this.local.presentAlert(resp.message);
        if(resp.code ==202){
          this.popctrl.dismiss({si: true});
        }else{
          this.popctrl.dismiss();
        }
      }, async (error) => {
        await this.local.detenerloadding();
      });
     }else{
      await this.post.validarllegada(this.local.midetalle.id,this.lng,this.lat,this.folio)
      .subscribe(async resp => {
        await this.local.detenerloadding();
        this.local.presentAlert(resp.message);
        if(resp.code ==202){
          this.popctrl.dismiss({si: true});
        }else{
          this.popctrl.dismiss();
        }
      }, async (error) => {
        await this.local.detenerloadding();
      });
     }
  }
  cambiarfoco(i: number){
    switch (i) {
      case 1:
        if (this.array[0] != '') {
          this.myinput2.setFocus();
          this.bandera=0;
        }
        break;
      case 2:
        if (this.array[1] != '') {
          this.myinput3.setFocus();
          this.bandera=0;
        }
        break;
      case 3:
        if (this.array[2] != '') {
          this.myinput4.setFocus();
          this.bandera=0;
        }
        break;
      case 4:
        if (this.array[3] != '') {
          this.myinput5.setFocus();
          this.bandera=0;
        }
        break;
      case 5:
        if (this.array[4] != '') {
          this.myinput6.setFocus();
          this.bandera=0;
        }
        break;
      case 6:
        if (this.array[5] != '') {
          let folio = this.array.toString();
          if (folio.length == 11) {
            for (let a of this.array) {
              this.folio = this.folio + a;
            }
          }
        }
        break;
      default:
        break;
    }
  }
  didcerrar(){
    this.popctrl.dismiss();
  }
  atras(i:number){
    this.bandera++;    
    switch(i){
      case 1:
        break;
      case 2:
        if(this.bandera==2){
          this.myinput1.setFocus();
          this.bandera=0;
        }
        break;
      case 3:
        if(this.bandera==2){
        this.myinput2.setFocus();
        this.bandera=0;
        }
        break;
      case 4:
        if(this.bandera==2){
        this.myinput3.setFocus();
        this.bandera=0;
        }
        break;
      case 5:
        if(this.bandera==2){
        this.myinput4.setFocus();
        this.bandera=0;
        }
        break;
      case 6:
        if(this.bandera==2){
        this.myinput5.setFocus();
        this.bandera=0;
        }
        break;
        default:
          this.bandera=0;
          break;
    }    
  }
}
