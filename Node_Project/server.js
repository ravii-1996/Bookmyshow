const express = require('express');
var cors = require('cors')
const app = express();
const router = express.Router();

const Movies =require('./api/Movies');
const Theatres=require('./api/Theatres');
const Cities=require('./api/Cities');

app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const MongoClient = require('mongodb').MongoClient;
// const url = 'mongodb://localhost:27017/';
const url = 'mongodb+srv://Ravii_1996:Qwerty%2397@cluster0-r98r8.mongodb.net/test?retryWrites=true&w=majority';

const db_name = "bookmyshow";
const assert = require('assert');

var movies= new Movies(MongoClient,url, db_name, assert);
var theatres= new Theatres(MongoClient,url, db_name, assert);
var cities = new Cities(MongoClient,url, db_name, assert);

app.get("/api/v1/getcities", function (req, res) {
  cities.getCities(req,res);
});

app.put("/api/v1/update/theatres/", function (req, res) {
  theatres.updateSeatOfTheatres(req,res);
});

app.get("/api/v1/getmovies", function (req, res) {
  movies.getMovies(req,res);
});

app.get("/api/v1/movies/:movie_title", function (req, res) {
  movies.getMovieOnBasisOfTitle(req,res);
});


app.get("/api/v1/:city/:movieTitle/theatres", function (req, res) {
  theatres.getAllTheatresOfSelectedMovie(req,res);
});


app.listen(process.env.PORT || 8000 );
