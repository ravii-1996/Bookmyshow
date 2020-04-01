
class Theatres{
  constructor(MongoClient, url,db_name,assert){
    this.MongoClient=MongoClient;
    this.url=url;
    this.db_name=db_name;
    this.assert=assert;
  }

  updateSeatOfTheatres(req,res){
    this.MongoClient.connect(this.url,  (err, db) =>{
      var dbo = db.db(this.db_name);
      console.log(req.body);
      var myquery= { theatre_id: req.body.theatre_id};
      var newvalues = { $set: { movie_screen: req.body.movie_screen } };
      dbo.collection("theatre").updateOne(myquery, newvalues, (err, result)=>{
        if(err)
          console.log("error in updating");
        res.send("ok");
        console.log("result"+ result);
        db.close();
      });
    });
  }
  getAllTheatresOfSelectedMovie(req,res){
    this.MongoClient.connect(this.url,  (err, db)=> {
      var dbo = db.db(this.db_name);
      let query = [
        { $match: {movies_array:req.params.movieTitle, city : req.params.city}}
      ];
      dbo.collection("theatre").aggregate(query).toArray( (err, result)=> {
        this.assert.equal(null, err);
        res.send(result);
        db.close();
      });
    });
  }
}
module.exports = Theatres;