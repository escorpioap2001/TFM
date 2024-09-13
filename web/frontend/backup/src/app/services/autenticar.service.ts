import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticarService {

  usuario = { nombre: '', password: '', nocerrar: false };
  usuarios: any[] = [];
  db: any;

  constructor() {
    this.abrirBD();
  }

  autenticar(usuario: any): boolean {
    //Comprobar si es correcto
    if (this.comprobarUsuario(usuario)) {
      if (usuario.nocerrar) {
        localStorage.setItem("usuario", JSON.stringify(usuario));
      }
      else {
        sessionStorage.setItem("usuario", JSON.stringify(usuario));
      }
      return true;
    }
    else {
      return false;
    }
  }

  cerrarSesion(): Observable<any> {
    localStorage.removeItem("usuario");
    sessionStorage.removeItem("usuario");
    this.usuario = { nombre: '', password: '', nocerrar: false };
    return of(this.usuario);
  }

  getLogin(): Observable<any> {
    let usuario = localStorage.getItem("usuario");
    if (usuario != null) {
      this.usuario = JSON.parse(usuario);
    }
    else {
      this.usuario = { nombre: '', password: '', nocerrar: false };
    }
    return of(this.usuario);
  }

  abrirBD() {
    //Se abre la BD
    let request = window.indexedDB.open("miBD", 1);
    let db = this;
    //En caso de error
    request.onerror = function (event) {
      console.log("Error al abrir la base de datos", event);
    }
    //En caso de éxito
    request.onsuccess = function (event) {
      console.log("Base de datos abierta correctamente");
      db.db = request.result;
      console.log(db.db);
      db.obtenerUsuarios().subscribe(usuarios => db.usuarios = usuarios);
    }

    request.onupgradeneeded = function (event) {
      console.log("Creando base de datos");
      //Crear almacén usuarios
      let db = request.result;
      if (request != null) {
        if (!db.objectStoreNames.contains('usuarios')) {
          let objectStore = db.createObjectStore("usuarios", { keyPath: "nombre" });
          //Definimos un campo o índice para guardar el login y el password
          objectStore.transaction.oncomplete = function (event) {
            console.log("almacén creado correctamente");
            //Aquí el almacén "usuarios" ya ha esta creado y listo para ser usado
            //Introducimos usuario predefinidos
            let transaccion = db.transaction("usuarios", "readwrite").objectStore("usuarios");
            let req = transaccion.add({ nombre: "Cliente", password: "12345" });
            req.onsuccess = function (event) {
              console.log("Exito");
            };
            req = transaccion.add({ nombre: "DJ", password: "12345" });
            req.onsuccess = function (event) {
              console.log("Exito");
            };
            req = transaccion.add({ nombre: "Admin", password: "12345" });
            req.onsuccess = function (event) {
              console.log("Exito");
            };
          }
        }
      }
    }
  }

  obtenerUsuarios(): Observable<any[]> {
    let usuarios: any = [];
    let self = this;
    //Obtenemos una referencia del Almacén usuarios
    //Se usa “readonly” dado que lo que buscamos es solo leer el contenido del mismo
    let itemObjectStore = self.db.transaction("usuarios", "readonly").objectStore("usuarios");
    //Con la referencia del almacén se abre un cursor para iterar sobre cada uno de los objetos usuario
    //que contiene el almacén y se agrega al array de elementos
    let request = itemObjectStore.openCursor();
    request.onsuccess = function () {
      let cursor = request.result;
      while (cursor) {
        usuarios.push(cursor.value);
        cursor.continue();
      } /*else {
        //Aquí ya se ha acabado la iteración
        ;
      }*/
    };
    return of(usuarios);
  }

  comprobarUsuario(login: any): boolean {
    let encontrado = this.usuarios.find(usuario => ((usuario.nombre == login.nombre) && (usuario.password == login.password)));
    if (encontrado) {
      return true;
    }
    else {
      return false;
    }
  }
}
