import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  img: string= '/assets/icon/logo-orange.png';
  _storage: Storage | null = null;


  constructor(public auth: AuthService,
             private Alertctrl: AlertController,
             private Navctrl: NavController,
             private storage: Storage) {
              }
  async ngOnInit(): Promise<void> {
    const storage = await this.storage.create();
    this._storage = storage;  
  }
              
   async cerrar() {
              const alert = await this.Alertctrl.create({
                backdropDismiss: false,
                mode: 'ios',
                header: 'Sesión',
                subHeader: 'Esta seguro de cerrar su sesión',
                buttons: [
                  {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                    }
                  },
                   {
                    text: 'Salir',
                    cssClass: 'primary',
                    handler: async () => {
                      await this._storage.remove('usuario');
                        this.Navctrl.navigateRoot('/login');
                    }
                  }
                ]
              });
              await alert.present();
               }
}

