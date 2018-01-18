import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalid: boolean;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.invalid = false;
    const jwtHelper = new JwtHelper();
    const token = localStorage.getItem('token');

    if (token) {
      if (jwtHelper.decodeToken(token).role && !jwtHelper.isTokenExpired(token)) {
        this.router.navigate(['/articles']);
      }
    }


    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    this.loginService.getToken(this.username.value, this.password.value).subscribe((data: any) => {
      const token = data.token;

      if (token) {
        localStorage.setItem('token', token);
        location.reload();
      }
    }, (error: any) => {
      this.invalid = true;
      this.loginForm.reset();
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

}
