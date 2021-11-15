import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CommAPIService } from 'src/app/services/comm-api.service';
import { Component, Injectable } from '@angular/core';
import { FormLogin } from 'src/app/Models/FormLogin'
import { FormNewOffer } from 'src/app/Models/FormNewOffer';
import { HomeComponent } from '../home/home.component';
import { ApiImagesService } from 'src/app/services/api-images.service';
import { LoginService } from 'src/app/services/login.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [HomeComponent]
})
export class AdminComponent {

  private offerForEdith: Array<string>

  constructor(
    private _router: Router,
    private _srvComApi: CommAPIService,
    private _srvImages: ApiImagesService,
    private _loginSrv: LoginService
  ) {
    this.offerForEdith = Array<string>()
  }

  //Obtine la una de las imagenes del API de imagenes
  getImageRandom(): string {
    let hour: number = new Date().getMinutes()
    return this._srvImages.getRandomImage(Math.trunc(hour/3))
  }

  //  Se solicita al servicio el login de usuario
  loginUser(data: FormLogin): Observable<FormLogin> {
    console.log('admin, login: ', data)
    return this._loginSrv.performLogin(data)
  }

  //  Se solicita el logout de usuario
  kickUser(): void {
    this._loginSrv.prformLogout()
  }

  //  Suscripción para crear una nueva oferta
  newOffer(value: FormNewOffer): Observable<any> {
    console.log('C.Blanca: Admin - Se recive petición de nueva oferta, se solicita y se pasan los datos a service.')
    return this._srvComApi.insertNewOffer(value)
  }

  //  Suscripción para editar una nueva oferta
  edthiOffer(value: FormNewOffer): Observable<any> {
    return this._srvComApi.edithNewOffer(value)
  }

  //  Suscripción para eliminar una oferta
  deleteSelectedOffer(id: string): Observable<any> {
    return this._srvComApi.deleteOneOffer(id)
  }

  //Recarga la vista, al hacerlo se recargan los datos.
  roloadView(): void {
    window.location.reload()
  }

  //Navegar a...
  goToOffers(): void {
    this._router.navigate(['admin/offers'])
  }

  //Navegar a...
  viewFullOffer(id: string): void {
    this._router.navigate(['admin/offer', id])
  }

  //Navegar a...
  gotToNewOffer(): void{
    this._router.navigate(['admin/new_offer'])
  }

  //Navegar a nueva oderta, pero en modo edición
  gotToNewOfferForEdith(id: string, body: Array<string>): void{

    //Comprovaciones de caja blanca
    console.log('C.Blanca: admin - desde offers solicita el acceso a new_offer')

    //Se cargan los datos de la oferta a editar en el array
    this.offerForEdith = body

    //Comprovaciones de caja blanca
    console.log('C.Blanca: admin - se cargan los datos recibidos por parametro')

    //Se navega a nueva oderta en modo edición
    this._router.navigate(['admin/edith_offer', id])
  }

  //Se devuelven los datos del array
  geTofferForEdith(): Array<string> {
    return this.offerForEdith
  }

}

