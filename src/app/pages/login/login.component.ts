import { Router } from '@angular/router';
import { CommAPIService } from 'src/app/services/comm-api.service';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormLogin } from 'src/app/Models/FormLogin'
import { FormNewOffer } from 'src/app/Models/FormNewOffer';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private _router: Router,
    private _comApiSrv: CommAPIService
  ) {}

  //  Subscripción para solicitar todas las ofertas
  postLoginUser(value: FormLogin): void {
    this._comApiSrv.postDataUserLogin(value).subscribe(
      response =>{
        this._comApiSrv.setToken(response.id_token)
        this.goToOffersModeAdmin(value.get_user())

        console.log('Asimilando el token')
        console.log(response.id_token)
      },
      error => {
        'TODO'
      }
    )
  }

  //  Suscripción para crear una nueva oferta
  setNewOffer(value: FormNewOffer): void {
    this._comApiSrv.insertNewOffer(value).subscribe(
      response => {
        console.log(response)
        this.goToOffersModeAdmin('admin')
      },
      error => {
        console.log(error)
      }
    )
  }

  ngOnInit(): void {
  }

  goToOffersModeAdmin(username: string): void {
    this._router.navigate(['login/offersAdmin', username])
  }

  gotToNewOffer(): void{
    this._router.navigate(['login/new_offer'])
  }

}
