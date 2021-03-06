import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {
  loginComponent: LoginComponent;
  userData: any[];
  rol: string;
  dpi: string;
  mostrarPuntosDeAtencion: boolean;
  mostrarUsuariosPuntosDeAtencion: boolean;
  mostrarCatalogoTiposQuejas: boolean;
  mostrarIngresoQueja: boolean;
  mostrarContactoQuejasDenuncias: boolean;
  mostrarQuejasIngresadas: boolean;
  mostrarQuejasEnProceso: boolean;
  mostrarSeguimientoQuejas: boolean;


  constructor(private router: Router,  private activatedRoute: ActivatedRoute) {
    this.mostrarPuntosDeAtencion = false;
    this.mostrarUsuariosPuntosDeAtencion = false;
    this.mostrarCatalogoTiposQuejas = false;
    this.mostrarIngresoQueja = false;
    this.mostrarContactoQuejasDenuncias = false;
    this.mostrarQuejasIngresadas = false;
    this.mostrarQuejasEnProceso = false;
    this.mostrarSeguimientoQuejas = false;
   }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(async res => {
      if (res.has('rol')) {
        this.rol = res.get('rol');
        }
      if (res.has('dpi')){
        this.dpi = res.get('dpi');
      }

    });
    if (this.rol === '30') {
      this.mostrarPuntosDeAtencion = true;
      this.mostrarUsuariosPuntosDeAtencion = true;
      this.mostrarCatalogoTiposQuejas = true;
    } else if (this.rol === '33') {
      this.mostrarIngresoQueja = true;
    } else if (this.rol === '31') {
      this.mostrarContactoQuejasDenuncias = true;
    }
  }

  puntosAtencion(): void{
    this.router.navigate(['puntos-atencion', this.rol, this.dpi]);
  }

  usuariosPuntosAtencion(): void {
    this.router.navigate(['usuarios-puntosde-atencion', this.rol, this.dpi]);
  }

  ingresoQueja(): void {
    this.router.navigate(['ingreso-queja-por-usuario/', this.rol, this.dpi]);
  }

  tiposQuejas(): void {
    this.router.navigate(['tipos-de-quejas', this.rol, this.dpi]);
  }

  ingresoQuejaContribuyente(): void {
    this.router.navigate(['ingreso-queja-por-contribuyente/', this.rol, this.dpi]);
  }

  cerrarSesion(): void {
    this.router.navigate(['login']);
  }
}
