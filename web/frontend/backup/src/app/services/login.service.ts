import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { discoURL } from '../compartido/baseurl';
import { HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ProcesaHTTPMsjService } from './procesa-httpmsj.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
    private procesaHttpmsjService: ProcesaHTTPMsjService) { }

  login(username: string, password: string): Observable<any> {
    const body = {username: username, password: password};
    return this.http.post(discoURL + 'login.html', body, httpOptions).
    pipe(catchError(this.procesaHttpmsjService.gestionError));
  }
}
