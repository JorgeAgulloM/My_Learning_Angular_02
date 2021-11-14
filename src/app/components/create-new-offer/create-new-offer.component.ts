import { Observable } from 'rxjs';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormNewOffer } from 'src/app/Models/FormNewOffer';
import { AdminComponent } from 'src/app/pages/admin/admin.component';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

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
    //En caso de acceder a traves del nvaegador y que no haya sesión iniciada
    //Se solicita el satado de sesión. Si no hay sesión activa...
    if(!this._home.UserSessionStatus()) {
      //...se solicita
     this._home.gotToHome()// goToOffers()
     //... y se solicita la expulsión del usuario (Para prevenir que queden datos de algún tipo)
     this._admin.kickUser()
     //Se muestra el aviso
     Swal.fire({
      icon: 'error',
      title: `Oops...`,
      text: 'No tienes permiso, logeate'
    })

    //En caso de que SI haya sesión iniciada...
    } else {

      //Comprobaciones de caja blanca
      console.log('C.Blanca: new_offer - desde admin se navega hasta new_offer. Confirmado usuario logado. Se muestra formulario html.')

      //...se comprueba si la ruta activa es para la edición
     if (this._actvRouter.routeConfig!.path!.toString() == `edith_offer/:id`) {
       //...se activa el modo edición
        this.edithOfferMode = true
        //...se carga la id de la oferta a editar
        this.idEdithOffer = this._actvRouter.snapshot.paramMap.get('id')!
        //...y se obtien los datos de esta
        Object.entries(this._admin.geTofferForEdith()).forEach(
          ([key, value]) => this.edithOffer.push(value)
        )
      }
    }
  }

  //Validaciones para los inputs. Solo se usan si NO hay modo edición
  ValidateNewOffer = this._fb.group({
    titulo: ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
    descripcion: ['', Validators.compose([Validators.required, Validators.maxLength(300)])],
    empresa: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
    salario: ['', Validators.required],
    ciudad: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
    email: ['', Validators.compose([Validators.required, Validators.email])]
  })

  ValidateTitulo = this._fb.group({
    titulo: ['', Validators.compose([Validators.required, Validators.maxLength(100)])]
  })

  ValidateDescripcion = this._fb.group({
    descripcion: ['', Validators.compose([Validators.required, Validators.maxLength(300)])]
  })

  ValidateEmpresa = this._fb.group({
    empresa: ['', Validators.compose([Validators.required, Validators.maxLength(50)])]
  })

  ValidateSalario = this._fb.group({
    salario: ['', Validators.required]
  })

  ValidateCiudad = this._fb.group({
    ciudad: ['', Validators.compose([Validators.required, Validators.maxLength(50)])]
  })

  ValidateEmail = this._fb.group({
    email: ['', Validators.compose([Validators.required, Validators.email])]
  })

  //Se cargan los datos de los inputs
  sendNewOffer(): void {

     //Comprobaciones de caja blanca
    console.log('C.Blanca: new_offer - Campos validados, pulsado el botón de envio.')

    //Se activa el modo carga
    this.isLoading = true

    //Comprobaciones de caja blanca
    console.log('C.Blanca: new_offer - Se bloquea el botón de envio.')

    //Si el modo edición está activado...
    if (this.edithOfferMode){
      //Se comprueban que valores no se han modificado y se les dá el valor actual.
      this.ValidatorsEdit()
    }

    //Comprobaciones de caja blanca
    console.log('C.Blanca: new_offer - Se cargan los datos en variable tipo FormNewOffer.')

    //Se cargan los valores en una instancia del model
    let values: FormNewOffer = new FormNewOffer(
      this.ValidateNewOffer.value.id,
      this.ValidateNewOffer.value.titulo,
      this.ValidateNewOffer.value.descripcion,
      this.ValidateNewOffer.value.empresa,
      this.ValidateNewOffer.value.salario,
      this.ValidateNewOffer.value.ciudad,
      this.ValidateNewOffer.value.email)
      console.log(values)


    //Si está activo el modo edición...
    if (this.edithOfferMode){
      //Se solicita a admin la edición de la ofertta
      this._admin.edthiOffer(values).subscribe(
        //Si hay respuesta correcta...
        response => {
          //Se informa de la edición
          Swal.fire({
            icon: 'success',
            title: `Oferta: ${JSON.stringify(response)}`,
            text: 'La oferta ha sido editada.'
          })
          //...se solicita ir a la lista de ofertas
          this.goToOffers()
          //...se desactiva el modo de carga
          this.isLoading = false
        },
        //En caso de error...
        error => {
          //...se desactiva el modo de carga
          this.isLoading = false
          //...y se muestra un mensaje de error
          Swal.fire({
            icon: 'error',
            title: `Oops... Error ${error.status}`,
            text: 'Error en la edición de la oferta'
          })
      })

      //Si no está el modo edición activo...
    } else {

      //Comprobaciones de caja blanca
      console.log('C.Blanca: new_offer - Se envian los datos a admin para que los pase a service.')

      //...se solicita la creación de la nueva oferta
      this._admin.newOffer(values).subscribe(
      //En caso de una respuesta correcta
      response => {

        //Comprobaciones de caja blanca
        console.log('C.Blanca: new_offer - Se recibe una respuesta correcta desde insert/admin/servicio')

        //...se solicita ir a ofertas
        this.goToOffers()
        //..se desactiva el modo de carga
        this.isLoading = false

        //Comprobaciones de caja blanca
        console.log('C.Blanca: new_offer - Se llama a la función de regreso a offers y se debloquea el botón de envio.')
      },
      //En caso de error...
      error => {
        //...se desactiva el modo de carga
        this.isLoading = false
        //...y se muestra un mensaje de error
        Swal.fire({
          icon: 'error',
          title: `Oops... Error ${error.status}`,
          text: 'Error en la inserción de la oferta'
        })
      })
    }
  }

  //Desbloquea el botón de envio en caso de...
  isDisabled(): boolean{
    //...de que no se esté en proceso de carga para evitar sendas pulsaciones
    if (!this.isLoading) {
      //...de que no se esté editando y el formulario sea valido
      if (!this.edithOfferMode && this.ValidateNewOffer.valid){
        return false

      //...de que se esté en modo edición y uno de los inputs haya cambiado
      } else if (this.edithOfferMode){
        if (this.ValidateTitulo.valid
          || this.ValidateDescripcion.valid
          || this.ValidateEmpresa.valid
          || this.ValidateSalario.valid
          || this.ValidateCiudad.valid
          || this.ValidateEmail.valid){
            return false
          }

      }
    }

    //En cualquier otro caso el botón estará bloqueado
    return true
  }

  //Consulta si se está en modo edición
  getEdithOfferMode():boolean {
    return this.edithOfferMode
  }

  //Consulta los dato seleccionado de la oferta
  getEdithOffer(value: number): string {
    return this.edithOffer[value]
  }

  //Solicita ir a ofertas.
  goToOffers(): void {
    this._admin.goToOffers()
  }

  //En caso de que se esté editando, asegura que los campos tienen contenido si no se han editado
  private ValidatorsEdit(){
    this.ValidateNewOffer.value.id = this.edithOffer[0]

    //Si título se ha editado tendrá el valor del input, si no el actual
    this.ValidateTitulo.value.titulo == '' ?
     this.ValidateNewOffer.value.titulo = this.edithOffer[1] :
     this.ValidateNewOffer.value.titulo = this.ValidateTitulo.value.titulo

    this.ValidateDescripcion.value.descripcion == '' ?
     this.ValidateNewOffer.value.descripcion = this.edithOffer[2] :
     this.ValidateNewOffer.value.descripcion = this.ValidateDescripcion.value.descripcion

    this.ValidateEmpresa.value.empresa == '' ?
     this.ValidateNewOffer.value.empresa = this.edithOffer[3] :
     this.ValidateNewOffer.value.empresa = this.ValidateEmpresa.value.empresa

    this.ValidateSalario.value.salario == '' ?
     this.ValidateNewOffer.value.salario = this.edithOffer[4] :
     this.ValidateNewOffer.value.salario = this.ValidateSalario.value.salario

    this.ValidateCiudad.value.ciudad == '' ?
     this.ValidateNewOffer.value.ciudad = this.edithOffer[5] :
     this.ValidateNewOffer.value.ciudad = this.ValidateCiudad.value.ciudad

    this.ValidateEmail.value.email == '' ?
     this.ValidateNewOffer.value.email = this.edithOffer[6] :
     this.ValidateNewOffer.value.email = this.ValidateEmail.value.email
  }


}
