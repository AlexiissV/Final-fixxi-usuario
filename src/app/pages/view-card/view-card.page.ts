import { Component, ViewChild } from '@angular/core';
import { LocalService } from '../../services/local.service';
import { PostService } from '../../services/post.service';
import { Card } from '../../interfaces/interfaces';
import { IonReorderGroup } from '@ionic/angular';
@Component({
  selector: 'app-view-card',
  templateUrl: './view-card.page.html',
  styleUrls: ['./view-card.page.scss'],
})
export class ViewCardPage {
  miTarjeta: Card[] = [];
  principal: Card;
  sino: boolean= true;
  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  
  constructor(private local: LocalService,
              private post: PostService) {}

  async ionViewDidEnter() {
    if(this.miTarjeta.length>=1){
      this.miTarjeta= [];
    }
    await this.local.presentLoading('Cargando..!');
    await this.post.getmicard().subscribe(async resp => {
      await this.local.detenerloadding();
      if(resp.code == 202  && resp.card.length>=1){
        for(let car of resp.card){
          if(car.predefinido){
            this.principal= car;
          }else
          {
            this.miTarjeta.push(car);
          }
        }
        this.miTarjeta.unshift(this.principal);
      }else{
      this.local.presentAlert('Aun no has registrado una tarjeta');
      }
    });
    }
    habilita(){
      this.reorderGroup.disabled = !this.reorderGroup.disabled;
    }
    async doReorder(ev) {
      if(ev.detail.to==0){
        await this.local.presentLoading('Cargando...');
        this.post.cambiarprincipalcard(this.miTarjeta[ev.detail.from].id)
        .subscribe(async resp => {
          await this.local.detenerloadding();
          if(resp.code ==202){
            this.miTarjeta= [];
            this.ionViewDidEnter();
          }else{
            this.local.presentAlert(resp.message);
          }
        }, async (error) => {
          await this.local.detenerloadding();
        });
      }
      ev.detail.complete();
      this.reorderGroup.disabled = !this.reorderGroup.disabled;
    }
    async eliminar(item: Card){
      await this.local.presentLoading('Eliminando...');
      this.post.eliminartarjeta(item.id)
      .subscribe(async resp => {
        await this.local.detenerloadding();
        if(resp.code ==202){
          this.miTarjeta= [];
          this.ionViewDidEnter();
        }else{
          this.local.presentAlert(resp.message);
        }
  
        
      }, async (error) => {
        await this.local.detenerloadding();
      });
  
    }
}

