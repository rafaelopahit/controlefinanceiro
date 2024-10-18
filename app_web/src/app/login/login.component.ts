import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccessService } from '../services/access.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: any;
  rows: any = [];
  errologin: boolean = false;
  constructor(private service: AccessService, private router: Router) {

    this.form = new FormGroup({})
    this.form.addControl('email', new FormControl('', Validators.required));
    this.form.addControl('password', new FormControl('', Validators.required));
  }

  ngOnInit() { }


  login() {
    this.service.login(this.form.getRawValue()).subscribe((resp: any) => {


      if (resp.user) {
        localStorage.setItem("user", JSON.stringify(resp.user));
        this.router.navigate(["/dashboard"]);
      } else {
        this.errologin = true;
      }


    });
  }

}
