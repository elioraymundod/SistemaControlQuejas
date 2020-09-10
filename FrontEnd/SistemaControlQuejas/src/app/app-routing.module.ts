import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PuntosDeAtencionComponent } from './puntos-de-atencion/puntos-de-atencion.component';

const routes: Routes = [
  { path:'puntos-atencion', component: PuntosDeAtencionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
