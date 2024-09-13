import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { IngredientesComponent } from './ingredientes/ingredientes.component';
import { RecetasComponent } from './recetas/recetas.component';
export const rutas: Routes = [
    { path: 'inicio', component: InicioComponent },
    { path: 'ingredientes', component: IngredientesComponent},
    { path: 'recetas', component: RecetasComponent},
    { path: '', redirectTo: '/inicio', pathMatch: 'full' }
   ];