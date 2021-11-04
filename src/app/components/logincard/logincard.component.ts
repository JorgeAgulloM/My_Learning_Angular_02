import { timer } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormLogin } from 'src/app/Models/FormLogin';
import { AdminComponent } from 'src/app/pages/admin/admin.component';
import { WarningComponent } from '../warning/warning.component';
import { CommAPIService } from 'src/app/services/comm-api.service';

@Component({
  selector: 'app-logincard',
  templateUrl: './logincard.component.html',
  styleUrls: ['./logincard.component.css'],
  providers: [WarningComponent]
})
export class LogincardComponent implements OnInit {

  private show: boolean
  private warning: boolean
  private timeLeft: number
  private subscribeTimer: number


  constructor(
    private _fb: FormBuilder,
    private _admin: AdminComponent,
    private _srvComApi: CommAPIService,
    private _warning: WarningComponent
  ) {
    this.show = false
    this.warning = false
    this.timeLeft = 5
    this.subscribeTimer = 0
  }

  ValidateLogin = this._fb.group({
    username: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    password: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    rememberMe: ['']
  })

  sendLogin(): void {
    this._srvComApi.postUserLogin(new FormLogin(
      this.ValidateLogin.value.username,
      this.ValidateLogin.value.password,
      this.ValidateLogin.value.rememberMe
    )).subscribe(
      response =>{
        this._srvComApi.saveToken(response.id_token)
        this._admin.goToOffers()
      },
      error => {
        let message: string = ''
        switch(error.status){
          case '400':
            message = 'Solicitud incorrecta'
            break
          case '401':
            message = 'No Autorizado'
            break
          case '403':
            message = 'Acceso prohibido'
            break
          case '404':
            message = 'No encontrado'
            break
          case '500':
            message = 'Error interno del servidor'
            break
          case '503':
            message = 'Servicio no disponible'
            break
        }
        this.showWarning(`Error ${error.status}, ${message}`)
      }
    )
  }

  ngOnInit(): void {
    this.warning = false
    /* this.oberserableTimer() */
  }

  getShowPass(): boolean {
    return this.show
  }

  showPass(): void {
    this.show = !this.show
  }

  getWarning(): boolean {
    return this.warning
  }

  showWarning(message: string): void {
    this._warning.setMessage(message)
    console.log(message)
    this.warning = true
  }


  /* oberserableTimer() {
    const source = timer(1000, 2000);
    const abc = source.subscribe(val => {
      console.log(val, '-', this.subscribeTimer);
      this.subscribeTimer = this.timeLeft - val;
    });
  } */

}
