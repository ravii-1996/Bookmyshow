import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MovieBannerComponent } from './movie-banner/movie-banner.component';
import { MovieSummaryComponent } from './movie-summary/movie-summary.component';
import { AppComponent } from './app.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { TheatreComponent } from './theatre/theatre.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';



const routes: Routes = [
{ path: '', component: HomeComponentComponent },
  { path: ':city/movies/:movieTitle', component: MovieSummaryComponent },
  {path: ':city/movies/:movieTitle/theatres/:movieFormat', component : TheatreComponent},
  {path: ':city/movies/:movieTitle/:movieFormat/orderSummary', component : OrderSummaryComponent},
  { path: ':city', component: MovieCardComponent },
  {path: 'orders/booking-confirmed', component : ThankyouComponent},
  { path: '**', component: PagenotfoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = [MovieCardComponent, AppComponent, HomeComponentComponent, TheatreComponent,MovieBannerComponent, MovieSummaryComponent,OrderSummaryComponent,PagenotfoundComponent,ThankyouComponent];