import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url = 'http://localhost:4000';
  private socket;

  constructor() {
    this.socket = io(this.url);
  }

  public sendMensaje(mensaje: string) {
    console.log(mensaje);
    this.socket.emit('nuevo_mensaje', mensaje);
  }

  public getMensajes = () => {
    return new Observable<string>((observer) => {
      this.socket.on('nuevo_mensaje', (mensaje) => {
        observer.next(mensaje);
      });
    });
  }
}
