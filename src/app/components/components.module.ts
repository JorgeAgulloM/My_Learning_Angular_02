import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferListComponent } from './offerlist/offerlist.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { LogincardComponent } from './logincard/logincard.component';
import { CreateNewOfferComponent } from './create-new-offer/create-new-offer.component';



@NgModule({
  declarations: [
    OfferListComponent,
    NavbarComponent,
    LogincardComponent,
    CreateNewOfferComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    OfferListComponent,
    NavbarComponent,
    LogincardComponent,
    CreateNewOfferComponent
  ]
})
export class ComponentsModule { }
