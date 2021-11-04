import { Component, OnInit } from '@angular/core';
import { AdminComponent } from 'src/app/pages/admin/admin.component';
import { HomeComponent } from 'src/app/pages/home/home.component';

@Component({
  selector: 'app-offerslist',
  templateUrl: './offerlist.component.html',
  styleUrls: ['./offerlist.component.css']
})
export class OfferListComponent implements OnInit {

  private arrayDataOffers: Array<any>
  private modeAmin: boolean

  constructor(
    private _home: HomeComponent,
    private _admin: AdminComponent
    ) {
    this.arrayDataOffers = new Array<any>()
    this.modeAmin = false
  }

  ngOnInit(): void {
    this.setArrayDataOffers()
    this.setModeAdmin(this._home.UserSessionStatus())
  }

  setArrayDataOffers(): void {
    this._home.getAllOffers().subscribe(
      respose => {
        this.arrayDataOffers = respose
      },
      error => {
        alert(JSON.stringify(error))
      }
    )
  }

  getArrayDataOffers(): Array<any> {
    return this.arrayDataOffers
  }

  fullOffer(id: string): void {
    this._home.viewFullOffer(id)
  }

  deleteOffer(id: string): void {
    this._admin.deleteSelectedOffer(id).subscribe(
      response => {
        this._home.gotToHome()
      },
      error => {
        alert(JSON.stringify(error))

      }
    )
  }

  gotToNewOffer(): void {
    this._admin.gotToNewOffer()
  }

  getModeAmin(): boolean {
    return this.modeAmin;
  }

  private setModeAdmin(value: boolean): void {
    this.modeAmin = value
  }

}
