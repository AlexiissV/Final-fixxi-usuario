import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class ScriptmapsService {
  apiKey = environment.ApiKeyGoogleMaps;
  mapsLoaded = false;


  constructor() {}

  init(renderer: any, document: any): Promise<any> {

    return new Promise((resolve) => {

      if (this.mapsLoaded) {
        resolve(true);
        return;
      }

      const script = renderer.createElement('script');
      script.id = 'googleMaps';

      window['mapInit'] = () => {
          this.mapsLoaded = true;
          resolve(true);
          return;
      }

      if(this.apiKey){
          script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit&libraries=places&language=es';
      } else {
          script.src = 'https://maps.googleapis.com/maps/api/js?callback=mapInit&libraries=places&language=es';       
      }

      renderer.appendChild(document.body, script);

    });

  
  }
}
