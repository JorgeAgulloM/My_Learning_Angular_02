import { OfertacompletaComponent } from './ofertacompleta/ofertacompleta.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaofertasComponent } from './listaofertas/listaofertas.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListaofertasComponent,
    OfertacompletaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ListaofertasComponent,
    OfertacompletaComponent
  ]
})
export class ComponentsModule { }
