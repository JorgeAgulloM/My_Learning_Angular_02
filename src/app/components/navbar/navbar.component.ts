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

  logInAdmin(value: boolean): void {
    value ?
    this._home.gotToAdmin() :
    this._home.CloseSession()
  }

  getAdminState(): boolean{
    return this._home.UserSessionStatus()
  }

  goToHome(): void {
    this._home.gotToHome()
  }

}
