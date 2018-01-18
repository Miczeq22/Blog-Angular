import { Component, OnInit } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logged: boolean;
  isAdmin: boolean;

  constructor() { }

  ngOnInit() {
    this.isAdmin = false;
    this.logged = false;
    const jwtHelper = new JwtHelper();
    const token = localStorage.getItem('token');

    if (token) {
      if (jwtHelper.decodeToken(token).role && !jwtHelper.isTokenExpired(token)) {
        this.logged = true;
        if (jwtHelper.decodeToken(token).role === 'ROLE_ADMIN') {
          this.isAdmin = true;
        }
      }
    }
  }

  logout() {
    localStorage.removeItem('token');
    location.reload();
  }

}
