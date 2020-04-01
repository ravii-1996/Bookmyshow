import { IMovies } from './interface/Imovies';
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ICities } from './interface/ICities';
import 'rxjs/add/operator/catch';
import { ITheatres } from './interface/ITheatres';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //private baseurl: string = "http://localhost:8000"; // server api url
  private baseurl: string = "https://bookmyshow-backend.herokuapp.com"; // server api url

  constructor(private http: HttpClient) { }

  getMovies() {
    return this.http.get<IMovies[]>(this.baseurl + "/api/v1/getmovies").catch(this.customErrorHandler);
  }

  getCities() {
    return this.http.get<ICities[]>(this.baseurl + "/api/v1/getcities").catch(this.customErrorHandler);
  }
  updateTheatreCapacity(selectedMovieTheatre){    
    return this.http.put<ITheatres>(this.baseurl + "/api/v1/update/theatres/" ,selectedMovieTheatre).catch(this.customErrorHandler);
  }
  getGivenMovieDetails(movie_title) {
    console.log(movie_title);
    return this.http.get<IMovies[]>(this.baseurl + "/api/v1/movies/" + movie_title).catch(this.customErrorHandler);
  }
  fetchGivenMovieDetails(movie) {
    console.log("api",movie.city,movie.movieTitle);
    return this.http.get<IMovies[]>(this.baseurl + "/api/v1/movies/" + movie.movieTitle).catch(this.customErrorHandler);
  }
  getAllTheatreForSelectedMovie(movie) : Observable<ITheatres[]>{
    return this.http.get<ITheatres[]>(this.baseurl + "/api/v1/"+movie.city +"/"+ movie.movieTitle +"/theatres");
  }
  customErrorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }
}
