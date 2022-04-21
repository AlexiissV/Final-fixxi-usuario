import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LocalService } from '../../services/local.service';
import { NavController, PopoverController } from '@ionic/angular';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { AddressService } from '../../services/address.service';
import { PopavisoComponent } from 'src/app/components/popaviso/popaviso.component';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.page.html',
  styleUrls: ['./new-user.page.scss'],
})
export class NewUserPage {
  RegistroForm: FormGroup;
    nombre: AbstractControl;
    apellidos: AbstractControl;
    telefono_movil: AbstractControl;
    email: AbstractControl;
    password: AbstractControl;
    comfir_password: AbstractControl;
    check: AbstractControl;
    tipo: string='password';
    tipo2: string='password';
    estado_id: number= null;
    ciudad_id: number= null;
    muni= [];
    Estados:any[]=[];



  constructor(private local: LocalService,
              private navctrl: NavController,
              private formBuilder: FormBuilder,
              private post: PostService,
              private addr: AddressService,
              private popctrl: PopoverController,
              private auth: AuthService) {
                this.RegistroForm = this.formBuilder.group({
                  nombre: [
                    '',
                    [
                      Validators.required,
                    ],
                  ],
                  apellidos: [
                    '',
                    [
                      Validators.required,
                    ],
                  ],
                  password: [
                    '',
                    [
                      Validators.required,
                    ],
                  ],
                  comfir_password: [
                    '',
                    [
                      Validators.required,
                    ],
                  ],
                  telefono_movil: [
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
                  check: [
                    false,
                    [
                      Validators.required,
                    ],
                  ],
                });
                this.nombre= this.RegistroForm.controls.nombre;
                this.apellidos= this.RegistroForm.controls.apellidos;
                this.telefono_movil= this.RegistroForm.controls.telefono_movil;
                this.email= this.RegistroForm.controls.email;
                this.password= this.RegistroForm.controls.password;
                this.comfir_password= this.RegistroForm.controls.comfir_password;
                this.check= this.RegistroForm.controls.check;
               }

               ngOnInit() {
                this.addr.getstados().subscribe(resp => {
                  this.Estados  = resp['estados'];
                });
                
              }
  validacaracter(){
    this.telefono_movil.setValue(this.telefono_movil.value.replace(/\D/g, ''));
  }
  async terminar(){
    this.local.presentLoading('Registrando informacion..!');
        this.auth.registro(this.RegistroForm.value)
    .subscribe(async resp => { 
      await this.local.detenerloadding();
      if(resp.code ==200){
        this.auth.Usuario = resp.data;
        this.navctrl.navigateRoot('/home');
      }else{
        await this.local.detenerloadding();            
        this.local.presentAlert(resp.message);
      }
    },async (error) => {
      await this.local.detenerloadding();            
    });
  }
        back(){
          this.navctrl.back();
        }
        ver(){
          if(this.tipo=='password'){
            this.tipo="text"
          }else{
            this.tipo= "password"
          }
        }
        ver2(){
          if(this.tipo2=='password'){
            this.tipo2="text"
          }else{
            this.tipo2= "password"
          }
        }


        async municipios(event){
          this.estado_id= Number(event.detail.value);
          if(event.detail.value=='8'){
            this.addr.getmunicipios(Number(event.detail.value)).subscribe(resp =>{
              this.muni= resp['municipios'];              
            }); 
          }else{
            this.ciudad_id= null;
            const popavi = await this.popctrl.create({
              component: PopavisoComponent,
              backdropDismiss:false,
              mode:'ios'
            });
            popavi.style.cssText = '--min-width: 80%;';
            await popavi.present();
            // this.local.presentAlert('lo sentimos, Aun no contamoscon servicio en tu estado')
          }
        }
        async ciudad(event){
          this.ciudad_id= Number(event.detail.value);
          if(event.detail.value!='243'){
            this.ciudad_id= null;
            const popavi = await this.popctrl.create({
              component: PopavisoComponent,
              backdropDismiss:false,
              mode:'ios'
            });
            popavi.style.cssText = '--min-width: 80%;';
            await popavi.present();
          }
            // this.local.presentAlert('lo sentimos, Aun no contamoscon servicio en tu estado')
          
        }
      }
