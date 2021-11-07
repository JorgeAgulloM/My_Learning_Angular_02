import { HomeComponent } from 'src/app/pages/home/home.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormNewOffer } from 'src/app/Models/FormNewOffer';
import { AdminComponent } from 'src/app/pages/admin/admin.component';
import { ActivatedRoute } from '@angular/router';
import { flatten } from '@angular/compiler';

@Component({
  selector: 'app-create-new-offer',
  templateUrl: './create-new-offer.component.html',
  styleUrls: ['./create-new-offer.component.css']
})
export class CreateNewOfferComponent implements OnInit {

  private edithOfferMode: boolean
  private idEdithOffer: string
  private edithOffer: Array<string>
  isLoading = false

  constructor(
    private _fb: FormBuilder,
    private _admin: AdminComponent,
    private _home: HomeComponent,
    private _actvRouter: ActivatedRoute
  ) {
    this.edithOfferMode = false
    this.idEdithOffer = ''
    this.edithOffer = Array<string>()
  }

  ngOnInit(): void {
    if(!this._home.UserSessionStatus()) {
     this._admin.goToOffers()
     this._admin.kickUser()
     alert('No tienes permiso, logeate')

    } else {

      console.log('C.Blanca: new_offer - desde admin se navega hasta new_offer. Confirmado usuario logado. Se muestra formulario html.')

     if (this._actvRouter.routeConfig!.path!.toString() == `edith_offer/:id`) {
        this.edithOfferMode = true
        this.idEdithOffer = this._actvRouter.snapshot.paramMap.get('id')!
        Object.entries(this._admin.geTofferForEdith()).forEach(
          ([key, value]) => this.edithOffer.push(value)
        )
      }
     }
   }

  ValidateNewOffer = this._fb.group({
    titulo: ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
    descripcion: ['', Validators.compose([Validators.required, Validators.maxLength(300)])],
    empresa: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
    salario: ['', Validators.required],
    ciudad: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
    email: ['', Validators.compose([Validators.required, Validators.email])]
  })

  sendNewOffer(): void {

    console.log('C.Blanca: new_offer - Campos validados, pulsado el botón de envio.')

    this.isLoading = true
    console.log('C.Blanca: new_offer - Se bloquea el botón de envio.')

    if (this.edithOfferMode){
      if (this.ValidateNewOffer.value.titulo == '') this.ValidateNewOffer.value.titulo = this.edithOffer[1]
      if (this.ValidateNewOffer.value.descripcion == '') this.ValidateNewOffer.value.descripcion = this.edithOffer[2]
      if (this.ValidateNewOffer.value.empresa == '') this.ValidateNewOffer.value.empresa = this.edithOffer[3]
      if (this.ValidateNewOffer.value.salario == '') this.ValidateNewOffer.value.salario = this.edithOffer[4]
      if (this.ValidateNewOffer.value.ciudad == '') this.ValidateNewOffer.value.ciudad = this.edithOffer[5]
      if (this.ValidateNewOffer.value.email == '') this.ValidateNewOffer.value.email = this.edithOffer[6]

      console.log(this.ValidateNewOffer.value.titulo)
      console.log(this.ValidateNewOffer.value.descripcion)
      console.log(this.ValidateNewOffer.value.empresa)
      console.log(this.ValidateNewOffer.value.salario)
      console.log(this.ValidateNewOffer.value.ciudad)
      console.log(this.ValidateNewOffer.value.email)
    }

    console.log('C.Blanca: new_offer - Se cargan los datos en variable tipo FormNewOffer.')

    let values: FormNewOffer = new FormNewOffer(
      this.ValidateNewOffer.value.titulo,
      this.ValidateNewOffer.value.descripcion,
      this.ValidateNewOffer.value.empresa,
      this.ValidateNewOffer.value.salario,
      this.ValidateNewOffer.value.ciudad,
      this.ValidateNewOffer.value.email)

    if (this.edithOfferMode){
      this._admin.edthiOffer(this.idEdithOffer, values).subscribe(
        response => {
          this.goToOffers()
          this.isLoading = false
        },
        error => {
          this.isLoading = false
          alert(`Error ${error.status}: ${error.statusText}`)
      })
    } else {
      console.log('C.Blanca: new_offer - Se envian los datos a admin para que los pase a service.')
      this._admin.newOffer(values).subscribe(
      response => {
        console.log('C.Blanca: new_offer - Se recibe una respuesta correcta desde insert/admin/servicio')
        this.goToOffers()
        this.isLoading = false
        console.log('C.Blanca: new_offer - Se llama a la función de regreso a offers y se debloquea el botón de envio.')
      },
      error => {
        this.isLoading = false
        alert(`Error ${error.status}: ${error.statusText}`)
      })
    }
  }



  getEdithOfferMode():boolean {
    return this.edithOfferMode
  }

  getEdithOffer(value: number): string {
    return this.edithOffer[value]
  }

  goToOffers(): void {
    this._admin.goToOffers()
  }

}
