import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommAPIService } from 'src/app/services/comm-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private _router: Router,
    private _srvComApi: CommAPIService
    ) { }

  ngOnInit(): void {
    this._router.navigate(['home/offers'])
  }

  gotToLogin(): void{
    this._router.navigate(['login'])
  }

  goToLogOut(): boolean{
    this.gotToHome()
    return this._srvComApi.closeSessionUser()
  }

  gotToHome(): void{
    this._router.navigate(['home'])
  }

  getAdminState(): boolean{
    return this._srvComApi.getAdminState()
  }

}
