import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormLogin } from 'src/app/Models/FormLogin';
import { LoginComponent } from 'src/app/pages/login/login.component';

@Component({
  selector: 'app-logincard',
  templateUrl: './logincard.component.html',
  styleUrls: ['./logincard.component.css']
})
export class LogincardComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private _loginComp: LoginComponent
  ) {}

  ValidateLogin = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    rememberMe: ['']
  })

  sendLogin(): void {
    this._loginComp.postLoginUser(new FormLogin(
      this.ValidateLogin.value.username,
      this.ValidateLogin.value.password,
      this.ValidateLogin.value.rememberMe
    ))
  }

  ngOnInit(): void {
  }

}
