import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { User } from '../Models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  userData: any[] = [];

  constructor(private _formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.loginFormGroup = this._formBuilder.group({
      user: new FormControl(''),
      password: new FormControl('')
    });
   }

  ngOnInit(): void {
  }

  onLogin(data): void {
    this.authService.login(data.user, data.password).subscribe(res => {
      this.userData = res;
      if (res.length === 0) {
        Swal.fire({
          titleText: `Usuario o contraseña incorrectos`,
          icon: 'error',
          showCloseButton: true,
          showConfirmButton: false
        });
        this.loginFormGroup.reset();
      } else {
        this.router.navigate(['menu-principal/', res[0].rol]);
      }
    });
  }

}
