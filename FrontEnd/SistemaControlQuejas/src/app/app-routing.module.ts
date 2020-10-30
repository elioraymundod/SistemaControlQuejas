import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IngresoQuejaPorContribuyenteComponent } from './ingreso-queja-por-contribuyente/ingreso-queja-por-contribuyente.component';
import { IngresoQuejaPorUsuarioComponent } from './ingreso-queja-por-usuario/ingreso-queja-por-usuario.component';
import { LoginComponent } from './login/login.component';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { PuntosDeAtencionComponent } from './puntos-de-atencion/puntos-de-atencion.component';
import { TiposDeQuejasComponent } from './tipos-de-quejas/tipos-de-quejas.component';
import { UsuariosPuntosdeAtencionComponent } from './usuarios-puntosde-atencion/usuarios-puntosde-atencion.component';

const routes: Routes = [
  { path: 'puntos-atencion', component: PuntosDeAtencionComponent},
  { path: 'usuarios-puntosde-atencion', component: UsuariosPuntosdeAtencionComponent},
  { path: 'login', component: LoginComponent },
  { path: 'menu-principal/:rol/:dpi', component: MenuPrincipalComponent},
  { path: 'ingreso-queja-por-usuario/:dpi', component: IngresoQuejaPorUsuarioComponent},
  { path: 'tipos-de-quejas', component: TiposDeQuejasComponent},
  { path: 'ingreso-queja-por-contribuyente/:dpi', component: IngresoQuejaPorContribuyenteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
