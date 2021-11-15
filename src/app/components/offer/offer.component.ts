import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeComponent } from 'src/app/pages/home/home.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {

  private dataOffer: Array<any>

  constructor(
    private _home: HomeComponent,
    private _router: Router,
    private _actvRouter: ActivatedRoute

    ) {
      this.dataOffer = new Array<any>()
     }

  ngOnInit(): void {
    //Se llama a la carga de los datos de la oferta selecionada
    this.getDataOfferID(this._actvRouter.snapshot.paramMap.get('id')!)
  }

  //Se devuelven los datos de la oferta
  getDataOffer(value: number): string {
    return this.dataOffer[value]
  }

  //Se cargan los datos de la oferta
  getDataOfferID(id: string): void{
    this._home.getOfferId(id).subscribe(
      response =>{
        //Si la respuesta el correcta, se cargan los datos del diccionario en el array local
        Object.entries(response).forEach(
          ([key, value]) => this.dataOffer.push(value)
        )
      },
      error => {
        //En caso de error se muestra una alerta al usuario.
        Swal.fire({
          icon: 'error',
          title: `Oops... Error ${error.status}`,
          text: 'Error en la carga de datos, no se ha podido cargar la oferta.'
        })
      }
    )
  }

  //Volver a Home o admin
  goToHome(): void {
    console.log(this._router.url + `/admin/offer/${this.dataOffer[0]}`)
    this._router.url == `/admin/offer/${this.dataOffer[0]}` ?
    this._router.navigate(['admin/offers']) :
    this._router.navigate(['home'])
  }

}
