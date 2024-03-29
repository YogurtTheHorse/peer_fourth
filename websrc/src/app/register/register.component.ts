import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ApiService} from '../api/api.service';
import {Router} from "@angular/router";

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

  constructor(private api: ApiService, private router: Router) {
  }

  ngOnInit() {
    this.api.logout().subscribe(() => console.log('logged out'));
  }

  onSubmit() {
    this.api
      .register(this.registerForm.value['login'], this.registerForm.value['password'])
      .subscribe(loginInfo => {
        if (loginInfo['success']) {
          this.router.navigate(['login']);
        } else {
          alert(loginInfo['message'])
        }
      });
  }
}
