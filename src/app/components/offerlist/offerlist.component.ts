import { Component, OnInit } from '@angular/core';
import { AdminComponent } from 'src/app/pages/admin/admin.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import Swal from 'sweetalert2';

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
        alert(`Error ${error.status}: ${error.statusText}`)
      }
    )
  }

  getArrayDataOffers(): Array<any> {
    return this.arrayDataOffers
  }

  goToEdith(id: string, body: Array<string>): void{
    this._admin.gotToNewOfferForEdith(id, body)
  }

  deleteOffer(id: string): void {

    Swal.fire({
      title: '¿Estas seguro de eleminar la oferta?',
      icon:'warning',
      showCancelButton: true,
      cancelButtonColor:'#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, borrar la oferta'
    }).then(
      _comfirmed => {
        _comfirmed.isConfirmed ? this._admin.deleteSelectedOffer(id).subscribe(
          response => {
            Swal.fire({
              title: 'Oferta eliminada correctamente',
              icon: 'success',
              confirmButtonColor: '#3085d6'
            }).then(
              _exit =>{
                this.reeload()
              }
            )
          },
          _error => {
            alert(`Error al eliminar la oferta: ${_error}`)
          }
        ) : Swal.fire({
              title: 'Se cancela la eliminación',
              icon: 'info',
              confirmButtonColor: '#3085d6'
            })
      }
    )
  }

  reeload(): void {
    this._admin.roloadView()
  }

  gotToNewOffer(): void {
    this._admin.gotToNewOffer()
  }

  fullOffer(id: string): void {
    this._home.viewFullOffer(id)
  }

  fullOfferAdmin(id: string): void {
    this._admin.viewFullOffer(id)
  }

  getModeAmin(): boolean {
    return this.modeAmin;
  }

  private setModeAdmin(value: boolean): void {
    this.modeAmin = value
  }

}
