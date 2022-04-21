import { Component, OnInit } from '@angular/core';
import { LocalService } from '../../services/local.service';
import { MiNotificacion } from '../../interfaces/interfaces';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-view-noti',
  templateUrl: './view-noti.page.html',
  styleUrls: ['./view-noti.page.scss'],
})
export class ViewNotiPage {
notifi: MiNotificacion[]=[];
  constructor(private local: LocalService,
              private post: PostService) {
    this.notifi= local.notificaciones;
   }
   async doRefresh(event){
    await this.post.getnotificaciones().subscribe(resp => {
      this.notifi= resp.lista;
      this.local.notificaciones= resp.lista;
      event.target.complete()
     });
   }
}
