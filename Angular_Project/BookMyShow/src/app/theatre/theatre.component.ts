import { ITheatres } from './../interface/ITheatres';
import { IMovies } from './../interface/Imovies';
import { ActivatedRoute, Router } from '@angular/router';
import { LookupService } from './../lookup.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-theatre',
  templateUrl: './theatre.component.html',
  styleUrls: ['./theatre.component.css']
})
export class TheatreComponent implements OnInit {

  private movie: IMovies;
  private theatres: ITheatres[];
  private selectedMovieTheatrePriceArray: number[];
  private selectedMovieTheatreCapacity: number;
  private selectedMovieTheatre: ITheatres;
  private selectedTicketNo = 0;
  private selectedMovieTimings: string;
  private selectedMovieFormat: string;
  private priceEnableFlag: boolean = false


  constructor(private lookupService: LookupService, private router: Router, private route: ActivatedRoute) { }

  //set total no of tickets book.
  setSelectedTicketNo(noOfTickets) {
    this.selectedTicketNo = noOfTickets;
    this.priceEnableFlag = true;
  }

  // get mmovie title from url
  getMovieTitleFromUrl() {
    let movieTitle = this.route.snapshot.paramMap.get('movieTitle');
    let city = this.route.snapshot.paramMap.get('city');
    movieTitle = movieTitle.replace(/-/g, " ");
    return { movieTitle: movieTitle, city: city };
  }

  //set selected theatre details
  setSelectedTheatreDetails(selectedMovieTheatre, selectedMovieScreen) {

    let selectedMovieFormat = this.route.snapshot.paramMap.get('movieFormat');
    this.selectedMovieFormat = selectedMovieFormat;
    this.selectedMovieTheatre = selectedMovieTheatre;
    this.selectedMovieTheatrePriceArray = selectedMovieTheatre.price;
    this.selectedMovieTimings = selectedMovieScreen.movie_timings;
    this.selectedMovieTheatreCapacity = selectedMovieScreen.capacity;
    this.priceEnableFlag = false;
  }

  //befor route set all the data into the order list after that route to next page
  routeToOrderSummaryComponent(priceOfEachTheatre) {

    this.lookupService.selectedTheatre = this.selectedMovieTheatre;

    // set all the theatre, movie and selected data into the orderdetails.
    var orderDetails = Object.assign({}, this.selectedMovieTheatre, this.movie, { selectedNoOfTickets: this.selectedTicketNo }, { selectedPriceOfTheatre: priceOfEachTheatre }, { selectedMovieTimings: this.selectedMovieTimings },
      { selectedMovieFormat: this.selectedMovieTimings });

    this.lookupService.passOrderSummayDetailsToComponent(orderDetails);
    let city = this.route.snapshot.paramMap.get('city');
    let movieTitle = orderDetails.title.replace(/ /g, "-");
    this.router.navigate([city, "movies", movieTitle, this.selectedMovieFormat, 'orderSummary']);
  }
  ngOnInit() {
    let promise = new Promise((resolve, reject) => {

      //get movieTitle from URL to fetch the movie details of selected movie title after that set movie object into array.
      let movie = this.getMovieTitleFromUrl();
      if (movie !== null) {
        resolve(movie);
      }
      else {
        reject("Wrong Url");
      }
    });

    promise.then((movie) => {
      //fetch selected movie details
      this.lookupService.fetchGivenMovieDetails(movie).subscribe(data => this.movie = data[0]);
      //fetch all theatre for selected movie
      this.lookupService.getAllTheatreForSelectedMovie(movie).subscribe(data => this.theatres = data);
    });
  }

}
