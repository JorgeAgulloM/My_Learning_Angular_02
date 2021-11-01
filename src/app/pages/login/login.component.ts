import { CommAPIService } from 'src/app/services/comm-api.service';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormLogin } from 'src/app/Models/FormLogin'//'ofertasEmpleo/src/app/Models/FormLogin.ts'

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private pruebaToken: any

  constructor(
    private fb: FormBuilder,
    private _comApiSrv: CommAPIService
  ) {

  }

  ValidateLogin = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    rememberMe: ['']
  })

  sendLogin(): void {
    let value: FormLogin = new FormLogin(
      this.ValidateLogin.value.username,
      this.ValidateLogin.value.password,
      this.ValidateLogin.value.rememberMe
    )


    //Suscripciçón

      this.getDataOffers(value)


    //this._comApiSrv.addHero(value)
    //this._comApiSrv.postData(value)
  }


  getDataOffers(value: FormLogin): void {
    this._comApiSrv.postDataUserLogin(value).subscribe(
      Response =>{
        this.pruebaToken = JSON.stringify(Response)
        console.log('Asimilando el token')
        console.log(this.pruebaToken)
      },
      error => {
        this.pruebaToken = error
      }
    )

  }

  ngOnInit(): void {
  }

}
