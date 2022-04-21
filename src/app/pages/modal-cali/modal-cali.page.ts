import { Component, Input } from '@angular/core';
import { PostService } from '../../services/post.service';
import { LocalService } from '../../services/local.service';
import { NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-cali',
  templateUrl: './modal-cali.page.html',
  styleUrls: ['./modal-cali.page.scss'],
})
export class ModalCaliPage {
  @Input() tarea_id: number;
  @Input() foto: string;
  @Input() nombre: string;
  @Input() val: string;
  score = 0;
  nota:string='';
  estrellas = [
    {value: 1,
    icon:'star-outline'
  },
  {value: 2,
    icon:'star-outline'
  },
  {value: 3,
    icon:'star-outline'
  },
  {value: 4,
    icon:'star-outline'
  },
  {value: 5,
    icon:'star-outline'
  }
  ];
  constructor(private post: PostService,
              private local: LocalService,
              private modalctrl: ModalController) { }


  cambio(value: number){
    this.score = value;
    const rgh= this.estrellas.length;
    for(let i=0; i< rgh; i++){
      if(i< value){
        this.estrellas[i].icon= 'star';
      }else{
        this.estrellas[i].icon ='star-outline';
      }
    }
  }
  async calificartarea(){
    await this.local.presentLoading('Cargando...');
    this.post.CalificarTarea(this.tarea_id,this.score,this.nota)
    .subscribe(async (resp) => {
      await this.local.detenerloadding();
      if(resp.code=202){
        this.local.presentAlert(resp.message);
        this.modalctrl.dismiss(10);
      }else{
        this.local.presentAlert(resp.message);
        this.modalctrl.dismiss();
      }
    });
  }
  didcerrar(){
    this.modalctrl.dismiss();
  }
}
