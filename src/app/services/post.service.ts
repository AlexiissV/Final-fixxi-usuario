import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Respuesta, RestCategorias, RestMisAddress, RestMistareas, RestViewPro, RestCard, RestDiagnosticos, RestConcepto, RestPerfilone, RestNoti, RESTMyTicket } from '../interfaces/interfaces';
import { AuthService } from './auth.service';
import { LocalService } from './local.service';
const url= environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostService {

  
  constructor(private http: HttpClient,
              private auth: AuthService,
              private local: LocalService) { }

/*----------------- GET´S-------------------------*/
getcategorias(){
// https://dashboard.fixxiapp.com/web/v1/categoria/get-categorias--- principal
///v1/categoria/get-usuario-list-categorias
return this.http.post<RestCategorias>(`${url}categoria/get-usuario-list-categorias`,{token: this.auth.Usuario.token},{});
}
getmisaddress(){
  return this.http.post<RestMisAddress>(`${url}cliente/get-direccion`,{token: this.auth.Usuario.token}, {});

}
removeaddress(direccion_id: number){
  return this.http.post<Respuesta>(`${url}cliente/update-baja-direccion`,{token: this.auth.Usuario.token,direccion_id}, {});
}

crearTarea( categoria_id: number,titulo: string,descripcion: string,direccion_id: number,
  costo:number, fecha: string,hora:string,imagen_array: string[], tipo_servicio: number){
  const data ={
    token: this.auth.Usuario.token,
  categoria_id,
  tipo_servicio,
  titulo,
  descripcion,
  direccion_id,
  costo, 
  fecha,	 
  hora,		 
 imagen_array
};
  return this.http.post<Respuesta>(`${url}tarea/post-tarea`, data, {});

}
solicitarcotizacion( categoria_id: number,titulo: string,descripcion: string,direccion_id: number,
  costo:number, fecha: string,hora:string,imagen_array: string[],proveedor_id: number,tipo_servicio: number){
  // Url: v1/tarea/post-tarea-proveedor
  const data = {
    token: this.auth.Usuario.token,
	  proveedor_id,
    tipo_servicio,
  categoria_id,
  titulo,
  descripcion,
  direccion_id,
  costo, 
  fecha,	 
  hora,		 
 imagen_array
};
return this.http.post<Respuesta>(`${url}tarea/post-tarea-proveedor`, data, {});

}

getmisTareas(is_terminado?: number){
  // /tarea/get-my-tarea
  return this.http.post<RestMistareas>(`${url}tarea/get-my-tarea`, {token: this.auth.Usuario.token, is_terminado}, {});
}
updateaddress(id_direccion: number,direccion: string,lat: number,long: number){
  // v1/cliente/update-direccion
  const data= {
    token : this.auth.Usuario.token,
    id_direccion,
    direccion,
    lat,
    long
}

return this.http.post<Respuesta>(`${url}cliente/update-direccion`, data, {});
}
adddireccion(etiqueta_text: string, direccion: string, lat: number, lng: number){
  const data ={
    token : this.auth.Usuario.token,
    etiqueta_text,
    direccion,
    lng,
    lat
  };
  
  //v1/cliente/post-direccion  
  return this.http.post<Respuesta>(`${url}cliente/post-direccion`, data, {});
}

getproveedores(){
  // /cliente/get-search-experto
  return this.http.post<RestViewPro>(`${url}cliente/get-search-experto`, {token: this.auth.Usuario.token, categoria_id:this.local.Cat.id}, {});
}
contratarproveedor(tarea_id: number,proveedor_id: number){
  //Url: v1/tarea/post-contratar
  const data ={
	  token : this.auth.Usuario.token,
	  tarea_id,
	  proveedor_id
  };
return this.http.post<Respuesta>(`${url}tarea/post-contratar`, data, {});
}
contratarproveedorDiagnost(tarea_id: number,proveedor_id: number){
  //Url: v1/tarea/post-contratar
  const data ={
	  token : this.auth.Usuario.token,
	  tarea_id,
	  proveedor_id
  };
return this.http.post<Respuesta>(`${url}tarea/post-contrato-servicio`, data, {});
}
contraoferta(tarea_id: number,total: number,nota: string){
  const data ={
    token: this.auth.Usuario.token,
    tarea_id,
	  total,
	  nota
  };
  
  // Url: v1/cliente/post-propuesta-contrato
  return this.http.post<Respuesta>(`${url}cliente/post-propuesta-contrato`, data, {});

}
aceptarnegociacion(tarea_id: number,propuesta_id: number){
  // Url: v1/cliente/post-aceptar-contrato
  const data={
      token: this.auth.Usuario.token,
      tarea_id,
      propuesta_id
  };
  return this.http.post<Respuesta>(`${url}cliente/post-aceptar-contrato`, data, {});
}
CalificarTarea(tarea_id: number, valoracion: number, nota: string){
  // Url: /v1/cliente/post-termino-tarea
  const data = {
    token : this.auth.Usuario.token,
    tarea_id,
    valoracion, 
    nota
  }
  return this.http.post<Respuesta>(`${url}cliente/post-termino-tarea`, data, {});
}
solicitarDiagnostico(tarea_id: number, proveedor_id: number){
  // Url: v1/cliente/post-diagnostico
  const data= {
    token : this.auth.Usuario.token,
    tarea_id,
    proveedor_id
  };
  return this.http.post<Respuesta>(`${url}cliente/post-diagnostico`, data, {});
}
enviartoken(stripe_customer_id: string){
// Url: /v1/cliente/stripe-customer
return this.http.post<Respuesta>(`${url}cliente/stripe-customer`, {token: this.auth.Usuario.token, stripe_customer_id}, {});
}

getmicard(){
  // Url; /v1/cliente/get-metodos-pago
  return this.http.post<RestCard>(`${url}cliente/get-metodos-pago`, {token: this.auth.Usuario.token}, {});
}
getmisDiagnosticos(){
  // Url: v1/cliente/get-my-diagnostico
  return this.http.post<RestDiagnosticos>(`${url}cliente/get-my-diagnostico`, {token: this.auth.Usuario.token}, {});
}
terminodiagnostico(diagnostico_id: number){
  // Url: v1/cliente/post-termino-diagnostico
  return this.http.post<Respuesta>(`${url}cliente/post-termino-diagnostico`, {token: this.auth.Usuario.token, diagnostico_id}, {});
}
confirmaciondepago( tarea_id: number){
  // Url: /v1/cliente/post-verificar-pago
  const data = {token: this.auth.Usuario.token, tarea_id};  
  return this.http.post<Respuesta>(`${url}cliente/post-verificar-pago`, data, {});
}
validarllegada(tarea_id: number, lng: number, lat: number, folio: string){
  const data = {
    token : this.auth.Usuario.token,
    tarea_id,
    lng,
    lat,
    folio
  };
  // Url:https://dashboard.fixxiapp.com/web/v1/cliente/valida-llegada-proveedor
  return this.http.post<Respuesta>(`${url}cliente/valida-llegada-proveedor`, data, {});
}
validarllegadadiagnostico(diagnostico_id: number, lng: number, lat: number, folio: string){
  const data = {
    token : this.auth.Usuario.token,
    diagnostico_id,
    lng,
    lat,
    folio
  };
  // Url: https://dashboard.fixxiapp.com/web/v1/cliente/valida-llegada-diagnostico
  return this.http.post<Respuesta>(`${url}cliente/valida-llegada-diagnostico`, data, {});
}
eliminartarjeta(card: string){
  // Url: /v1/cliente/eliminar-tarjeta
  return this.http.post<Respuesta>(`${url}cliente/eliminar-tarjeta`, {token: this.auth.Usuario.token, card}, {});
}
cambiarprincipalcard(card: string){
  // Url: v1/cliente/cambiar-tarjeta
  return this.http.post<Respuesta>(`${url}cliente/cambiar-tarjeta`, {token: this.auth.Usuario.token, card}, {});
}
getconceptoreclamo(){
  //Url: v1/operacion/get-ticket-concepto
  return this.http.post<RestConcepto>(`${url}operacion/get-ticket-concepto`,{token: this.auth.Usuario.token},{});
}
postreclamo(id_servicio: number, etiqueta_id: number, descripcion: string,evidencia_array: string[]){
  // Url: /v1/cliente/post-new-ticket
  const data ={
    token: this.auth.Usuario.token,
    etiqueta_id,
    descripcion,
    evidencia_array,
    id_servicio,
  };
  console.log(data);
  
  return this.http.post<Respuesta>(`${url}cliente/post-new-ticket`,data,{});
}
verdetallepartner(proveedor_id: number){
  // v1/proveedor/get-perfil

  const data ={
    token : this.auth.Usuario.token,
    proveedor_id
};
  return this.http.post<RestPerfilone>(`${url}proveedor/get-perfil`,data,{});
}
getnotificaciones(){
  // v1/cliente/get-my-notificaciones
  return this.http.post<RestNoti>(`${url}cliente/get-my-notificaciones`,{token: this.auth.Usuario.token},{});
}
getMyTicket(){
  // https://dashboard.fixxiapp.com/web/v1/cliente/get-my-ticket
  return this.http.post<RESTMyTicket>(`${url}cliente/get-my-ticket`,{token: this.auth.Usuario.token},{});
}
}
