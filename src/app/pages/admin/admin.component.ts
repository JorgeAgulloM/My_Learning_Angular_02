import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CommAPIService } from 'src/app/services/comm-api.service';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormLogin } from 'src/app/Models/FormLogin'
import { FormNewOffer } from 'src/app/Models/FormNewOffer';
import { HomeComponent } from '../home/home.component';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [HomeComponent]
})
export class AdminComponent implements OnInit {

  constructor(
    private _router: Router,
    private _srvComApi: CommAPIService,
    private _home: HomeComponent
  ) {}


  loginUser(value: FormLogin): Observable<any> {
    return this._srvComApi.postUserLogin(value)
  }

  //  Suscripción para crear una nueva oferta
  newOffer(value: FormNewOffer): Observable<any> {
    return this._srvComApi.insertNewOffer(value)
  }

  //  Suscripción para eliminar una oferta
  deleteSelectedOffer(id: string): Observable<any> {
    return this._srvComApi.deleteOneOffer(id)
  }

  sendTokenToServer(token: string): void {
    this._srvComApi.saveToken(token)
  }

  ngOnInit(): void {
  }

  goToOffers(): void {
    this._router.navigate(['home/offers'])
  }

  gotToNewOffer(): void{
    this._router.navigate(['login/new_offer'])
  }



}

