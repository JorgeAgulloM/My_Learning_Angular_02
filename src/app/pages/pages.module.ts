import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NewOfferComponent } from './newoffer/newoffer.component';
import { OfferComponent } from './offer/offer.component';
import { AllOffersComponent } from './alloffers/alloffers.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    NewOfferComponent,
    OfferComponent,
    AllOffersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentsModule,
    RouterModule
  ],
  exports: [
    HomeComponent,
    LoginComponent,
    NewOfferComponent,
    OfferComponent,
    AllOffersComponent
  ]
})
export class PagesModule { }
