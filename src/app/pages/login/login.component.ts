import { Router } from '@angular/router';
import { CommAPIService } from 'src/app/services/comm-api.service';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormLogin } from 'src/app/Models/FormLogin'

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


  getDataOffers(value: FormLogin): void {
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

  ngOnInit(): void {
  }

  goToOffersModeAdmin(username: string): void {
    this._router.navigate(['login/offersAdmin', username])
  }

}
