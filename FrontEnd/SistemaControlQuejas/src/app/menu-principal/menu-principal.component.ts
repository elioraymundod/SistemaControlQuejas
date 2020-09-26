import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {
  loginComponent: LoginComponent;
  userData: any[];
  constructor(private router: Router) { }

  ngOnInit(): void {
    //this.userData = this.loginComponent.userData;
    //console.log(this.userData)
  }

  puntosAtencion(){
    this.router.navigateByUrl('puntos-atencion')
  }

  usuariosPuntosAtencion() {
    this.router.navigateByUrl('usuarios-puntosde-atencion')
  }

}
