import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfertaComponent } from './pages/oferta/oferta.component';
import { OfertasComponent } from './pages/ofertas/ofertas.component';
import { NuevaofertaComponent } from './pages/nuevaoferta/nuevaoferta.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'home',//'home'
    pathMatch:'full'
  },
  {
    path:'home',
    component: HomeComponent,
    children:[
      {
        path:'',
        component: OfertasComponent
      },
      {
        path:'ofertas',
        component: OfertasComponent
      },
      {
        path:'oferta/:id',
        component: OfertaComponent
      },
      {
        path:'login',
        component: LoginComponent,
        children:[
          {
            path:'ofertas',
            component: OfertasComponent
          },
          {
            path:'nueva_oferta',
            component: NuevaofertaComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
