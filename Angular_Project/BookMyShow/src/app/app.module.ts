import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MovieBannerComponent } from './movie-banner/movie-banner.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { MovieSummaryComponent } from './movie-summary/movie-summary.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { TheatreComponent } from './theatre/theatre.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { LoadingComponent } from './loading/loading.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MovieBannerComponent,
    MovieCardComponent,
    FooterComponent,
    MovieSummaryComponent,
    routingComponent,
    HomeComponentComponent,
    TheatreComponent,
    OrderSummaryComponent,
    LoadingComponent,
    DatePickerComponent,
    ThankyouComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
