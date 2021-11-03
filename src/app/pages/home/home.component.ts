import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private homeLogin: boolean

  constructor(
    private _router: Router
    )
    {
      this.homeLogin = false
     }

  ngOnInit(): void {
    this._router.navigate(['home/offers'])
  }

  gotToLoginOrHome(): void{
    this.homeLogin = !this.homeLogin
    let iter = this.homeLogin ? 'login' : 'home'
    this._router.navigate([iter])
  }
}
