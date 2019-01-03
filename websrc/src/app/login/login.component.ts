import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Config} from '../config';
import {ApiService} from '../api/api.service';

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

  constructor(private api: ApiService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.api
      .login(this.loginForm.value['login'], this.loginForm.value['password'])
      .subscribe(console.log);
  }
}
