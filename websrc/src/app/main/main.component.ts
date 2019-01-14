import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {ApiService} from "../api/api.service";
import {Hit} from "../models/hit";
import {User} from "../models/user";
import {CanvasComponent} from "../canvas/canvas.component";
import {FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [ApiService]
})
export class MainComponent implements OnInit, AfterViewInit {
  currentUser: User;
  submitted = false;
  radius = 1;
  isClicked = false;
  hits: Hit[] = [];
  isRadiuseSet = true;

  @ViewChild(CanvasComponent) canv;

  form: FormGroup;

  private tempRadius: number;
  private tempX: number;
  private tempY: number;

  validX = [
    {id: -4, name: '-4'},
    {id: -3, name: '-3'},
    {id: -2, name: '-2'},
    {id: -1, name: '-1'},
    {id: 0, name: '0'},
    {id: 1, name: '1'},
    {id: 2, name: '2'},
    {id: 3, name: '3'},
    {id: 4, name: '4'}
  ];
  validR = [
    {id: 1, name: '1'},
    {id: 2, name: '2'},
    {id: 3, name: '3'},
    {id: 4, name: '4'}
  ];

  constructor(private formBuilder: FormBuilder, private api: ApiService, private router: Router) {
    this.currentUser = new User();
    this.currentUser.username = api.getLogin();

    const controls = this.validX.map(c => new FormControl(false));
    const controls1 = this.validR.map(c => new FormControl(false));
    controls[0].setValue(true);
    controls1[0].setValue(true);
    this.form = this.formBuilder.group({
      validX: new FormControl('-4', Validators.required),
      validY: new FormControl('1', Validators.compose([
        Validators.required,
        Validators.max(3),
        Validators.min(-5)
      ])),
      validR: new FormControl('1', Validators.required),
    });
  }

  ngOnInit() {
    this.loadAllHits();

    window.onresize = (function (event) {
      this.canv.updateChart(this.radius, this.hits);
    }).bind(this);
  }

  private RadiusChange() {
    this.radius = parseInt(this.form.value.validR, 10);
    this.canv.updateChart(this.radius, this.hits);
    this.isRadiuseSet = true;
  }

  ngAfterViewInit() {
    this.canv.updateChart(1, null);
  }

  submit() {
    this.submitted = true;

    if (this.form.invalid) {
      if (this.isRadiuseSet === false) {
        alert('Radius is not set!');
      }
      return;
    }

    console.log(this.form.value);

    this.tempX = parseInt(this.form.value.validX, 10);
    this.tempY = parseInt(this.form.value.validY, 10);
    this.tempRadius = parseInt(this.form.value.validR, 10);

    if (this.canv.isClicked === true) {
      this.tempX = this.canv.x;
      this.tempY = this.canv.y;
      this.isClicked = false;
      this.canv.isClicked = false;
    }
    this.api.hit(this.tempX, this.tempY, this.tempRadius)
      .subscribe(
        data => {
          this.loadAllHits();
          this.submitted = false;
        },
        error => {
          this.router.navigate(['/login']);
        }
      );
  }

  private loadAllHits() {
    this.api.getHits().subscribe(hits => {
      this.hits = hits['dots'];
      if (this.hits !== null) {
        this.canv.updateChart(this.radius, this.hits);
      }
    });
  }

  private minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
      // get a list of checkbox values (boolean)
        .map(control => control.value)
        // total up the number of checked checkboxes
        .reduce((prev, next) => next ? prev + next : prev, 0);

      // if the total is not greater than the minimum, return the error message
      return totalSelected === min ? null : {required: true};
    };

    return validator;
  }
}
