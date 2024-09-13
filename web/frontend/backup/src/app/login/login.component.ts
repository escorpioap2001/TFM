import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginService } from '../services/login.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  usuario = { nombre: '', password: '', nocerrar: false };
  usuarioSesion = {isLoggedIn: false, username: '', userType: ''};

  constructor(public dialogRef: MatDialogRef<LoginComponent>,
    private loginservice: LoginService,
    private sessionService: SessionService) { }

  onSubmit() {
    // Este es el login que implementa la llamada al servlet
    this.loginservice.login(this.usuario.nombre, this.usuario.password).subscribe(
      (Response) => {
        console.log('Inicio de sesión exitoso: ' + Response.tipo, Response);
        this.sessionService.login(this.usuario.nombre, Response.tipo);
        this.usuarioSesion.isLoggedIn = true;
        this.usuarioSesion.username = this.usuario.nombre;
        this.usuarioSesion.userType = Response.tipo;
        this.dialogRef.close(this.usuarioSesion);
        this.usuario = { nombre: '', password: '', nocerrar: false };
      },
      (Error) => {
        console.error('Error inicio de sesión', Error);
        this.dialogRef.close();
        this.usuario = { nombre: '', password: '', nocerrar: false };
      }
    );
    
  }
}
