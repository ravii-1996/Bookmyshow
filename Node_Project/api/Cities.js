
class Cities{
  constructor(MongoClient, url,db_name,assert){
    this.MongoClient=MongoClient;
    this.url=url;
    this.db_name=db_name;
    this.assert=assert;
  }

  getCities(req,res){
    this.MongoClient.connect(this.url, (err, db) =>{
      var dbo = db.db(this.db_name);
      dbo.collection("cities").find().toArray( (err, result) => {
        this.assert.equal(null, err);
        res.send(result);
        db.close();
      });
    });
  }
}

module.exports = Cities;