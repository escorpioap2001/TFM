import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { discoURL } from '../compartido/baseurl';
import { HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ProcesaHTTPMsjService } from './procesa-httpmsj.service';
import { Ingrediente } from '../compartido/ingrediente';
import { Receta } from '../compartido/receta';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PeticionClienteService {

  constructor(private http: HttpClient,
    private procesaHttpmsjService: ProcesaHTTPMsjService) { }

  getIngredientes():Observable<Ingrediente[]>{
    return this.http.get<Ingrediente[]>(discoURL + '/ingredientes.html', httpOptions).
    pipe(catchError(this.procesaHttpmsjService.gestionError));
  }

  addIngrediente(name: string, type: string): Observable<any> {
    const body = {nombre: name, tipo: type};
    return this.http.post(discoURL + 'ingredientes.html', body, httpOptions).
    pipe(catchError(this.procesaHttpmsjService.gestionError));
  }

  deleteIngrediente(id: number): Observable<any> {
    const url = `${discoURL}ingredientes.html?id=${id}`;
    return this.http.delete(url);
  }

  getRecetas():Observable<Receta[]>{
    return this.http.get<Receta[]>(discoURL + 'recetas.html', httpOptions).
    pipe(catchError(this.procesaHttpmsjService.gestionError));
  }

  deleteReceta(id: string): Observable<any> {
    const url = `${discoURL}recetas.html?id=${id}`;
    return this.http.delete(url);
  }
}
