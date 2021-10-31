import { RouterModule } from '@angular/router';
import { OfertacompletaComponent } from './ofertacompleta/ofertacompleta.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaofertasComponent } from './listaofertas/listaofertas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [
    ListaofertasComponent,
    OfertacompletaComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    ListaofertasComponent,
    OfertacompletaComponent,
    NavbarComponent
  ]
})
export class ComponentsModule { }
