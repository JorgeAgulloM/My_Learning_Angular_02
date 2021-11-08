import { Component } from '@angular/core';
import { HomeComponent } from 'src/app/pages/home/home.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [HomeComponent]
})
export class NavbarComponent {

  constructor(
    private _home: HomeComponent
  ){ }

  //Solicita ir a Login
  logInAdmin(): void {
    this._home.gotToAdmin()
  }

  //solicita cierre de sesión
  logOutAdmin():void {
    this._home.CloseSession()
  }

  //Solicita el estado de la sesión
  getAdminState(): boolean{
    return this._home.UserSessionStatus()
  }

  //Solicita ir a Home
  goToHome(): void {
    this._home.gotToHome()
  }

}
