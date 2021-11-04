import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfferComponent } from './components/offer/offer.component';
import { LogincardComponent } from './components/logincard/logincard.component';
import { CreateNewOfferComponent } from './components/create-new-offer/create-new-offer.component';
import { OfferListComponent } from './components/offerlist/offerlist.component';

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
      {path:'', component: OfferListComponent},
      {path:'offers', component: OfferListComponent},
      {path:'offer/:id', component: OfferComponent}
    ]
  },
  {
    path:'admin',
    component: AdminComponent,
    children:[
      {path:'', component: LogincardComponent},
      {path:'login_card', component: LogincardComponent},
      {path:'offers', component: OfferListComponent},
      {path:'offer/:id', component: OfferComponent},
      {path:'new_offer', component: CreateNewOfferComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
