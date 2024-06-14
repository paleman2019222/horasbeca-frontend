import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { RestUserService } from '../../services/rest-user.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Asegúrate de que el nombre sea "styleUrls"
})
export class LoginComponent implements OnInit {
  public user: User;
  public token: string = "";
  public message = "";
  public errorMessage: string | null = null;
  formSubmitted: boolean = false;

  constructor(
    private restUser: RestUserService,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.user = new User('', '', '', '', '', '', '');
  }

  ngOnInit(): void {}

  onSubmit(loginForm: any): void {
    if (!this.isEmailValid(this.user.email)) {
      Swal.fire({
        title: 'Error',
        text: 'El correo contiene caracteres no permitidos.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      this.formSubmitted = false;
      return;
    }

    this.formSubmitted = true;

    this.restUser.login(this.user, true).subscribe(
      (res: any) => {
        this.message = res.message;
        if (!res.token) {
          alert(this.message);
          this.formSubmitted = false;
        } else {
          delete res.user.password;
          const token = res.token;
          if (token.length <= 0) {
            alert('El token no se generó correctamente');
            this.formSubmitted = false;
          } else {
            if (loginForm.valid) {
              this.formSubmitted = true;
            }
          }

          this.cookieService.set('token', token, 1, '/');
          this.cookieService.set('user', JSON.stringify(res.user), 1, '/');
          this.cookieService.set('role', JSON.stringify(res.user.role), 1, '/');
          setTimeout(() => {
            window.location.href = '/home';
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Sesión iniciada correctamente",
              showConfirmButton: false,
              timer: 1500
            });
          }, 2300);
        }
      },
      (error) => {
        Swal.fire({
          title: 'Error',
          text: error.error.message,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        this.formSubmitted = false; // Rehabilita el botón si hay un error
      }
    );
  }

  private isEmailValid(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  }
}

