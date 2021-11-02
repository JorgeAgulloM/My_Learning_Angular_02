import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferListComponent } from './offerlist/offerlist.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { LogincardComponent } from './logincard/logincard.component';



@NgModule({
  declarations: [
    OfferListComponent,
    NavbarComponent,
    LogincardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    OfferListComponent,
    NavbarComponent
  ]
})
export class ComponentsModule { }
