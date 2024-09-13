import { NgModule } from '@angular/core';
import { CanActivate,RouterModule, Routes } from '@angular/router';
import { rutas } from './rutas';

const routes: Routes = rutas;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
