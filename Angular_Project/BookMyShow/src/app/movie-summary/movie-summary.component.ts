import { IMovies } from './../interface/Imovies';
import { LookupService } from './../lookup.service';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-summary',
  templateUrl: './movie-summary.component.html',
  styleUrls: ['./movie-summary.component.css']
})
export class MovieSummaryComponent implements OnInit {

  movies: IMovies;
  constructor(private lookupService: LookupService, private route: ActivatedRoute, private router: Router, public sanitizer: DomSanitizer) { }


  getMovieTitleFromUrl(): string {
    let movieTitle = this.route.snapshot.paramMap.get('movieTitle');
    movieTitle = movieTitle.replace(/-/g, " ");
    return movieTitle;
  }

  //function to route to theatre component get city and movie title from url then use it to route
  routeToTheatreComponent(movieFormat) {
    let city = this.route.snapshot.paramMap.get('city');
    let movieTitle = this.movies.title.replace(/ /g, "-");
    this.router.navigate([city, "movies", movieTitle, 'theatres', movieFormat]);
  }
  ngOnInit() {

    let promise = new Promise((resolve, reject) => {

      //get movieTitle from URL to fetch the movie details of selected movie after that set movie object into array.
      let movieTitle = this.getMovieTitleFromUrl();
      if (movieTitle !== null) {
        resolve(movieTitle);
      }
      else {
        reject("Wrong Url");
      }
    });

    promise.then((movieTitle) => {
      //api to get the specific movie detail (by movie title) which is selected.. in home page
      this.lookupService.getGivenMovieDetails(movieTitle).subscribe(data => this.movies = data[0]);
    });
  }
}
