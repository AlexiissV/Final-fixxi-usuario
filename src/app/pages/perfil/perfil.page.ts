import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PopoverController } from '@ionic/angular';
import { PoppassComponent } from '../../components/poppass/poppass.component';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalService } from '../../services/local.service';
import { PopselecComponent } from 'src/app/components/popselec/popselec.component';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  RegistroForm: FormGroup;
  telefono: AbstractControl;
  email: AbstractControl;
  nombre: AbstractControl;
  apellido: AbstractControl;
  miimg: string;
  _storage: Storage | null = null;

  profile_picture: string='';
  
  constructor(public auth: AuthService,
              private popctrl: PopoverController,
              private formBuilder: FormBuilder,
              private local: LocalService,
              private storage: Storage,
              private camera: Camera,) { 
                this.RegistroForm = this.formBuilder.group({
                  nombre: [
                    '',
                    [
                      Validators.required,
                    ],
                  ],
                  apellido: [
                    '',
                    [
                      Validators.required,
                    ],
                  ],
                  telefono: [
                    '',
                    [
                      Validators.required,
                      Validators.maxLength(10),
                      Validators.minLength(10)
                    ],
                  ],
                  email: [
                    '',
                    [
                      Validators.required,
                      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
                    ],
                  ],
                  token: [
                    this.auth.Usuario.token,
                  ],
                });
                this.telefono= this.RegistroForm.controls.telefono;
                this.email= this.RegistroForm.controls.email;
                this.nombre= this.RegistroForm.controls.nombre;
                this.apellido= this.RegistroForm.controls.apellido;
                if(auth.Usuario.profile_picture== null || auth.Usuario.profile_picture== undefined || auth.Usuario.profile_picture== ''){
                  this.miimg='/assets/img/Default_PP.png';
                }else{
                  this.miimg= auth.Usuario.profile_picture;
                }
                this.email.setValue(auth.Usuario.email);
                this.telefono.setValue(auth.Usuario.telefono);
                this.nombre.setValue(auth.Usuario.nombre);
                this.apellido.setValue(auth.Usuario.apellidos);
              }
  async ngOnInit(): Promise<void> {
    const storage = await this.storage.create();
    this._storage = storage;  }

  validacaracter(){
    this.telefono.setValue(this.telefono.value.replace(/\D/g, ''));
  }
  async updateinfo(){
    let data ={};
    if(this.profile_picture!= ''){
      data = {
        token: this.RegistroForm.controls.token.value,
        telefono: this.telefono.value,
        email: this.email.value,
        profile_picture: this.profile_picture};
    }else{
      data = {
        nombre:this.nombre.value,
        apellidos:this.apellido.value,
        token: this.RegistroForm.controls.token.value,
        telefono: this.telefono.value,
        email: this.email.value};
    }
    await this.local.presentLoading('Cargando...');
    this.auth.updateperfil(data).subscribe(async resp =>{
      await this.local.detenerloadding();
      if(resp.code=202){
        console.log(resp);
        
        this.auth.Usuario.email = resp.data.email;
        this.auth.Usuario.telefono = resp.data.telefono;
        this.auth.Usuario.nombre = resp.data.nombre;
        this.auth.Usuario.apellidos = resp.data.apellidos;
        if(resp.data.foto_perfil!= null){
          this.auth.Usuario.profile_picture=resp.data.foto_perfil; 
        }
        this._storage.set('usuario',this.auth.Usuario);
        this.local.presentAlert(resp.message);
      }else{
      this.local.presentAlert(resp.message);
      }
    });
  }
 async cambiarpass(){
    const popover = await this.popctrl.create({
      component: PoppassComponent,
      backdropDismiss: false,
      mode:'ios',
      componentProps: {
        
      }
    });
    popover.style.cssText = '--min-width: 80%; border-radius: 10px;';
    await popover.present();
  }
  async opciones(){
    const popover =await this.popctrl.create({
      component: PopselecComponent,
      backdropDismiss:true,
      mode:'ios'
    });
    popover.style.cssText = '--min-width: 80%; --min-height:20%';
    await popover.present();
    const {data} = await popover.onWillDismiss();
    if(data!= undefined){
      if(data==10){
        this.abrirCamara();
      }else{
        this.abrirGaleria();
      }
    }    
  }
  abrirGaleria() {
    const options: CameraOptions   = {
      quality: 90,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    };
    this.procesarImagen(options);
  }
  abrirCamara() {
    const options: CameraOptions = {
      quality: 90,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA,
    };
    this.procesarImagen(options);
  }
  
  procesarImagen(options: CameraOptions) {
    this.camera.getPicture(options).then(
      (imageData) => {
        this.miimg = 'data:image/jpeg;base64,' + imageData;
        this.profile_picture= imageData;
      },
      (err) => {
      }
    );
  }
}
