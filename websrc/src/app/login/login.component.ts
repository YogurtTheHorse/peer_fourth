import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ApiService} from '../api/api.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ApiService]
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private api: ApiService, private router: Router) {
  }

  ngOnInit() {
    this.api.logout().subscribe(() => console.log('logged out'));
  }

  onSubmit() {
    this.api
      .login(this.loginForm.value['login'], this.loginForm.value['password'])
      .subscribe(loginInfo => {
        if (loginInfo['success']) {
          this.router.navigate(['']);
        } else {
          alert(loginInfo['message'])
        }
      });
  }
}
