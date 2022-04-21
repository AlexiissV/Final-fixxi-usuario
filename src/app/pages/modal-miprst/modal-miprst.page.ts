import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LocalService } from 'src/app/services/local.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-modal-miprst',
  templateUrl: './modal-miprst.page.html',
  styleUrls: ['./modal-miprst.page.scss'],
})
export class ModalMiprstPage {
nota: string = '';
costo: number = null;
@Input() id: number;

  constructor(private post: PostService,
              private local: LocalService,
              private modalctrl: ModalController) { }

  async enviar(){
    await this.local.presentLoading('Cargando..!');
    this.post.contraoferta(this.id,this.costo,this.nota).subscribe(async resp =>{
      await this.local.detenerloadding();
      if(resp.code ==202){
        this.local.presentAlert(resp.message);
        this.modalctrl.dismiss({si: true});
      }else{
        this.local.presentAlert(resp.message);
        this.modalctrl.dismiss();
      }
    }, async (error) =>{
      await this.local.detenerloadding();
      this.modalctrl.dismiss();
    });
    
  }
  didcerrar(){
    this.modalctrl.dismiss();
  }
}
