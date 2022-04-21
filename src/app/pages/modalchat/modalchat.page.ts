import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ModalController, Platform, NavController } from '@ionic/angular';
import { LocalService } from '../../services/local.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-modalchat',
  templateUrl: './modalchat.page.html',
  styleUrls: ['./modalchat.page.scss'],
})
export class ModalchatPage implements OnInit {
  mensaje: string;
  elemento: any;
  chattime: any;


  constructor( private modalctrl: ModalController,
               public local: LocalService,
               private navctrl: NavController,
               private post: PostService) { }

  ngOnInit() {
    /*this.elemento = document.getElementById('app-mensajes');
    setTimeout(()=>{
      this.elemento.scrollTop= this.elemento.scrollHeight;
    },200);
    this.post.getChat(this.local.usuario.token,this.local.viewdel.envio_id)
    .subscribe(resp =>{
      this.chats =resp.messages;
    });

    this.chattime =  setInterval(() => {
      this.post.getChat(this.local.usuario.token, this.local.viewdel.envio_id)
      .subscribe(resp => {
        console.log(resp);
        this.chats = resp.messages;
      });
    }, 40000);*/
  }
  salir() {
  //  clearInterval(this.chattime);
     // this.modalctrl.dismiss({ mensaje: '' });
     this.navctrl.back();
  }
  agregarmensaje(){
  /*  if(this.mensaje === ''){
      return;
    }
  const data = {
    cliente_id: this.local.usuario.id,
    cliente : this.local.usuario.nombre,
    mensaje: this.mensaje
  }
  this.post.emitirMesaje(this.local.usuario.token,this.local.viewdel.envio_id,this.mensaje).subscribe(resp =>{
  this.chats.push(data);
  });
    setTimeout(()=>{
      this.mensaje = '';
      this.elemento.scrollTop= this.elemento.scrollHeight;
    },200)*/
  }
}
