import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { PuntosDeAtencionComponent } from './puntos-de-atencion/puntos-de-atencion.component';
import { UsuariosPuntosdeAtencionComponent } from './usuarios-puntosde-atencion/usuarios-puntosde-atencion.component';

const routes: Routes = [
  { path:'puntos-atencion', component: PuntosDeAtencionComponent},
  { path:'usuarios-puntosde-atencion', component:UsuariosPuntosdeAtencionComponent},
  { path:'login', component:LoginComponent },
  { path: 'menu-principal', component: MenuPrincipalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
