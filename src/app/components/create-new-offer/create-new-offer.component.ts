import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormNewOffer } from 'src/app/Models/FormNewOffer';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { CommAPIService } from 'src/app/services/comm-api.service';

@Component({
  selector: 'app-create-new-offer',
  templateUrl: './create-new-offer.component.html',
  styleUrls: ['./create-new-offer.component.css']
})
export class CreateNewOfferComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private _comApiSrv: CommAPIService,
    private _router: Router,
    private _loginComp: LoginComponent
  ) { }


  ValidateNewOffer = this.fb.group({
    titulo: ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
    descripcion: ['', Validators.compose([Validators.required, Validators.maxLength(300)])],
    empresa: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
    salario: ['', Validators.required],
    ciudad: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
    email: ['', Validators.compose([Validators.required, Validators.required])]
  })

  sendNewOffer(): void {
    this._loginComp.setNewOffer(new FormNewOffer(
      this.ValidateNewOffer.value.titulo,
      this.ValidateNewOffer.value.descripcion,
      this.ValidateNewOffer.value.empresa,
      this.ValidateNewOffer.value.salario,
      this.ValidateNewOffer.value.ciudad,
      this.ValidateNewOffer.value.email,
    ))
  }

  ngOnInit(): void {
  }

}
