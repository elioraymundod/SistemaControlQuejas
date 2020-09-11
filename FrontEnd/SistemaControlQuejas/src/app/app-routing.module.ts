import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PuntosDeAtencionComponent } from './puntos-de-atencion/puntos-de-atencion.component';
import { UsuariosPuntosdeAtencionComponent } from './usuarios-puntosde-atencion/usuarios-puntosde-atencion.component';

const routes: Routes = [
  { path:'puntos-atencion', component: PuntosDeAtencionComponent},
  { path:'usuarios-puntosde-atencion', component:UsuariosPuntosdeAtencionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
