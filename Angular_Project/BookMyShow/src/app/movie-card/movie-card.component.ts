import { Router } from '@angular/router';
import { IMovies } from './../interface/Imovies';
import { LookupService } from './../lookup.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {

  private cityName: string;

  constructor(private lookupService: LookupService, private router: Router) { }

  routeOnSelect(movie) {
    let title = movie.title.replace(/ /g, "-");
    this.router.navigate([this.cityName, 'movies', title]);
  }

  private genres = [
    { checked: false , genre: 'Action'  }, 
    { checked: false , genre: 'Adventure'  }, 
    { checked: false , genre: 'Animation'  }, 
    { checked: false , genre: 'Biography'  }, 
    { checked: false , genre: 'Comedy'  }, 
    { checked: false , genre: 'Crime'  }, 
    { checked: false , genre: 'Drama'  }, 
    { checked: false , genre: 'Fantasy'  }, 
    { checked: false , genre: 'Historical'  }, 
    { checked: false , genre: 'Horror'  }, 
    { checked: false , genre: 'Mystery'  }, 
    { checked: false , genre: 'Period'  }, 
    { checked: false , genre: 'Romantic'  }, 
    { checked: false , genre: 'Thriller'}
    ];

  private select_language = [
    { language: 'English', checked: false },
    { language: 'Hindi', checked: false },
    { language: 'Telgu', checked: false },
    { language: 'Punjabi', checked: false },
    { language: 'Kannada', checked: false },
    { language: 'Malayalam', checked: false },
    { language: 'Bengali', checked: false }
  ];

  private formats  = [
    { format :  '2D', checked : false },
    { format :  '3D', checked : false },
    { format :  '4D', checked : false },
    { format :  '7DX', checked : false },
    { format :  'IMAX3D', checked : false },
    { format :  'IMAX4D', checked : false }
    ];

  public movieList: IMovies[];
  private moviesNotFound = false;
  private totalNoOfMoviesSelected = 0;

  checkNoMovieFound(){
    var movieFound: boolean = false;
    for(let movie of this.movieList){
      if((movie.visible && this.totalNoOfMoviesSelected>0) || this.totalNoOfMoviesSelected===0){
        movieFound=true;
      }
    }
    return movieFound;
  }

  // filter movie list according to format --- logic first check the status of selected checkbox and update the checked feild of format object array after that update visible feild of movieList according to selected format....

  filterMovieListByFormat(selectedCheckboxStatus, selectedFormat){
    if (!selectedCheckboxStatus.checked) {
      selectedFormat.checked = true;
      for (let movies of this.movieList) {
        if (movies.format.includes(selectedFormat.format)) {
          movies.visible = true;
        }
      };
      this.totalNoOfMoviesSelected++;
    }
    else {
      selectedFormat.checked = false;
      for (let movies of this.movieList) {
        if (movies.format.includes(selectedFormat.format)) {
          movies.visible = false;
        }
      };
      this.totalNoOfMoviesSelected--;
    }
  }

  // same logic as format
  filterMovieListByGenre(selectedCheckboxStatus, selectedGenre){
    if (!selectedCheckboxStatus.checked) {
      selectedGenre.checked = true;
      for (let movies of this.movieList) {
        if (movies.genre.includes(selectedGenre.genre)) {
          movies.visible = true;
        }
      };
      this.totalNoOfMoviesSelected++;
    }
    else {
      selectedGenre.checked = false;
      for (let movies of this.movieList) {
        if (movies.genre.includes(selectedGenre.genre)) {
          movies.visible = false;
        }
      };
      this.totalNoOfMoviesSelected--;
    }
  }

  //sam elogic as format or genre
  filterMovieListByLang(selectedCheckboxStatus, selectedLang) {
    if (!selectedCheckboxStatus.checked) {
      selectedLang.checked = true;
      for (let movies of this.movieList) {
        if (movies.language === selectedLang.language) {
          movies.visible = true;
        }
      };
      this.totalNoOfMoviesSelected++;
    }
    else {
      selectedLang.checked = false;
      for (let movies of this.movieList) {
        if (movies.language === selectedLang.language) {
          movies.visible = false;
        }
      };
      this.totalNoOfMoviesSelected--;
    }
  }

  ngOnInit() {
    //api call for movies
    this.lookupService.getMovies().subscribe(data => this.movieList = data);
    // use behaviour subject get selected the city name 
    this.lookupService.currentcityNamePass.subscribe(data => this.cityName = data);
  }

}
