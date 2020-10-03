const express = require('express');
const router = express.Router();
const Scheduler = require('./../model/BookmyshowSchema.js');

const MovieJson= require('./../data/movieList.json');
const TheatreJson= require('./../data/theatre.json');
const UserJson= require('./../data/user.json');
const CityJson= require('./../data/cityList.json');

const Cities= require('./../controller/Cities');
const Movies= require('./../controller/Movies');
const Theatres= require('./../controller/Theatres');
const User= require('./../controller/User');


Scheduler.scheduler(MovieJson,TheatreJson,UserJson,CityJson, (err, res)=>{
  if(err)
    throw new Error("Scheduler is not working properly... Please connect to Admin")
});

router.get("/v1/getcities", function (req, res) {
  Cities.getCities(req,res);
});

router.put("/v1/update/theatres/", function (req, res) {
  Theatres.updateSeatOfTheatres(req,res);
});

router.get("/v1/getmovies", function (req, res) {
  Movies.getMovies(req,res);
});

router.get("/v1/movies/:movie_title", function (req, res) {
  Movies.getMovieOnBasisOfTitle(req,res);
});


router.get("/v1/:city/:movieTitle/theatres", function (req, res) {
  Theatres.getAllTheatresOfSelectedMovie(req,res);
});

module.exports = router;