import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2, ViewChild, ElementRef, Input } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalController } from '@ionic/angular';
import { LocalService } from 'src/app/services/local.service';
import { PostService } from 'src/app/services/post.service';
import { ScriptmapsService } from '../../services/scriptmaps.service';
declare var google: any;

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {
  @ViewChild( 'map' ,{static:false}) divMap: ElementRef;
  @Input() eliminar: boolean = false;
  @Input() update: boolean = false;
  @Input() lat: number = 19.0413;
  @Input() lng: number = -98.2062;
  @Input() id: number = null;
  @Input() Gdireccion: any;
  @Input() etique: string= '';
  @Input() colonia: string= '';
  map: any;
  myLatlng: any;
  geocoder: any;
  search: string='';

  constructor(private renderer: Renderer2,
    @Inject(DOCUMENT) private document,
    private googlemapsService: ScriptmapsService,
    private geo: Geolocation,
      private local: LocalService,
      private post: PostService,
      private modalctrl: ModalController) { }

 async ngOnInit() {  
    this.googlemapsService.init(this.renderer, this.document).then( () => {
      this.initMap();
}).catch( (err) => {    
});
  }

  async initMap() {
    let latLng = new google.maps.LatLng(this.lat,this.lng);

    let mapOptions = {
          center: latLng,
          zoom: 15,
          disableDefaultUI: true,
          clickableIcons: false,
    };

    this.map = new google.maps.Map(this.divMap.nativeElement, mapOptions);
    this.geocoder = new google.maps.Geocoder();
    if(this.update==false){
      await this.local.presentLoading('Cargando...');
      await this.geo.getCurrentPosition().then( async (resp) => {        
        this.myLatlng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
        const data = await this.geocoder.geocode({'location':this.myLatlng},(results: { formatted_address: any; }[],status: string)=>{             
        });        
        this.Gdireccion = data.results[0].formatted_address; 
        this.map.setZoom(17);
        this.map.setCenter(this.myLatlng);
       await this.local.detenerloadding();
        
        
     }).catch(async (error) => {
       
     await  this.local.detenerloadding();
     this.local.presentAlert('No pudimos acceder a su ubicacion, intenta nuevamente');          
     });
    }    
    google.maps.event.addListener(this.map, 'dragend', async () => { 
        /**Cada que se mueve termina de arrastrar se obtiene el centro de la pantalla en coordenadas */                 
                 var coordenadas= this.map.getCenter();
                this.myLatlng = new google.maps.LatLng(coordenadas.lat(),coordenadas.lng());
                
        /**solo crea un objeto coordenadas latlng   */  
      const data = await this.geocoder.geocode({'location':this.myLatlng},async function(results: { formatted_address: any; }[],status: string){
  
      });
          this.Gdireccion = data.results[0].formatted_address;  
              });
               /**Se utiliza para obtener la direccion a la inversa aqui se mandan coordenadas y regresa direccion   */ 
        // Create the search box and link it to the UI element.
        const input: any = document.getElementById('pac-input');
        const searchBox = new google.maps.places.SearchBox(input);
        this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
         // Bias the SearchBox results towards current map's viewport.
      this.map.addListener('bounds_changed', () => {
        searchBox.setBounds(this.map.getBounds());
      });
      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();
        if (places.length === 0) {
          return;
        }
         // For each place, get the icon, name and location.
         const bounds = new google.maps.LatLngBounds();
         places.forEach(async place => {
           this.search ='';
           if (!place.geometry) {
             return;
           }
           this.map.setCenter(place.geometry.location);
           var coordenadas= this.map.getCenter();
           this.myLatlng = new google.maps.LatLng(coordenadas.lat(),coordenadas.lng());
           const data = await this.geocoder.geocode({'location':this.myLatlng},async function(results: { formatted_address: any; }[],status: string){
          });
          this.Gdireccion = data.results[0].formatted_address;  
          
          });
        });
}
async miubicacion(){
  // this.diagnostic.isLocationEnabled().then(async resp => {
   //    if (resp === true){
     await this.local.presentLoading('Cargando--!');
       await this.geo.getCurrentPosition().then( async (resp) => {
           this.myLatlng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
           const data = await this.geocoder.geocode({'location':this.myLatlng},(results: { formatted_address: any; }[],status: string)=>{             
           });
           this.Gdireccion = data.results[0].formatted_address; 
           this.map.setZoom(18);
           this.map.setCenter(this.myLatlng);
          await this.local.detenerloadding();
           
           
        }).catch(async (error) => {
        await  this.local.detenerloadding();
        this.local.presentAlert('No pudimos acceder a su ubicacion, intenta nuevamente');          
        });
     /*  }else{
         const alert = await this.alertcrtl.create({
           backdropDismiss: false,
           header: 'Alerta',
           message: 'Es necesario que actives la ubicacion del Dipositivo para realizar esta operacion',
           buttons: [
              {
               text: 'Ok',
               handler: () => {
                 alert.dismiss();
                 this.miubicacion();
               }
             }
           ]
         });
         await alert.present();
       }
         }).catch(async e => {
           const alert = await this.alertcrtl.create({
             backdropDismiss: false,
             header: 'Alerta',
             message: 'Es necesario que actives la ubicacion del Dipositivo para realizar esta operacion',
             buttons: [
                {
                 text: 'Ok',
                 handler: () => {
                   alert.dismiss();
                   this.miubicacion();
                 }
               }
             ]
           });
           await alert.present();
         });*/
 }
 async actualizar(){
  await this.local.presentLoading('Guardando informacion');
  this.post.updateaddress(this.id,this.Gdireccion,this.myLatlng.lat(),this.myLatlng.lng(), this.colonia)
  .subscribe( async resp => {
    await this.local.detenerloadding();
    if(resp.code ==202){
      this.local.presentAlert(resp.message);
      this.modalctrl.dismiss({si:true});
     }else{
       this.local.presentAlert(resp.message);
    }
  });
 }
 async terminar(){
    await this.local.presentLoading('Guardando informacion');
   this.post.adddireccion(this.etique,this.Gdireccion, this.myLatlng.lat(),this.myLatlng.lng(),this.colonia)
   .subscribe(async resp =>{
     await this.local.detenerloadding();
     if(resp.code ==202){
       this.local.presentAlert(resp.message);
       this.modalctrl.dismiss({si:true});
      }else{
        this.local.presentAlert(resp.message);
     }
   });
 }
 async emiminar(){
  await this.local.presentLoading('Eliminando Información');
  this.post.removeaddress(this.id).subscribe(async resp =>{
    await this.local.detenerloadding();
    if(resp.code==202){
      this.local.presentAlert(resp.message);
      this.modalctrl.dismiss({si:true});
    }else{
      this.local.presentAlert(resp.message);
      this.modalctrl.dismiss();
    }
  },(error)=>{
    this.local.detenerloadding();
  });

}
}
