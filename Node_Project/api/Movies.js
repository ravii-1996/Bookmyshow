
class Movies{
  constructor(MongoClient, url,db_name,assert){
    this.MongoClient=MongoClient;
    this.url=url;
    this.db_name=db_name;
    this.assert=assert;
  }
  getMovies(req,res){
    this.MongoClient.connect(this.url, (err, db)=> {
      var dbo = db.db(this.db_name);
      dbo.collection("movieList").find().toArray( (err, result)=> {
        this.assert.equal(null, err);
        res.send(result);
        db.close();
      });
    });
  }

  getMovieOnBasisOfTitle(req,res){
    this.MongoClient.connect(this.url,  (err, db) =>{
      var dbo = db.db(this.db_name);
      let query = { title: req.params.movie_title };
      dbo.collection("movieList").find(query).toArray( (err, result) =>{
        this.assert.equal(null, err);
        res.send(result);
        db.close();
      });
    });
  }
}

module.exports = Movies;