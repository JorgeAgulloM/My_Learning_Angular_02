import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommAPIService } from 'src/app/services/comm-api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private _router: Router,
    private _srvComApi: CommAPIService
    ) { }

  ngOnInit(): void {
  }

  gotToAdmin(): void{
    this._router.navigate(['admin'])
  }

  CloseSession(): boolean{
    this.gotToHome()
    return this._srvComApi.closeSessionUser()
  }

  gotToHome(): void{
    this._router.navigate(['home'])
  }

  UserSessionStatus(): boolean{
    return this._srvComApi.getUserSessionStataus()
  }

  //Suscripción para ver todas las ofertas
  getAllOffers(): Observable<any> {
    console.log('C.Blanca: Home - Se recibe petición Get. Se llama al servicio/petición Get')
    return this._srvComApi.getAllOffers()
  }

  viewFullOffer(id: string): void {
    this._router.navigate(['home/offer', id])
  }


}
