export interface movie_screen{
	movie_timings: string;
	capacity : number;
}
export interface IOrderDetails
{
  city : string[];
  theatre_name : string;
  theatre_id : string;
  movies_array : number[];
  movie_screen : movie_screen[] ;
  price: string[];
  visible: boolean;
	poster_url: string;
	title: string;
	certified: string;
	language: string;
	ratings: number;
	interested: number;
	genre: string;
	trailer: string;
	release_date: string;
	duration: string;
	synopsis: string;
	director: string;
	cast: string;
  cast_img: string;
  selectedNoOfTickets:number;
  selectedPriceOfTheatre:number;
  selectedMovieTimings:string;
}
