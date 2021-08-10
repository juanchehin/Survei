import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
declare var swal:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  date = new Date();
  private anioactual: string;
  loginForm: FormGroup;
  constructor(
    private _router: Router,
    private authService: AuthService,
  ) {
    this.anioactual = String(this.date).substr(8, 2);
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      usuario: new FormControl('', [Validators.required,]),
      password: new FormControl('', Validators.required)
    });
  }
  onSubmit( valor) {
    if (this.loginForm.valid) {
      this.authService.attemptAuth(valor.usuario, valor.password)
        .subscribe(
          data => {
            localStorage.setItem('hoy', this.anioactual);
            localStorage.setItem('personal', JSON.stringify(data.persona));
            localStorage.setItem('usertoken', data.accessToken);
            localStorage.setItem('autorization', data.authorities[0].authority);
            this._router.navigate(['/AAC/Incidencia/Bienvenido'])
          },
          error => {
            swal("Mal!", "Credenciale incorrectos!", "warning")
          }
        );



      // this.onReserForm();

      // this._router.navigate(['/AAC/Incidencia/Bienvenido'])
    }
    else {
      console.error('no valido');

    }

  }
  onReserForm() {
    this.loginForm.reset();
  }
  get usuario() {
    return this.loginForm.get('usuario');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
