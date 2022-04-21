import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SwiperModule } from 'swiper/angular'
import { Stripe } from '@awesome-cordova-plugins/stripe/ngx';
import { FirebaseX } from '@awesome-cordova-plugins/firebase-x/ngx';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { IonicStorageModule } from '@ionic/storage-angular';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, SwiperModule, IonicStorageModule.forRoot()  ],
  providers: [
    Camera,
    Geolocation,
    Stripe,
    FirebaseX,
    LocalNotifications,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
