import { movie_screen } from './IOrderDetails';
export interface ITheatres 
{
  city : string[];
  theatre_name : string;
  theatre_id : string;
  movies_array : number[];
  movie_screen : movie_screen[];
  price: string[];
}