import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NuevaofertaComponent } from './nuevaoferta/nuevaoferta.component';
import { OfertaComponent } from './oferta/oferta.component';
import { OfertasComponent } from './ofertas/ofertas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    NuevaofertaComponent,
    OfertaComponent,
    OfertasComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  exports: [
    HomeComponent,
    LoginComponent,
    NuevaofertaComponent,
    OfertaComponent,
    OfertasComponent
  ]
})
export class PagesModule { }
