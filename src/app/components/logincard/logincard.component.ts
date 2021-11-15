import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormLogin } from 'src/app/Models/FormLogin';
import { AdminComponent } from 'src/app/pages/admin/admin.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-logincard',
  templateUrl: './logincard.component.html',
  styleUrls: ['./logincard.component.css']
})
export class LogincardComponent {

  private showPass: boolean
  isLoading = false

  constructor(
    private fb: FormBuilder,
    private _admin: AdminComponent
  ) {
    this.showPass = false
  }

  //Validación de inputs html
  ValidateLogin = this.fb.group({
    //Sre requiere en ambos casos que el usuario y la pass tenga un mínimo de 4 caracteres
    username: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    password: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    rememberMe: ['']
  })

/*   sendLogin(): Observable<FormLogin | null> {
    return this._admin.loginUser(this.ValidateLogin.value)
  } */

/*   loginUser(data: FormLogin): Observable<FormLogin | null> {
    console.log(this._loginSrv.login)
    return this._loginSrv.login
  } */

  //Envio de datos introducidos por usuario para iniciar sesión
  sendLogin(): void {
    //Se activa el estado de carga
    this.isLoading = true
    //Se pasan los datos a una instancia del model
    console.log('sendLogin: ', this.ValidateLogin.value)
    this._admin.loginUser(new FormLogin(
      this.ValidateLogin.value.username,
      this.ValidateLogin.value.password,
      this.ValidateLogin.value.rememberMe
    )).subscribe(
      //En caso de que la respuesta sea correcta...
      response =>{
        //...Se le envia a admin el token recibido
        //this._admin.sendTokenToServer(response.id_token)
        //...y se solicita ir a las ofertas
        console.log('loginCard = ', response)
        this._admin.goToOffers()
        //Se detiene el estado de carga
        this.isLoading = false
      },
      //En caso de error...
      error => {
        //...se detiene el estado de carga
        this.isLoading = false
        //...se muestra información en pantalla
        Swal.fire({
          icon: 'error',
          title: `Oops... Error ${error}`,
          text: 'Revisa tu usuario y contraseña'
        })
      }
    )
  }

  //Se devuelve si mostrar los caracteres del pass en el input
  getShowPass(): boolean {
    return this.showPass
  }

  //Se permite la muestra o no de los caracteres del pass en el input
  setShowPass(): void {
    this.showPass = !this.showPass
  }

}
