import { IMovies } from './interface/Imovies';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { ICities } from './interface/ICities';
import 'rxjs/add/operator/catch';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';
import { ITheatres } from './interface/ITheatres';
import { IOrderDetails } from './interface/IOrderDetails';
@Injectable({
  providedIn: 'root'
})
export class LookupService {

  //store selected theatre
  public selectedTheatre: ITheatres;

  // city name pass through BehaviorSubject
  private cityNamePass = new BehaviorSubject('Delhi');
  currentcityNamePass = this.cityNamePass.asObservable();

  // orderDetails pass through BehaviorSubject
  private orderDetails: IOrderDetails={
    city : [],
  theatre_name : "",
  theatre_id : "",
  movies_array : [],
  movie_screen : [],
  price: [],
  visible: false,
	poster_url: "",
	title: "",
	certified: "",
	language: "",
	ratings: 0,
	interested: 0,
	genre: "",
	trailer: "",
	release_date: "",
	duration: "",
	synopsis: "",
	director: "",
	cast: "",
  cast_img: "",
  selectedNoOfTickets:0,
  selectedPriceOfTheatre: 0,
  selectedMovieTimings:"",
  }
  private orderSummayDetailsObject = new BehaviorSubject(this.orderDetails);
  orderSummayDetails = this.orderSummayDetailsObject.asObservable();

  //selected date
  public datePicked: string;


  constructor(private api: ApiService, private http: HttpClient) { }

  passOrderSummayDetailsToComponent(orderDetails: IOrderDetails) {
    this.orderSummayDetailsObject.next(orderDetails);
  }

  passCityNameToComponent(cityName: string) {
    this.cityNamePass.next(cityName);
  }

  // update remaming seats in selected theatre through put call
  updateTheatreCapacity(selectedMovieTheatre): Observable<ITheatres> {
    return this.api.updateTheatreCapacity(selectedMovieTheatre);
  }
  // http get call to fetch all cities
  getCities(): Observable<ICities[]> {
    return this.api.getCities();
  }

  // get all movies List
  getMovies(): Observable<IMovies[]> {
    return this.api.getMovies();
  }

  // get selected movie
  getGivenMovieDetails(movie_title): Observable<IMovies[]> {
    return this.api.getGivenMovieDetails(movie_title);
  }
  //get selected movie list
  fetchGivenMovieDetails(movie): Observable<IMovies[]> {
    return this.api.fetchGivenMovieDetails(movie);
  }

  // get all theatre
  getAllTheatreForSelectedMovie(movie): Observable<ITheatres[]> {
    return this.api.getAllTheatreForSelectedMovie(movie);
  }
}
