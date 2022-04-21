import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Experto } from 'src/app/interfaces/interfaces';
import { LocalService } from 'src/app/services/local.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-view-proveedor',
  templateUrl: './view-proveedor.page.html',
  styleUrls: ['./view-proveedor.page.scss'],
})
export class ViewProveedorPage implements OnInit {
  proveedores: Experto[]=[];

  constructor(public local: LocalService,
              private post: PostService,
              private navctrl: NavController) { }

  async ngOnInit() {
    await this.local.presentLoading('Cargando..!');
    this.post.getproveedores().subscribe(async resp =>{            
      await this.local.detenerloadding();
      if(resp.expertos.length>=1){
        this.proveedores.push(...resp.expertos);
      }else{
        this.local.presentAlert('N hay Expertos disponibles');
      }
    });
  }
  async detalleproveedor(item: Experto){
  await this.local.presentLoading('Cargando...');
  this.post.verdetallepartner(item.id).subscribe(async resp => {
    await this.local.detenerloadding();
    this.local.detalle_expert = resp.data[0];
    this.local.is_cotizacion= true;
    this.navctrl.navigateForward('/detail-proveedor');

  },async (error) => {
    await this.local.detenerloadding();
  });
}
}
