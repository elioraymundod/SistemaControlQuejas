import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './material-module';
import { PuntosDeAtencionComponent } from './puntos-de-atencion/puntos-de-atencion.component';
import { UsuariosPuntosdeAtencionComponent } from './usuarios-puntosde-atencion/usuarios-puntosde-atencion.component';
import { PuntosAtencnionService } from './Services/puntosAtencion.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuariosPuntosdeAtencionService } from './Services/UsuariosPuntosdeAtencion.service';
import { DatePipe } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthService } from './Services/auth.service';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';

@NgModule({
  declarations: [
    AppComponent,
    PuntosDeAtencionComponent,
    UsuariosPuntosdeAtencionComponent,
    LoginComponent,
    MenuPrincipalComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DemoMaterialModule,

  ],
  providers: [
    PuntosAtencnionService,
    UsuariosPuntosdeAtencionService,
    DatePipe,
    AuthService
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
