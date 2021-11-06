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

  private offerForEdith: Array<string>

  constructor(
    private _router: Router,
    private _srvComApi: CommAPIService
  ) {
    this.offerForEdith = Array<string>()
  }

  loginUser(value: FormLogin): Observable<any> {
    return this._srvComApi.postUserLogin(value)
  }

  kickUser(): void {
    this._srvComApi.closeSessionUser()
  }

  //  Suscripción para crear una nueva oferta
  newOffer(value: FormNewOffer): Observable<any> {
    return this._srvComApi.insertNewOffer(value)
  }

  //  Suscripción para crear una nueva oferta
  edthiOffer(id: string, value: FormNewOffer): Observable<any> {
    return this._srvComApi.edithNewOffer(id, value)
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

  roloadView(): void {
    window.location.reload() //esto tiene que ir donde se actualizan los datos
  }

  goToOffers(): void {
    this._router.navigate(['admin/offers'])
  }

  viewFullOffer(id: string): void {
    this._router.navigate(['admin/offer', id])
  }

  gotToNewOffer(): void{
    this._router.navigate(['admin/new_offer'])
  }

  gotToNewOfferForEdith(id: string, body: Array<string>): void{
    this.offerForEdith = body
    this._router.navigate(['admin/edith_offer', id])
  }

  geTofferForEdith(): Array<string> {
    return this.offerForEdith
  }

}

