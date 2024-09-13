// filter-canciones.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCanciones'
})
export class FilterCancionesPipe implements PipeTransform {
  transform(canciones: any[], filtro: string): any[] {
    if (!canciones || !filtro) {
      return canciones;
    }

    return canciones.filter(cancion => {
      const textoBusqueda = filtro.toLowerCase();
      return (
        cancion.titulo.toLowerCase().includes(textoBusqueda) ||
        cancion.autor.toLowerCase().includes(textoBusqueda)
      );
    });
  }
}
