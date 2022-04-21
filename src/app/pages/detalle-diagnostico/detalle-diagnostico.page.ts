import { Component, OnInit } from '@angular/core';
import { LocalService } from '../../services/local.service';
import { Listdiagnostico, POstulaciarray, PropuestaArray } from '../../interfaces/interfaces';
import Swiper, { EffectCoverflow, Pagination, SwiperOptions } from 'swiper';
import { PostService } from '../../services/post.service';
import { NavController, PopoverController, ModalController } from '@ionic/angular';
import { PopvalidaComponent } from 'src/app/components/popvalida/popvalida.component';
import { DetailPresupuestoPage } from '../detail-presupuesto/detail-presupuesto.page';
import { ModalMiprstPage } from '../modal-miprst/modal-miprst.page';
import { PoppagoComponent } from 'src/app/components/poppago/poppago.component';

@Component({
  selector: 'app-detalle-diagnostico',
  templateUrl: './detalle-diagnostico.page.html',
  styleUrls: ['./detalle-diagnostico.page.scss'],
})
export class DetalleDiagnosticoPage implements OnInit {
  tarea: Listdiagnostico;
  negociacion:PropuestaArray[]=[];
  my_experto: POstulaciarray;
  config: SwiperOptions = {
    pagination:  { clickable: true },
    effect:'coverflow'
  };
  
  constructor(private local: LocalService,
              private post: PostService,
              private navctrl:NavController,
              private popctrl: PopoverController,
              private modalctrl: ModalController) {
    this.tarea= local.detalle_diagnostico;  
    
    if(this.tarea.propuesta_array!= undefined && this.tarea.propuesta_array.length>=1){
      for(let uno of this.tarea.propuesta_array){
        this.negociacion.unshift(uno);
      }
    }
      
   }

  ngOnInit() {
    Swiper.use([Pagination, EffectCoverflow]);
    if(this.tarea.status==70 ||this.tarea.status==30 ||this.tarea.status==20 || this.tarea.status==40 || this.tarea.status==60){
      this.my_experto = this.tarea.postulaciones_array[0];
    }
    

  }

  async terminar(){
  await this.local.presentLoading('Cargando...');
  await this.post.terminodiagnostico(this.tarea.id)
  .subscribe( async resp => {
    await this.local.detenerloadding();
    if(resp.code == 202){
      this.tarea.status = 30;
      this.tarea.status_text ='TERMINADO';
      this.local.presentAlert(resp.message);
    }else{
      this.local.presentAlert(resp.message);
    }
    
  },async (error) => {
    await this.local.detenerloadding();
  });
}
async validarproveedor(tipo: number){
  const popover = await this.popctrl.create({
    component: PopvalidaComponent,
    backdropDismiss: false,
    mode:'ios',
    componentProps:{
      tipo: tipo
    }
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

async onClick(item:POstulaciarray){ 
  this.local.dpresupuesto= item;
  this.local.dpresupuesto.is_diagnostico=10;
  const modal = await this.modalctrl.create({
    component: DetailPresupuestoPage,
    backdropDismiss: false,
    cssClass:'my-presupuestodiag',
    componentProps:{
      id: this.tarea.id,
      tipo: this.tarea.tipo_servicio
    }
  });
  await modal.present();
  const {data}= await modal.onWillDismiss();
  if(data!= undefined){
    this.navctrl.back();
  }
}
async contratar(){
  await this.local.presentLoading('Cargando...');
  this.post.contratarproveedorDiagnost(this.tarea.id,this.my_experto.proveedor_id)
  .subscribe(async resp => {
    await this.local.detenerloadding();
    this.local.presentAlert(resp.message);
    if(resp.code==202){
      this.navctrl.back();
    }
  },async (error) => {
    await this.local.detenerloadding();
  });
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
}
