import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  getstados(){
    // https://dashboard.fixxiapp.com/web/v1/esys/get-estados
    return this.http.get(`${url}esys/get-estados`,{});

  }
  getmunicipios(id:number){
   // https://dashboard.fixxiapp.com/web/v1/esys/get-municipios?estado=21
   return this.http.get(`${url}esys/get-municipios?estado=${id}`,{});

  }
}
