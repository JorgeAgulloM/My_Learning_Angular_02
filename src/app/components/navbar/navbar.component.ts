import { Component } from '@angular/core';
import { FormLogin } from 'src/app/Models/FormLogin';
import { AdminComponent } from 'src/app/pages/admin/admin.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [HomeComponent]
})
export class NavbarComponent {

  private _user!: FormLogin | null

  constructor(
    private _home: HomeComponent,
    private _admin: AdminComponent,
    private _loginSrv: LoginService
  ){
    this._loginSrv.login.subscribe(user => this._user = user)
  }

  //Solicita ir a Login
  logInAdmin(): void {
    this._home.gotToAdmin()
  }

  //solicita cierre de sesión
  logOutAdmin():void {
    this._admin.kickUser()
    this.goToHome()
  }

  //Solicita el estado de la sesión
  getAdminState(): boolean{
    return this._user != null//this._admin.UserSessionStatus()
  }

  //Solicita ir a Home
  goToHome(): void {
    this._home.gotToHome()
  }

}
