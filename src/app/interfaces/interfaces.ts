export interface RootObject {
  code: number;
  name: string;
  data: Usuario;
  message?: string;
  type: string;
}

export interface Usuario {
  id?: number;
  token?: string;
  nombre?: string;
  apellidos?: string;
  email?: string;
  telefono?: string;
  profile_picture?: string;
}
export interface RestNewUser {
    code: number;
    name: string;
    message?: string;
    data: Usuario;
    type: string;
  }
  export interface RestCategorias {
  code: number;
  name: string;
  oficios: Categoria[];
  type: string;
}

export interface Categoria {
  id?: number;
  name?: string;
  description?: string;
  icon?: string;
  icon_white?: string;
}

export interface RestAddress {
  code?: number;
  name?: string;
  estado?: Estado;
  municipio?: Municipio;
  colonias?: Colonia[];
  type?: string;
}

export interface Colonia {
  id?: number;
  colonia?: string;
}

export interface Municipio {
  id?: number;
  municipio?: string;
}

export interface Estado {
  id?: number;
  estado?: string;
}
export interface RestMistareas {
  code: number;
  name: string;
  vigentes: Mytarea[];
  terminados: Mytarea[];
  type: string;
}

export interface Mytarea {
  id: number;
  titulo: string;
  categoria: string;
  cliente: string;
  descripcion: string;
  direccion: string;
  costo: number;
  status: number;
  status_text: string;
  fecha: number;
  icon: string;
  motivo?: string;
  comentario?: string;
  icon_white: string;
  fecha_text: string;
  fecha_text_complete: string;
  postulaciones_array:POstulaciarray[]
  propuesta_array?:PropuestaArray[];
  imagen_array: Imagenarray[];
  evidencia_proveedor_final:evi[];
  evidencia_proveedor_inicial:evi[];
  status_text_verificacion:string;
  status_verificacion: number;
  folio_array: string[];
  folio_verificacion: string;
  visible:string;
  proveedor?: Experto[];
  tipo_servicio: number;
  proveedor_id?: number;
}
export interface evi{
  evidencia: string;
}

export interface PropuestaArray {
  id: number;
  tipo: number;
  tipo_text: string;
  user: string;
  fecha: string;
  total: number;
  nota: string;
}
export interface POstulaciarray{
nota: string;
presupuesto: number;
profile_picture: string;
proveedor: string;
is_diagnostico: number;
proveedor_id: number;
valoracion: number;
categoria_list:SusCategorias[];
}
export interface Imagenarray {
  url: string;
}
export interface Respuesta{
code?: number;
message?: string;
name?: string;
type?: string;
}

export interface RestMisAddress {
  code: number;
  name: string;
  direcciones: Direccion[];
  type: string;
}

export interface Direccion {
  id: number;
  etiqueta_text: string;
  direccion: string;
  colonia: string;
  lng: string;
  lat: string;
  status: number;
  status_text: string;
  creado: string;
}
export interface SusCategorias {
  id?: number;
  name?: string;
  icon?: string;
}
export interface RestViewPro {
  code: number;
  name: string;
  expertos: Experto[];
  type: string;
}

export interface Experto {
  id?: number;
  proveedor?: string;
  proveedor_id?: number;
  profile_picture?: string;
  categoria_list?: SusCategorias[];
  valoracion?: string;
  fecha_registro:string;
}

export interface RestCard {
  code?: number;
  name?: string;
  card?: Card[];
  message?: string;
  type?: string;
}

export interface Card {
  id: string;
  nombre?: string;
  numero?: string;
  fecha_registro?: number;
  logo: string;
  tipo: string;
  etiqueta:string;
  predefinido:boolean;
}

export interface RestDiagnosticos {
  code?: number;
  name?: string;
  otros?: Listdiagnostico[];
  terminados?: Listdiagnostico[];
  rechazados?: Listdiagnostico[];
  type?: string;
}

export interface Listdiagnostico {
  id?: number;
  titulo?: string;
  categoria?: string;
  cliente?: string;
  descripcion?: string;
  direccion?: string;
  costo?: number;
  status?: number;
  status_text?: string;
  fecha?: number;
  icon?: string;
  icon_white?: string;
  fecha_text?: string;
  fecha_text_complete?: string;
  postulaciones_array?:POstulaciarray[]
  propuesta_array?:PropuestaArray[];
  imagen_array?: Imagenarray[];
  status_text_verificacion?:string;
  status_verificacion?: number;
  folio_array?: string[];
  folio_verificacion?: string;
  visible?:string;
  proveedor?: Experto[];
  proveedor_id?: number;
  comentario?: string;
  motivo?: string;
  tipo_servicio?: number;

}
export interface RestConcepto {
  code: number;
  name: string;
  concepto: Concepto[];
  type: string;
}

export interface Concepto {
  concepto_id: number;
  concepto: string;
}
export interface RestUpdate{
  code: number;
data: Datos;
message: string;
name: string;
type: string;

}
export interface Datos{
  email: string;
  id: number;
  nombre?: string;
  apellidos?: string;
  telefono: string;
  foto_perfil: string;
  token: string;
}
export interface RestPerfilone {
  code: number;
  name: string;
  data: Peril[];
  type: string;
}

export interface Peril {
  proveedor_id?:    string;
  proveedor?:       string;
  valoracion?:      string;
  fecha_registro?:  string;
  profile_picture?: string;
  servicios_realizados: number;
  categoria_list?:  Categoria[];
  comentarios?:     Comentario[];
}

export interface Comentario {
  id?:           number;
  name?:         string;
  calificacion?: number;
  comentario?:   string;
  fecha?:        string;
  icon?:         string;
  imagen_array?: Imagenarray[];
}
// Generated by https://quicktype.io

export interface RestNoti {
  code:  number;
  name:  string;
  lista: MiNotificacion[];
  type:  string;
}

export interface MiNotificacion {
  id:      number;
  id_user: number;
  tipo:    number;
  texto:   string;
  fecha:   string;
}
// Generated by https://quicktype.io

export interface RESTMyTicket {
  code:        number;
  name:        string;
  ticket_list: TicketList[];
  type:        string;
}

export interface TicketList {
  etiqueta_text: string;
  descripcion:   string;
  status_text:   string;
  fecha:         string;
  evidencia:     Imagenarray[];
  proveedor:     string;
  servicio:      string;
  descripcion_servicio:  string;
}
// Generated by https://quicktype.io

export interface RESTChat {
  code:     number;
  name:     string;
  messages: MyMessage[];
  type:     string;
}

export interface MyMessage {
  user_id: number;
  user:    string;
  mensaje: string;
  tipo:    number;
  time:    string;
}


