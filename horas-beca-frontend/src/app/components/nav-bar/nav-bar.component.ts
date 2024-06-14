import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { RestUserService } from '../../services/rest-user.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {


    constructor(
      private cookieService: CookieService,
      private router: Router, 
      private restUser: RestUserService
    ){}
    
    logOut(): void {
      // Eliminar las cookies
      this.cookieService.delete('token', '/');
      this.cookieService.delete('user', '/');
      this.cookieService.delete('role', '/');
      window.location.href = '/login';
    }

  }
