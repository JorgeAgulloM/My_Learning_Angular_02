import { Component, OnInit } from '@angular/core';
import { FormLogin } from 'src/app/Models/FormLogin';
import { AdminComponent } from 'src/app/pages/admin/admin.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-offerslist',
  templateUrl: './offerlist.component.html',
  styleUrls: ['./offerlist.component.css']
})
export class OfferListComponent implements OnInit {

  private arrayDataOffers: Array<any>
  private _user!: FormLogin | null

  constructor(
    private _home: HomeComponent,
    private _admin: AdminComponent,
    private _loginSrv: LoginService
    ) {
    this.arrayDataOffers = new Array<any>()
    this._loginSrv.login.subscribe(user => this._user = user)
  }

  ngOnInit(): void {
    //Se cargan las ofertas
    this.setArrayDataOffers()
  }

  //Se cargan los datos de las ofertas
  setArrayDataOffers(): void {

    //Comprobaciones caja blanca
    console.log('C.Blanca: Offers - Se llama a Home solicitando un Get desde servicio')

    //Se llama a hom para solicitar los datos
    this._home.getAllOffers().subscribe(
      respose => {
        //Comprobaciones caja blanca
        console.log('C.Blanca: Offers - Se recibe la respuesta desde get/service/home')

        //Se cargan losd atos de la respuesta en el array
        this.arrayDataOffers = respose

        //Comprobaciones caja blanca
        console.log('C.Blanca: Offers - Se cargan los datos al array para distribuirlos :', this.arrayDataOffers)
      },
      error => {
        //En caso de error se muestra información en pantalla
        Swal.fire({
          icon: 'error',
          title: `Oops... Error ${error.status}`,
          text: 'Error en la carga de datos, no se ha podido cargar la lista de ofertas.'
        })
      }
    )
  }

  //Se devuelve información del array
  getArrayDataOffers(): Array<any> {
    return this.arrayDataOffers
  }

  //Se llama al formulario de oferta en modo edición
  goToEdith(id: string, body: Array<string>): void{
    //Comprobaciones caja blanca
    console.log('C.Blanca: offers - desde html solicita el acceso a new_offer')
    console.log('C.Blanca: offers - llama a admin para acceder a new_offer')
    this._admin.gotToNewOfferForEdith(id, body)
  }

  //Eliminación de una oferta
  deleteOffer(id: string): void {
    //SE muestra un mensaje para asegurar por parte del usuario que se desea eliminar la oferta
    Swal.fire({
      title: '¿Estas seguro de eleminar la oferta?',
      icon:'warning',
      showCancelButton: true,
      cancelButtonColor:'#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, borrar la oferta'
    }).then(
      //Si se confirma la eliminación...
      _comfirmed => {
        //...se elimna la oferta
        _comfirmed.isConfirmed ? this._admin.deleteSelectedOffer(id).subscribe(
          response => {
            //Se muestra info al usuario con la confirmación
            Swal.fire({
              title: 'Oferta eliminada correctamente',
              icon: 'success',
              confirmButtonColor: '#3085d6'
            }).then(
              //Si se realiza correctamente se llama a la recarga.
              _exit =>{
                this.reeload()
              }
            )
          },
          //...en caso de error
          _error => {
            //Se muestra al usuario la info
            Swal.fire({
              title: 'Error al intentar eliminar la oferta',
              icon: 'info',
              confirmButtonColor: '#3085d6'
            })
          }
          //...en caso de cancelación se muestra info al usuario.
        ) : Swal.fire({
              title: 'Se cancela la eliminación',
              icon: 'info',
              confirmButtonColor: '#3085d6'
            })
      }
    )
  }

  //Llamada a la recarga
  reeload(): void {
    this._admin.roloadView()
  }

  //Llamada a la nueva oferta
  gotToNewOffer(): void {
    this._admin.gotToNewOffer()
  }

  //Llamada a la oferta completa desde home
  fullOffer(id: string): void {
    this._home.goFullOffer(id)
  }

  //Llamada a la oferta completa desde admin
  fullOfferAdmin(id: string): void {
    this._admin.viewFullOffer(id)
  }

  //Se devuelve si el admin está activo
  getModeAmin(): boolean {
    return this._user != null//this.modeAmin;
  }

}
