import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    HomeComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentsModule,
    RouterModule
  ],
  exports: [
    HomeComponent,
    AdminComponent
  ]
})
export class PagesModule { }
