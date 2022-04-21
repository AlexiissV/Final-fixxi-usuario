import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalService } from './local.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { RestNewUser, RootObject, Usuario, Respuesta, RestUpdate } from '../interfaces/interfaces';
const url = environment.url

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  Usuario: Usuario = {};
  bandera: boolean = false;
  constructor(private local: LocalService,
    private http: HttpClient) { }

  login(body: any) {
    return this.http.post<RootObject>(`${url}cliente/login`, body, {});
  }
  registro(body: any): Observable<RestNewUser> {
    //https://dashboard.fixxiapp.com/web/v1/proveedor/register
    // console.log(body);
    return this.http.post<RestNewUser>(`${url}cliente/register`, body, {});
  }

  updateperfil(data: any) {
    // v1/cliente/update-perfil-cliente    
    return this.http.post<RestUpdate>(`${url}cliente/update-perfil-cliente`, data, {});
  }
  updatepassword(data: any) {
    // v1/cliente/update-password-cliente
    return this.http.post<Respuesta>(`${url}cliente/update-password-cliente`, data, {});
  }
  ressetpassword(email: string){
    // https://dashboard.fixxiapp.com/web/v1/cliente/reset-password
    return this.http.post<Respuesta>(`${url}cliente/reset-password`, {email}, {});

  }
}
