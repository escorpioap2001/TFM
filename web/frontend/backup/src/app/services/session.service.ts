import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class SessionService {

  private readonly SESSION_KEY = 'myAppSession';
  private username = '';

  constructor() { }

  login(username: string, userType: string): void {
    const sessionData = { isLoggedIn: true, username, userType };
    const sessionKey = this.generateSessionKey(username);
    this.username = username;
    sessionStorage.setItem(sessionKey, JSON.stringify(sessionData));
  }

  // Cierra sesión y elimina la información de sessionStorage
  logout(): void {
    const sessionKey = this.generateSessionKey(this.username);
    sessionStorage.removeItem(sessionKey);
  }

  // Obtiene la información de sesión almacenada en sessionStorage
  getSessionData(): Observable<{ isLoggedIn: boolean; username: string; userType: string }> | null {
    const sessionKey = this.generateSessionKey(this.username);
    const sessionDataString = sessionStorage.getItem(sessionKey);
    if (sessionDataString) {
      const sessionData = JSON.parse(sessionDataString);
      return of(sessionData); 
    } else {
      return null;
    }
  }

  private generateSessionKey(username: string): string {
    return `myAppSession_${username}`;
  }
}
