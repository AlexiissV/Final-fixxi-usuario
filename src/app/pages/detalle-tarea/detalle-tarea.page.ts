import { Component, OnInit} from '@angular/core';
import Swiper,{ SwiperOptions,Pagination,EffectCoverflow,FreeMode } from 'swiper';
import { NavController, ModalController, PopoverController } from '@ionic/angular';
import { LocalService } from '../../services/local.service';
import { Mytarea, POstulaciarray, PropuestaArray } from '../../interfaces/interfaces';
import { ModalMiprstPage } from '../modal-miprst/modal-miprst.page';
import { PostService } from '../../services/post.service';
import { PoppagoComponent } from '../../components/poppago/poppago.component';
import { DetailPresupuestoPage } from '../detail-presupuesto/detail-presupuesto.page';
import { ModalCaliPage } from '../modal-cali/modal-cali.page';
import { PopvalidaComponent } from 'src/app/components/popvalida/popvalida.component';
import { ViewReclamoPage } from '../view-reclamo/view-reclamo.page';
import { CancelacionComponent } from '../../components/cancelacion/cancelacion.component';
import { ModalchatPage } from '../modalchat/modalchat.page';

@Component({
  selector: 'app-detalle-tarea',
  templateUrl: './detalle-tarea.page.html',
  styleUrls: ['./detalle-tarea.page.scss'],
})
export class DetalleTareaPage implements OnInit {
  tarea: Mytarea;
  linea4: boolean= false;
  linea3: boolean= false;
  negociacion:PropuestaArray[]=[];
  my_experto:POstulaciarray;
  config: SwiperOptions = {
    pagination:  { clickable: true },
    effect:'coverflow'
  };
  config2: SwiperOptions = {
    navigation: true,
    scrollbar: true,
    slidesPerView:3,
    freeMode:true
  };

  constructor(private navctrl: NavController,
              public local: LocalService,
              private modalctrl: ModalController,
              private post: PostService,
              private popctrl: PopoverController) {
                this.tarea= this.local.midetalle;                  
                                              
                if(this.tarea.propuesta_array!= undefined && this.tarea.propuesta_array.length>=1){
                  for(let uno of this.tarea.propuesta_array){
                    this.negociacion.unshift(uno);
                  }
                }
               }

  
  async ngOnInit() { 
    Swiper.use([Pagination, EffectCoverflow, FreeMode]);
    if(this.tarea.status==20 ||this.tarea.status==30 || this.tarea.status==40 || this.tarea.status==60){
      this.my_experto = this.tarea.postulaciones_array[0];
      this.local.dpresupuesto= this.tarea.postulaciones_array[0];
    }
    if(this.tarea.status ==60){
      const popover = await this.popctrl.create({
        component: PoppagoComponent,
        backdropDismiss: false,
        mode:'ios',
        componentProps: {
          id:this.tarea.id
        }
      });
      popover.style.cssText = '--min-width: 80%';
      await popover.present();
      const {data}= await popover.onWillDismiss();
      if(data!= undefined){
        this.navctrl.back();
      }
    }
  }
  async cancelarservicio(){
    const cancela = await this.popctrl.create({
      component: CancelacionComponent,
      backdropDismiss: false,
      componentProps:{
        id: this.tarea.id,
        status:this.tarea.status,
        status_verificacion:this.tarea.status_verificacion
      }
    });
    await cancela.present();
    const {data}= await cancela.onWillDismiss();
    if(data!= null|| undefined){
      this.navctrl.back();
    }
  }
  async onClick(item:POstulaciarray){ 
    this.linea3= true;
    this.local.dpresupuesto= item;
    const modal = await this.modalctrl.create({
      component: DetailPresupuestoPage,
      backdropDismiss: false,
      cssClass:'my-presupuesto',
      componentProps:{
        id: this.tarea.id,
        tipo: this.tarea.tipo_servicio
      }
    });
    await modal.present();
    const {data}= await modal.onWillDismiss();
    this.linea3=false;
    if(data!= undefined){
      this.navctrl.back();
    }
  }
  ionViewDidEnter(){
    this.tarea= this.local.midetalle;
  }
  async lanzarcotizacion(){
    const modalruta = await this.modalctrl.create({
      component: ModalMiprstPage,
      backdropDismiss: false,
      componentProps:{
        id:this.tarea.id
      },
      cssClass:'my-cali22'
  });
  await modalruta.present();
  const {data}= await modalruta.onWillDismiss();
  if(data!= undefined){
    this.navctrl.back();
  }
  }
  async aceptar(item:PropuestaArray){
   await this.local.presentLoading('Cargando..!');
    this.post.aceptarnegociacion(this.tarea.id,item.id).subscribe(async resp => {
      await this.local.detenerloadding();
      if(resp.code==202){
        this.local.presentAlert(resp.message);
        this.navctrl.back();
      }else{
        this.local.presentAlert(resp.message);
      }
    }, async (error) =>{
      await this.local.detenerloadding();
    });
  }
  async confirmarcontratacion(){
    const popover = await this.popctrl.create({
      component: PoppagoComponent,
      backdropDismiss: false,
      mode:'ios',
      componentProps: {
        id: this.tarea.id
      }
    });
    popover.style.cssText = '--min-width: 80%';
    await popover.present();
    const {data}= await popover.onWillDismiss();
    if(data!= undefined){
      this.navctrl.back();
    }
  }
  async detalleProveedor(){
    const modal = await this.modalctrl.create({
      component: DetailPresupuestoPage,
      backdropDismiss: false,
      cssClass:'pop-proveedor'

    });

  }
  async calificar(){
    this.linea4= true;
    const modalruta = await this.modalctrl.create({
      component: ModalCaliPage,
      backdropDismiss:false,
      componentProps:{
        tarea_id: this.local.midetalle.id,
        foto: this.my_experto.profile_picture,
        nombre:this.my_experto.proveedor,
        val: this.my_experto.valoracion
      },
      cssClass:'my-cali'
  });
  await modalruta.present();
  const {data}= await modalruta.onWillDismiss();
  this.linea4=false;
  if(data!= null && data!= undefined){
    this.navctrl.navigateBack('/view-tareas');
  }
  }
    async validarproveedor(){
      const popover = await this.popctrl.create({
        component: PopvalidaComponent,
        mode:'ios',
        backdropDismiss: false,
      });
      popover.style.cssText = '--min-width: 80%';
  
      await popover.present();
      const {data}= await popover.onWillDismiss();
          if(data!= undefined){
        this.navctrl.back();
      }
  }
  async detailleproveedor(id: number){
    await this.local.presentLoading('Cargando...');
    this.post.verdetallepartner(id).subscribe(async resp => {
      await this.local.detenerloadding();
      this.local.detalle_expert = resp.data[0];
      this.local.is_cotizacion= false;
      this.navctrl.navigateForward('/detail-proveedor');
  
    },async (error) => {
      await this.local.detenerloadding();
    });
  }
  async aplicaReclamo(){
    const reclamo = await this.modalctrl.create({
      component: ViewReclamoPage,
      backdropDismiss:true,
      componentProps:{
        title: this.tarea.titulo,
        id: this.tarea.id
      }
    });
    await reclamo.present();
    const {data} = await reclamo.onWillDismiss();
    console.log(data);
    
  }
  async elchat(){
    const modal = await this.modalctrl.create({
      component: ModalchatPage,
      backdropDismiss: true,
      componentProps:{
        id: this.tarea.id
      }
    });
    await modal.present();
  }
}
