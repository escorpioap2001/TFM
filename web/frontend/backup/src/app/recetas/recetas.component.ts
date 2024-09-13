import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { PeticionClienteService } from '../services/peticion-cliente.service';
import { Receta } from '../compartido/receta';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrl: './recetas.component.css'
})
export class RecetasComponent {

  nombre!: string;
  tipoSeleccionado!: string;
  sesionLogin = { isLoggedIn: false, username: '', userType: '' };
  vReceta: Receta[] = [];
  selectedReceta: Receta | null = null;

  constructor(
    @Inject('baseURL') public BaseURL: string,
    private snackBar: MatSnackBar,
    private sesion: SessionService,
    private router: Router,
    private clienteService: PeticionClienteService
  ) {
    this.nombre = '';
    this.tipoSeleccionado = '';
  }

  ngOnInit() {
    this.sesion
      .getSessionData()
      ?.subscribe((login) => (this.sesionLogin = login));
    if (this.sesionLogin.userType != 'admin') {
      // Redireccionar a la otra ruta
      this.router.navigate(['/inicio']);
    }

    this.clienteService.getRecetas().subscribe({
      next: (data) => {
        this.vReceta = data;
        console.log(this.vReceta);
      },
      error: (Error) => console.error('Error al obtener recetas', Error),
    });
  }

  toggleDetails(receta: Receta) {
    if (this.selectedReceta == receta) {
      this.selectedReceta = null;
    } else {
      this.selectedReceta = receta;
    }

    console.log(this.selectedReceta);
  }

  formatTime(timeString: string): string {
    const [hours, minutes] = timeString.split(':');
    let formattedTime = '';
  
    if (parseInt(hours) > 0) {
      formattedTime += `${hours} hora`;
      if (parseInt(hours) > 1) {
        formattedTime += 's';
      }
      formattedTime += ' y ';
    }
  
    formattedTime += `${minutes} minuto`;
    if (parseInt(minutes) > 1) {
      formattedTime += 's';
    }
  
    return formattedTime;
  }

  eliminarReceta(receta: Receta) {
    this.clienteService.deleteReceta(receta.id).subscribe(
      (Response) => {
          this.mostrarNotificacion(
            '¡ Receta -' + receta.name + '- borrado con exito !'
          );
          const indice = this.vReceta.indexOf(receta);
          if (indice != -1) {
            this.vReceta.splice(indice, 1);
          }
        },
        (Error) => {
          console.error('La receta no ha sido eliminada correctamente', Error);
        }
      );
    }

    mostrarNotificacion(mensaje: string): void {
      this.snackBar.open(mensaje, 'Cerrar', {
        duration: 1000,
        verticalPosition: 'top',
        horizontalPosition: 'end',
      });
    }
}
