import { Pipe, PipeTransform } from '@angular/core';
import { Categoria } from '../interfaces/interfaces';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(proveedores: Categoria[], nombre: string): any[] {
    if(nombre ==''){
      return proveedores;
    }
    nombre = nombre.toLowerCase();
    return proveedores.filter(item =>{
      return item.name.toLowerCase().includes(nombre);
    });
  }

}
