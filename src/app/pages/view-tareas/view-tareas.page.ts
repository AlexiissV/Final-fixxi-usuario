import { Component, OnInit } from '@angular/core';
import { Mytarea } from 'src/app/interfaces/interfaces';
import { PostService } from 'src/app/services/post.service';
import { LocalService } from '../../services/local.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-view-tareas',
  templateUrl: './view-tareas.page.html',
  styleUrls: ['./view-tareas.page.scss'],
})
export class ViewTareasPage {
  event:any;
  Tareas: Mytarea[] =[];
  Terminados: Mytarea[] =[];

  constructor(private local: LocalService,
              private post: PostService,
              private navctrl: NavController) { }

  verdetalle(item: Mytarea){
    this.local.midetalle= item;
    this.navctrl.navigateForward('/detalle-tarea');

  }
  async ionViewDidEnter(){
    if(this.Tareas.length>=1 || this.Terminados.length>=1){
      this.Tareas=[];
      this.Terminados=[];
      if(this.event!= undefined || this.event!=null){
        this.event.target.complete()
      }
    }
    await this.local.presentLoading('Cargado..!');
    this.post.getmisTareas().subscribe(async resp =>{       
      await this.local.detenerloadding();
      if(resp.vigentes.length!=0 || resp.terminados.length!=0){
        this.Tareas.push(...resp.vigentes);
        this.Terminados.push(...resp.terminados);
      }else{
      this.local.presentAlert('No hay informacion para mostrar');
      }
    },async (error) => {
      await this.local.detenerloadding();
    });
  }
  doRefresh(event) {
    this.event= event;
    this.ionViewDidEnter();
  }
  
}
