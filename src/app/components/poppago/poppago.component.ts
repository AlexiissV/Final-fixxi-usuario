import { Component, Input } from '@angular/core';
import { LocalService } from '../../services/local.service';
import { PostService } from '../../services/post.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-poppago',
  templateUrl: './poppago.component.html',
  styleUrls: ['./poppago.component.scss'],
})
export class PoppagoComponent {
@Input() id: number;
  constructor(private local: LocalService,
              private post: PostService,
              private popctrl: PopoverController) { }

  async confirmar(){
    await this.local.presentLoading('Cargando...');
    this.post.confirmaciondepago(this.id).subscribe(async resp => {
      await this.local.detenerloadding();
      this.local.presentAlert(resp.message);
      if(resp.code == 202){
        this.popctrl.dismiss({si: true});
      }else{
        this.popctrl.dismiss();
      }
    },async (error) => {
      await this.local.detenerloadding();
      this.popctrl.dismiss();
    });
  }
  didcerrar(){
    this.popctrl.dismiss();
  }
}
