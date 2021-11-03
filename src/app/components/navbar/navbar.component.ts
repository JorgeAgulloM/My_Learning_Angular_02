import { Component, OnInit } from '@angular/core';
import { HomeComponent } from 'src/app/pages/home/home.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [HomeComponent]
})
export class NavbarComponent implements OnInit {


  constructor(
    private _home: HomeComponent
  )
  { }


  logInAdmin(value: boolean): void {
    value ?
    this._home.gotToLogin() :
    this._home.goToLogOut()
  }

  getAdminState(): boolean{
    return this._home.getAdminState()
  }

  goToHome(): void {
    this._home.gotToHome()
  }

  ngOnInit(): void {
  }

}
