import { Component,OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {

  errorMensaje: string = "";

  constructor(
    @Inject('baseURL') public BaseURL:string) { }

  ngOnInit() {
  }


}
