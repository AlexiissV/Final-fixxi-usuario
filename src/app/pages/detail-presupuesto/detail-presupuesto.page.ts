import { Component, Input } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { POstulaciarray } from 'src/app/interfaces/interfaces';
import { LocalService } from '../../services/local.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-detail-presupuesto',
  templateUrl: './detail-presupuesto.page.html',
  styleUrls: ['./detail-presupuesto.page.scss'],
})
export class DetailPresupuestoPage {
presupuesto: POstulaciarray;
@Input() id: number;
@Input() tipo: number;

  constructor(public local: LocalService,
              private post: PostService,
              private modalctrl: ModalController,
              private navctrl:NavController) {
    this.presupuesto = local.dpresupuesto;    
   }
   async contratar(){
     await this.local.presentLoading('Cargando..!');
     this.post.contratarproveedor(this.id,this.presupuesto.proveedor_id)
     .subscribe(async resp =>{
       await this.local.detenerloadding();
       if(resp.code==202){
         this.local.presentAlert(resp.message);
         this.modalctrl.dismiss({si: true});
       }else{
         this.local.presentAlert(resp.message);
         this.modalctrl.dismiss();
       }
     },async (error) =>{
       await this.local.detenerloadding();
       this.modalctrl.dismiss();
     });
   }
  async diagnostico(){
  await this.local.presentLoading('Cargando...');
  this.post.solicitarDiagnostico(this.local.midetalle.id,this.presupuesto.proveedor_id)
  .subscribe(async (resp) => {
    await this.local.detenerloadding();
    this.local.presentAlert(resp.message);   
    this.modalctrl.dismiss({si: true}); 
  },async (error)=>{
    await this.local.detenerloadding();
    this.modalctrl.dismiss();
  });
}

didcerrar(){
  this.modalctrl.dismiss();
}
async detailleproveedor(){
  await this.local.presentLoading('Cargando...');
  this.post.verdetallepartner(this.presupuesto.proveedor_id).subscribe(async resp => {
    await this.local.detenerloadding();
    this.local.detalle_expert = resp.data[0];
    this.local.is_cotizacion= false;
    this.navctrl.navigateForward('/detail-proveedor');
    this.modalctrl.dismiss();

  },async (error) => {
    await this.local.detenerloadding();
  });
}
}
