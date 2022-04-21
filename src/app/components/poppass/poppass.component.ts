import { Component } from '@angular/core';
import { LocalService } from '../../services/local.service';
import { AuthService } from '../../services/auth.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-poppass',
  templateUrl: './poppass.component.html',
  styleUrls: ['./poppass.component.scss'],
})
export class PoppassComponent{
  old_password: string='';
  new_password: string='';
  confi_password: string='';
  tipo: string='password';
  tipo2: string='password';
  tipo3: string='password';

    constructor(private local: LocalService,
                private auth: AuthService,
                private popctrl: PopoverController) { }

async cambiar(){
  await this.local.presentLoading('Cargando...');
  await this.auth.updatepassword({token: this.auth.Usuario.token, old_password:this.old_password, password: this.new_password})
  .subscribe(async resp => {
    await this.local.detenerloadding();
    this.local.presentAlert(resp.message);
    this.popctrl.dismiss();
  });
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
ver3(){
  if(this.tipo3=='password'){
    this.tipo3="text"
  }else{
    this.tipo3= "password"
  }
}
didcerrar(){
  this.popctrl.dismiss();
}
}
