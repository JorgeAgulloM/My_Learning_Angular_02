import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CommAPIService } from 'src/app/services/comm-api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(
    private _router: Router,
    private _srvComApi: CommAPIService
    ) { }

  //Navegar a...
  gotToAdmin(): void{
    this._router.navigate(['admin'])
  }

  //Cerrar la sesión
  CloseSession(): boolean{
    let close = this._srvComApi.closeSessionUser()
    this.gotToHome()
    return close
  }

  //Navegar a...
  gotToHome(): void{
    this._router.navigate(['home'])
  }

  //Consulta el estado de la sesión
  UserSessionStatus(): boolean{
    return this._srvComApi.getUserSessionStataus()
  }

  //Suscripción para ver todas las ofertas
  getAllOffers(): Observable<any> {

    //Comprovaciones de caja blanca
    console.log('C.Blanca: Home - Se recibe petición Get. Se llama al servicio/petición Get')

    //Se solicitan los datos de las ofertas
    return this._srvComApi.getAllOffers()
  }

  //Navegar a...
  goFullOffer(id: string): void {
    this._router.navigate(['home/offer', id])
  }

  //Solicita los datos de la oferta
  getOfferId(id: string): Observable<any> {
    return this._srvComApi.getDataOfferID(id)
  }

}
