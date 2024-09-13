import { Component, Inject } from '@angular/core';
import { Ingrediente } from '../compartido/ingrediente';
import { INGREDIENTES } from '../compartido/ingredientes';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { PeticionClienteService } from '../services/peticion-cliente.service';

@Component({
  selector: 'app-ingredientes',
  templateUrl: './ingredientes.component.html',
  styleUrls: ['./ingredientes.component.css'],
})
export class IngredientesComponent {
  vIngredientes: Ingrediente[] = [];
  tipos: string[] = [
    'Granos y cereales',
    'Vegetales',
    'Frutas',
    'Carnes',
    'Pescados y mariscos',
    'Productos lácteos',
    'Legumbres y frijoles',
    'Aceites y grasas',
    'Hierbas y especias',
    'Salsas y condimentos',
    'Endulzantes',
    'Frutos secos y semillas',
  ];
  nombre!: string;
  tipoSeleccionado!: string;
  sesionLogin = { isLoggedIn: false, username: '', userType: '' };
  ultimoId!: number;

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
    this.clienteService.getIngredientes().subscribe({
      next: (data) => {
        this.vIngredientes = data;
        if (data.length != 0) {
          this.ultimoId = data[data.length-1].id;
        }
      },
      error: (Error) => console.error('Error al obtener ingredientes', Error),
    });
  }

  obtenerIngredientesPorTipo(tipo: string): Ingrediente[] {
    return this.vIngredientes.filter(
      (ingrediente) => ingrediente.tipo === tipo
    );
  }

  agregarIngrediente() {
    const nuevoIngrediente: Ingrediente = {
      id: this.ultimoId + 1,
      nombre: this.nombre,
      tipo: this.tipoSeleccionado,
    } as Ingrediente;

    this.clienteService
      .addIngrediente(nuevoIngrediente.nombre, nuevoIngrediente.tipo)
      .subscribe(
        (Response) => {
          this.mostrarNotificacion(
            '¡' + nuevoIngrediente.nombre + ' guardado con exito !'
          );
          this.vIngredientes.push(nuevoIngrediente);
          this.nombre = '';
          this.tipoSeleccionado = '';
          this.ultimoId++;
        },
        (Error) => {
          console.error('Ingrediente introducido incorrectamente', Error);
        }
      );
  }

  eliminarIngrediente(ingrediente: Ingrediente) {
    this.clienteService.deleteIngrediente(ingrediente.id).subscribe(
      (Response) => {
        this.mostrarNotificacion(
          '¡' + ingrediente.nombre + ' borrado con exito !'
        );
        const indice = this.vIngredientes.indexOf(ingrediente);
        if (indice != -1) {
          this.vIngredientes.splice(indice, 1);
        }
      },
      (Error) => {
        console.error('Ingrediente introducido incorrectamente', Error);
      }
    );
  }

  formularioValido(): boolean {
    // Comprueba si nombre y tipo están rellenados completamente y no son nulos ni vacíos
    return !!(
      this.nombre &&
      this.nombre.trim() !== '' &&
      this.tipoSeleccionado &&
      this.tipoSeleccionado.trim() !== ''
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
