import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { LocalService } from '../../services/local.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-cancelacion',
  templateUrl: './cancelacion.component.html',
  styleUrls: ['./cancelacion.component.scss'],
})
export class CancelacionComponent {
  @Input() id: number = null;
  @Input() status: number = null;
  @Input() status_verificacion: number = null;
  nota: string = '';

  constructor(private popctrl_: PopoverController,
              private local: LocalService,
              private post: PostService) { }

  didcerrar(){
    this.popctrl_.dismiss();
  }
  async sicancelamos(){
  await this.local.presentLoading('Cargando...');
  this.post.cancelaciondeservicio(this.id,this.nota).subscribe(async resp => {
    await this.local.detenerloadding();
    if(resp.code==202){
      this.local.presentAlert(resp.message);
      this.popctrl_.dismiss({si: true});
    }
  });
}
}
