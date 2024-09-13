import { Component, Inject } from '@angular/core';
import {
  faHome, faInfo, faList, faAddressCard,
  faPhone, faFax, faEnvelope, faTicket
} from '@fortawesome/free-solid-svg-icons';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent {
  faHome = faHome;
  faInfo = faInfo;
  faList = faList;
  faAddressCard = faAddressCard;
  faPhone = faPhone;
  faFax = faFax;
  faTicket = faTicket;
  faEnvelope = faEnvelope;
  sesionLogin = {isLoggedIn: false, username: '', userType: ''};

  constructor(
    private router: Router,
    @Inject('baseURL') public BaseURL: string,
    private sesion: SessionService) {
      this.sesion.getSessionData()?.subscribe(login => this.sesionLogin = login);
  }
}
