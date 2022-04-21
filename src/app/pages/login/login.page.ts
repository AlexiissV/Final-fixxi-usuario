import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseX } from '@awesome-cordova-plugins/firebase-x/ngx';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/services/auth.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginform: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  token_firebase: AbstractControl;
  _storage: Storage | null = null;
  tipo: string='password';
  

  
  constructor(private formBuilder: FormBuilder,
    private local: LocalService,
    private auth: AuthService,
    private navctrl: NavController,
    private firebaseX: FirebaseX,
    private localNotifications: LocalNotifications,
    private storage: Storage) {   
    this.loginform = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
        ],
      ],
      password: [
        '',
        [
          Validators.required,
        ],
      ],
      token_firebase: [
        '',
      ],
    });
    this.email = this.loginform.controls.email;
    this.password = this.loginform.controls.password;
    this.token_firebase = this.loginform.controls.token_firebase;
  }
  async ionViewDidEnter(){
    await this.local.presentLoading('Cargando...');
    const storage = await this.storage.create();
    this._storage = storage;
    this._storage.get('usuario').then(async (resp) => {
      // tslint:disable-next-line: deprecation
      if(resp== null || resp== undefined){
        await this.local.detenerloadding();
      }else{
        this.auth.Usuario = resp;
        this.firebaseX.onMessageReceived()
        .subscribe(resp => {
          if(resp.show_notification=='false'){
            this.localNotifications.schedule({
              id: Math.floor((Math.random()*100)+1),
              title:resp.title,
              text: resp.body,
              foreground: true,
              vibrate: true
            });
          }
        });
        await this.local.detenerloadding();
        this.navctrl.navigateBack('/home');
      }
    });
  }

  async acceder(){
    if (this.loginform.invalid){
      this.local.presentToast('campos requeridos','danger');
      return;
    }    
    await this.local.presentLoading('Validando credenciales..!');
    await this.firebaseX.getToken().then(token => {
    this.token_firebase.setValue(token); 
  })
  .catch(error => console.error('Error getting token', error));
    this.auth.login(this.loginform.value).subscribe( async resp => {            
      this.firebaseX.onMessageReceived()
      .subscribe(resp => {
        if(resp.show_notification=='false'){
          this.localNotifications.schedule({
            id: Math.floor((Math.random()*100)+1),
            title:resp.title,
            text: resp.body,
            foreground: true,
            vibrate: true
          });
        }
      });
      this.local.detenerloadding();
      if(resp.type== "Success"){
        this.auth.Usuario = resp.data;        
        this.local.presentToast(`Bienvenido ${resp['data'].nombre}`,'success');
        this.auth.bandera= false;
        this._storage.set('usuario',resp.data);
        this.navctrl.navigateRoot('/home');
      }else{
        this.local.detenerloadding();
        this.local.presentAlert(resp.message)
      }
      
    }, async (error) => {
      await this.local.detenerloadding();
      this.local.presentToast('error al conectar con el servidor,intenta nuevamente', 'danger');
      });
  }
  ver(){
    if(this.tipo=='password'){
      this.tipo="text"
    }else{
      this.tipo= "password"
    }
  }
}