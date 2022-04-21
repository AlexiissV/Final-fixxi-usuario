import { Component, Input, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { LocalService } from '../../services/local.service';
import { PostService } from '../../services/post.service';
import { Concepto } from '../../interfaces/interfaces';
import { NavController, PopoverController, ModalController } from '@ionic/angular';
import { PopselecComponent } from '../../components/popselec/popselec.component';
import { ViewImgPage } from '../view-img/view-img.page';

@Component({
  selector: 'app-view-reclamo',
  templateUrl: './view-reclamo.page.html',
  styleUrls: ['./view-reclamo.page.scss'],
})
export class ViewReclamoPage implements OnInit {
  imagen_array: string[] = [];
  imges: string[] = [];
  conceptos: Concepto[]=[];
  etiqueta: number;
  nota: string='';
  @Input() title: string='';
  @Input() id: number;

  constructor(private local: LocalService,
              private post: PostService,
              private camera: Camera,
              private modalctrl: ModalController,
              private popctrl: PopoverController) { }

  async ngOnInit() {
    await this.local.presentLoading('Cargado...');
    this.post.getconceptoreclamo()
    .subscribe(async resp =>{
      await this.local.detenerloadding();
      this.conceptos= resp.concepto;
    }, async (error) => {
      await this.local.detenerloadding();
    });
  }
  abrirGaleria() {
    const options: CameraOptions = {
      quality: 90,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    };
    this.procesarImagen(options);
  }
  abrirCamara() {
    const options: CameraOptions = {
      quality: 90,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA,
    };
    this.procesarImagen(options);
  }
  
  procesarImagen(options: CameraOptions) {
    this.camera.getPicture(options).then(
      (imageData) => {
        const img = 'data:image/jpeg;base64,' + imageData;
        this.imges.push(img);
      },
      (err) => {
      }
    );
  }
  async enviarinfo(){
    await this.local.presentLoading('Envando Información');
    for (let uno of this.imges) {
      let img = uno.replace('data:image/jpeg;base64,', '');
      this.imagen_array.push(img);
    }
    this.post.postreclamo(this.id,this.etiqueta,this.nota,this.imagen_array)
    .subscribe(async resp => {
      await this.local.detenerloadding();
      if(resp.code=202){
        this.local.presentAlert(resp.message);
        this.modalctrl.dismiss({si: true});
      
      }else{
        this.local.presentAlert(resp.message);
      }

    },async (error) =>{
      await this.local.detenerloadding();
    });
    
  }
  async opciones(){
    const popover =await this.popctrl.create({
      component: PopselecComponent,
      backdropDismiss:true,
      mode:'ios',
      cssClass:'pop-selec'
    });
    await popover.present();
    const {data} = await popover.onWillDismiss();
    if(data!= undefined){
      if(data==10){
        this.abrirCamara();
      }else{
        this.abrirGaleria();
      }
    }    
  }
  eliminarimg(i: number){
    this.imges.splice(i, 1);  
  }
  async enlaimg(){
    const array=[];
    for(let uno of this.imges){
      let mi={
        url: uno
      };
      array.push(mi);
    }
    const modal = await this.modalctrl.create({
      component: ViewImgPage,
      backdropDismiss:true,
      cssClass:'imgsmodal',
      componentProps:{
        imgs:array
      }
    });
    await modal.present();    

  }
}
