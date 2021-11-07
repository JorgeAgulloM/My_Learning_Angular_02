import { AgmCoreModule } from '@agm/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommAPIService } from 'src/app/services/comm-api.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css'],
  providers: [AgmCoreModule]
})
export class OfferComponent implements OnInit {

  private dataOffer: Array<any>

  lat = 51.678418;
  lng = 7.809007;

  constructor(
    private _comApiSrv: CommAPIService,
    private _router: Router,
    private _actvRouter: ActivatedRoute
    ) {
      this.dataOffer = new Array<any>()
     }

  ngOnInit(): void {
    console.log('Inicio de offer')
    this.getDataOfferID(this._actvRouter.snapshot.paramMap.get('id')!)
    console.log('offer Init' + this._actvRouter.snapshot.paramMap.get('id')!)
  }

  getDataOffer(value: number): string {
    return this.dataOffer[value]
  }

  //Suscripción
  getDataOfferID(id: string): void{
    this._comApiSrv.getDataOfferID(id).subscribe(
      response =>{
        Object.entries(response).forEach(
          ([key, value]) => this.dataOffer.push(value)
        )
      },
      error => {
        alert(`Error ${error.status}: ${error.statusText}`)
      }
    )
  }

  goToHome(): void {
    console.log(this._router.url + `/admin/offer/${this.dataOffer[0]}`)
    this._router.url == `/admin/offer/${this.dataOffer[0]}` ?
    this._router.navigate(['admin/offers']) :
    this._router.navigate(['home'])
  }

}
