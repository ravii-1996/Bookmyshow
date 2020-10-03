const Theatre = require('../model/BookmyshowSchema').Theatre; 

var updateSeatOfTheatres = function(req,res){
      let  myquery= { theatre_id: req.body.theatre_id};
      let newvalues = { $set: { movie_screen: req.body.movie_screen } };
      Theatre.updateOne(myquery, newvalues, (err, result)=>{
        if(err)
          throw new Error("Seat Not valid. Please check Update Seat Api");
        res.send("Seat Updated Succesfully..");
      });
  }

var getAllTheatresOfSelectedMovie=  function(req,res){
      let query = [
        { $match: {movies_array:req.params.movieTitle, city : req.params.city}}
      ];
      Theatre.aggregate(query, (err, result)=> {
        if(err)
          throw err;
        res.send(result);
      });
  }

module.exports = {
  updateSeatOfTheatres : updateSeatOfTheatres,
  getAllTheatresOfSelectedMovie : getAllTheatresOfSelectedMovie
}