import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { FirebaseX } from '@awesome-cordova-plugins/firebase-x/ngx';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { MyMessage } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-modalchat',
  templateUrl: './modalchat.page.html',
  styleUrls: ['./modalchat.page.scss'],
})
export class ModalchatPage implements OnInit {
  @Input() id: number= null;
  mensaje: string='';
  elemento: any;
  elemento2: any;
  chats: MyMessage[]= [];
  bandera: boolean= false;


  constructor( private modalctrl: ModalController,
               public auth: AuthService,
               private post: PostService,
               private firebaseX: FirebaseX,
               private localNotifications: LocalNotifications) { }

  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');
    this.elemento2 = document.getElementById('btn-refres');
    this.post.getconversasion(this.id)
      .subscribe(resp => {
        this.chats = resp.messages;
        
        setTimeout(() => {
          this.elemento.scrollTop = this.elemento.scrollHeight;
        }, 200);
      });
    this.firebaseX.onMessageReceived()
      .subscribe(async resp => {
        console.log(resp);
        if(resp.is_mensage!= undefined && resp.is_mensage=='10'){
          await this.post.getconversasion(this.id)
          .subscribe(resp => {
            this.chats.push(resp.messages[resp.messages.length-1]);
            this.bandera= true;
            this.elemento2.click();
            setTimeout(()=>{
              this.elemento.scrollTop= this.elemento.scrollHeight;
            },200);
          });
        }
        if (resp.show_notification == 'false') {
          this.localNotifications.schedule({
            id: Math.floor((Math.random() * 100) + 1),
            title: resp.title,
            text: resp.body,
            foreground: true,
            vibrate: true
          });
        }
      });
  }
  salir() {
    this.modalctrl.dismiss();
  }
  agregarmensaje(){
    if(this.bandera==false){
    if(this.mensaje == ''){
      return;
    }
  const data = {
    user_id:this.auth.Usuario.id,
    user:this.auth.Usuario.nombre,
    mensaje: this.mensaje,
    tipo: 10,
    time:''
  };
  this.post.enviarmensaje(this.id,this.mensaje).subscribe(resp =>{   
    this.mensaje = '';     
    this.chats.push(data);
    setTimeout(()=>{
      this.elemento.scrollTop= this.elemento.scrollHeight;
    },200);
  });
  }else{
    this.bandera= false;
  }
}
}
