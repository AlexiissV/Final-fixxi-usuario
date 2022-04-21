import { Component } from '@angular/core';
import { LocalService } from '../../services/local.service';
import { PostService } from '../../services/post.service';
import { Listdiagnostico } from '../../interfaces/interfaces';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-views-diagnosticos',
  templateUrl: './views-diagnosticos.page.html',
  styleUrls: ['./views-diagnosticos.page.scss'],
})
export class ViewsDiagnosticosPage {
diagnosticos: Listdiagnostico[] = [];
terminados: Listdiagnostico[] = [];
  constructor(private local: LocalService,
              private post: PostService,
              private navctrl: NavController) { }

  async ionViewDidEnter() {
    if(this.diagnosticos.length >=1){
      this.diagnosticos = [];
      this.terminados = [];
    }
    await this.local.presentLoading('Cargando Información');
    this.post.getmisDiagnosticos().subscribe( async resp => {  
      await this.local.detenerloadding();
        this.diagnosticos = resp.otros;
        this.terminados= resp.terminados;
        this.terminados.push(...resp.rechazados);
    }, async (error) => {
      await this.local.detenerloadding();
      this.local.presentAlert('no hay Información para mostrar');
    });
  }
  verdetalle(item: Listdiagnostico){
    this.local.detalle_diagnostico = item;
    this.navctrl.navigateForward('/detalle-diagnostico');
  }
}
