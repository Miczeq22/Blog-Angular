import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  providers: [UserService]
})
export class EditUserComponent implements OnInit {

  user: User;
  userForm: FormGroup;

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      const jwtHelper = new JwtHelper();

      if (!jwtHelper.isTokenExpired(token) && jwtHelper.decodeToken(token).role) {
        this.userService.getOneById(jwtHelper.decodeToken(token).id).subscribe((data: any) => {
          this.user = data.user;
          this.userForm = this.formBuilder.group({
            id: new FormControl(data.user.id, [Validators.required]),
            firstname: new FormControl(data.user.firstname, [Validators.required]),
            lastname: new FormControl(data.user.lastname, [Validators.required]),
          });
        });
      }
    }
  }

  submit() {
    this.userService.save(this.user).subscribe((data: any) => {
      console.log(data);
    });
  }

}
