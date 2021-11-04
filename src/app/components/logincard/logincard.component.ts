import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormLogin } from 'src/app/Models/FormLogin';
import { AdminComponent } from 'src/app/pages/admin/admin.component';

@Component({
  selector: 'app-logincard',
  templateUrl: './logincard.component.html',
  styleUrls: ['./logincard.component.css']
})
export class LogincardComponent implements OnInit {

  private showPass: boolean

  constructor(
    private fb: FormBuilder,
    private _admin: AdminComponent
  ) {
    this.showPass = false
  }

  ValidateLogin = this.fb.group({
    username: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    password: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    rememberMe: ['']
  })

  sendLogin(): void {
    this._admin.loginUser(new FormLogin(
      this.ValidateLogin.value.username,
      this.ValidateLogin.value.password,
      this.ValidateLogin.value.rememberMe
    )).subscribe(
      response =>{
        this._admin.sendTokenToServer(response.id_token)
        this._admin.goToOffers()
      },
      error => {
        alert(`Error ${error.status}: ${error.statusText}`)
      }
    )
  }

  getShowPass(): boolean {
    return this.showPass
  }

  setShowPass(): void {
    this.showPass = !this.showPass
  }

  ngOnInit(): void {
  }

}
