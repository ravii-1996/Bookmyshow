const Movie = require('../model/BookmyshowSchema').Movie;
module.exports ={
  getMovies : function(req,res){
    Movie.find({}, (err, result)=> {
        if(err)
          throw err;
        res.send(result);
    });
  },

  getMovieOnBasisOfTitle: function(req,res){
      let query = { title: req.params.movie_title };
      Movie.find(query, (err, result) =>{
        if(err)
          throw err;
        res.send(result);
      });
  }
}