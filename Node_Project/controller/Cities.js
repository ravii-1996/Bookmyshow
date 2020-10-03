const City = require('../model/BookmyshowSchema').City;

module.exports ={
  getCities : function(req,res){
    City.find({}, (err, result) => {
      if(err)
        throw err;
      res.send(result);
    });
  }
}