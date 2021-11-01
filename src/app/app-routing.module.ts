import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfferComponent } from './pages/offer/offer.component';
import { AllOffersComponent } from './pages/alloffers/alloffers.component';
import { NewOfferComponent } from './pages/newoffer/newoffer.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path:'home',
    component: HomeComponent,
    children:[
      {
        path:'',
        component: AllOffersComponent
      },
      {
        path:'offers',
        component: AllOffersComponent
      },        {
        path:'offer/:id',
        component: OfferComponent
      },
      {
        path:'login',
        component: LoginComponent,
        children:[
          {
            path:'offers',
            component: AllOffersComponent
          },
          {
            path:'new_offer',
            component: NewOfferComponent
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
