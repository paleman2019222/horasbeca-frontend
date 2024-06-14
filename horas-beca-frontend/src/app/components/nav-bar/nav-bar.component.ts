import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { RestUserService } from '../../services/rest-user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public user: any = null;

  constructor(
    private cookieService: CookieService,
    private router: Router, 
    private restUser: RestUserService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.user = this.restUser.getUser();
    this.cd.detectChanges();
  }

  logOut(): void {
    // Eliminar las cookies
    this.cookieService.delete('token', '/');
    this.cookieService.delete('user', '/');
    this.cookieService.delete('role', '/');
    window.location.href = '/login';
  }
}
