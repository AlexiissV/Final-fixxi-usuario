import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalService } from '../../services/local.service';
import { AuthService } from '../../services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.page.html',
  styleUrls: ['./reset-pass.page.scss'],
})
export class ResetPassPage {
  loginform: FormGroup;
  email: AbstractControl;

  constructor(private formBuilder: FormBuilder,
              private local: LocalService,
              private auth: AuthService,
              private navctrl: NavController) { 
    this.loginform = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
        ],
      ],
    });
    this.email = this.loginform.controls.email;
  }

  async recuperarpassword(){
    if (this.loginform.invalid){
      this.local.presentToast('campos requeridos','danger');
      return;
    }
    await this.local.presentLoading('Cargando...');
    this.auth.ressetpassword(this.loginform.value).subscribe(async resp => {
      await this.local.detenerloadding();
      if(resp.code == 202){
        this.local.presentAlert(resp.message);
        this.navctrl.back();
      }else{
        this.local.presentAlert(resp.message);
      }
    });
  }
  back(){
    this.navctrl.back();
  }
}

