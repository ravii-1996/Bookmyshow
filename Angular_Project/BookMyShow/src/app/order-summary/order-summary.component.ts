import { IOrderDetails, movie_screen } from './../interface/IOrderDetails';
import { LookupService } from './../lookup.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { promise } from 'protractor';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  
  private orderDetails: IOrderDetails;
  private selectedMovieTheatre = this.lookupService.selectedTheatre;
  private errormsg: any;
  private number: number[];

  constructor(private lookupService: LookupService, private router: Router, private route: ActivatedRoute) {

  }
  //not working with selectednof ticket
  repeatLoop() {
    return Array(5).fill(1).map((x, i) => i);
  }
  datePicked = this.lookupService.datePicked;

  // update reamiming seats after booking
  updateSeatOfSelectedTheatre() {
    let promise = new Promise((resolve, reject) => {
      for (let movie_screen of this.selectedMovieTheatre.movie_screen) {
        if (movie_screen.movie_timings === this.orderDetails.selectedMovieTimings && movie_screen.capacity > this.orderDetails.selectedNoOfTickets) {
          movie_screen.capacity = movie_screen.capacity - this.orderDetails.selectedNoOfTickets;
          break;
        }
      }
      resolve(this.selectedMovieTheatre);
    });
    promise.then((selectedMovieTheatre) => {
      this.lookupService.updateTheatreCapacity(selectedMovieTheatre).subscribe(data => {
      }, error => this.errormsg = error);
    })
  }
  routeToThankyou() {
    //update remaning seats before route
    this.updateSeatOfSelectedTheatre();
    this.router.navigate(['orders', 'booking-confirmed']);
  }

  //preparing url for reroute to theatre page if click on refresh or orderdetails is null
  redirectToTheatrePage() {
    let city = this.route.snapshot.paramMap.get("city");
    let movieTitle = this.route.snapshot.paramMap.get("movieTitle");
    let movieFormat = this.route.snapshot.paramMap.get("movieFormat");
    this.router.navigate([city, "movies", movieTitle, 'theatres', movieFormat]);
  }

  ngOnInit() {
    let promise = new Promise((resolve, reject) => {
      //get data through behaviour subject class
      this.lookupService.orderSummayDetails.subscribe(data => this.orderDetails = data);
      resolve();
    });
    promise.then(() => {
      console.log("order " + this.orderDetails);
      if (!this.orderDetails) {
        //re-route to theatre page..
        this.redirectToTheatrePage();
      }

    });
  }
}
