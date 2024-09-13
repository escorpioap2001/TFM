import { Component, OnInit, Inject } from '@angular/core';
import { faAddressCard,faBell,faTicket ,faHome, faInfo, faList, faSignInAlt, faShoppingCart , faRegistered, faRecordVinyl, faEnvelope, faCarrot, faUtensilSpoon} from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { HostListener } from '@angular/core';
import { AutenticarService } from '../services/autenticar.service';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent {
  faHome = faHome;
  faList = faList;
  faTicket = faTicket;
  faCarrot = faCarrot;
  faUtensilSpoon = faUtensilSpoon;
  faSignInAlt = faSignInAlt;
  faRegistered = faRegistered;
  faRecordVinyl = faRecordVinyl;
  faEnvelope = faEnvelope;
  sesionLogin = {isLoggedIn: false, username: '', userType: ''};

  constructor(public dialogo: MatDialog,
    private router: Router,
    @Inject('baseURL') public BaseURL: string,
    private sesion: SessionService) {
      this.sesion.getSessionData()?.subscribe(login => this.sesionLogin = login);
  }

  abrirFormularioLogin() {
    let dialogo = this.dialogo.open(LoginComponent, { width: '450px', height: '500px' });
    //console.log(this.sesionLogin);
    dialogo.afterClosed().subscribe(login => this.sesionLogin = login);
  }

  cerrarSesion() {
    this.sesion.logout();
    this.sesionLogin = {isLoggedIn: false, username: '', userType: ''};
    this.router.navigate(['/inicio']);
    return false;
  }
}
