import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Config} from '../config';
import {ApiService} from '../api/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ApiService]
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private api: ApiService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.api
      .reister(this.registerForm.value['login'], this.registerForm.value['password'])
      .subscribe(console.log);
  }
}
