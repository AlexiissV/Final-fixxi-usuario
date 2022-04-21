import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { LocalService } from 'src/app/services/local.service';
import { PostService } from 'src/app/services/post.service';
import { NavController, ModalController, PopoverController } from '@ionic/angular';
import { PopselecComponent } from 'src/app/components/popselec/popselec.component';
import { AddAddressPage } from '../add-address/add-address.page';
import { ViewImgPage } from '../view-img/view-img.page';
@Component({
  selector: 'app-new-tarea',
  templateUrl: './new-tarea.page.html',
  styleUrls: ['./new-tarea.page.scss'],
})
export class NewTareaPage implements OnInit {
  fecha = new Date();
  imges: string[] = [];
  mini: string = '';
  tipo_servicio: string='20';
  text: string = 'Publicar Servicio';
  titulo: string = '';
  descripcion: string = '';
  direccion: number = null;
  costo: number;
  fecha_reg: string = '';
  hora: string = '';
  imagen_array: string[] = [];
  customPickerOptions: any;
  customhoraOptions: any;
  constructor(
    private camera: Camera,
    public local: LocalService,
    private navctrl: NavController,
    private post: PostService,
    private modalctrl: ModalController,
    private popctrl: PopoverController,
  ) {
    if(local.is_experto){
      this.text='Solicitar cotización'
    }
    const ui = this.fecha.toISOString();
    this.mini = ui.substr(0, 10);
    this.customPickerOptions = {
      buttons: [
        {
          text: 'Confirmar',
          handler: (data) => {
            const fecha =
              data.year.text + '-' + data.month.text + '-' + data.day.text;
            this.fecha_reg = fecha;
          },
        },
        {
          text: 'Cancelar',
          handler: () => {},
        },
      ],
    };
    this.customhoraOptions = {
      buttons: [
        {
          text: 'Confirmar',
          handler: (data) => {
            this.hora =
              data.hour.text + ':' + data.minute.text + ' ' + data.ampm.text;
          },
        },
        {
          text: 'Cancelar',
          handler: () => {},
        },
      ],
    };
  }
  ngOnInit(): void {    
    if (this.local.address.length == 0) {
      this.post.getmisaddress().subscribe(
        (resp) => {
          if (resp.direcciones.length >= 1) {
            this.local.address = resp.direcciones;
          } else {
            this.local.presentAlert('No has registrado una dirección de destino');
          }
        },
        async (error) => {
          await this.local.detenerloadding();
        }
      );
    }
  }
  didcerrar(){
    this.modalctrl.dismiss();
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
  async creartarea() {
    if (this.local.is_experto) {
      this.solicitarexperto();
    } else {
      this.enviartarea();
    }
  }
  async solicitarexperto() {
   /* if(this.tipo_servicio=='20'){
      if(this.costo == null || this.costo == undefined || this.costo == 0){
        this.local.presentToast('Campos incompletos, Verifica tu información','danger');
        return;
      }
    }*/
    if (this.imges.length >=1) {
      for (let uno of this.imges) {
        let img = uno.replace('data:image/jpeg;base64,', '');
        this.imagen_array.push(img);
      }
    }
      await this.local.presentLoading('Cargando..!');
     this.post.solicitarcotizacion(  
       this.local.Cat.id,
      this.titulo,
      this.descripcion,
      this.direccion,
      this.costo,
      this.fecha_reg,
      this.hora,
      this.imagen_array,
      Number(this.local.detalle_expert.proveedor_id),
      Number(this.tipo_servicio))
       .subscribe(
          async (resp) => {
            await this.local.detenerloadding();
            if (resp.code == 202) {
              this.local.presentAlert(resp.message);
              if(this.tipo_servicio == '20'){
              this.navctrl.navigateBack('/view-tareas');
              this.modalctrl.dismiss();
            }else{
              this.navctrl.navigateBack('/views-diagnosticos');
              this.modalctrl.dismiss();
              }
            } else {
              this.local.presentAlert(resp.message);
              this.modalctrl.dismiss();

            }
          },
          async (error) => {
            console.log(error);
            
            await this.local.detenerloadding();
            this.local.presentAlert(
              'No pudimos enviar la informacion, revisa tu conexión é inteta de nuevo'
            );
          }
        );
    
  }
  async enviartarea() {
  /*  if(this.tipo_servicio=='20'){
      if(this.costo == null || this.costo == undefined || this.costo == 0){
        this.local.presentToast('Campos incompletos, Verifica tu información','danger');
        return;
      }
    }*/
    if (this.imges.length >=1) {
      for (let uno of this.imges) {
        let img = uno.replace('data:image/jpeg;base64,', '');
        this.imagen_array.push(img);
      }
    }
      await this.local.presentLoading('Cargando..!');
      this.post.crearTarea(
          this.local.Cat.id,
          this.titulo,
          this.descripcion,
          this.direccion,
          this.costo,
          this.fecha_reg,
          this.hora,
          this.imagen_array,
          Number(this.tipo_servicio)
        )
        .subscribe(
          async (resp) => {
            await this.local.detenerloadding();
            if (resp.code == 202) {
              this.local.presentAlert(resp.message);
              if(this.tipo_servicio == '20'){
              this.navctrl.navigateBack('/view-tareas');
              this.modalctrl.dismiss();
            }else{
              this.navctrl.navigateBack('/views-diagnosticos');
              this.modalctrl.dismiss();
              }
            } else {
              this.local.presentAlert(resp.message);
              this.modalctrl.dismiss();
            }
          },
          async (error) => {
            await this.local.detenerloadding();
            this.local.presentAlert(
              'No pudimos enviar la informacion, revisa tu conexión é inteta de nuevo'
            );
          }
        );
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
