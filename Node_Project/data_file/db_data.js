var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors);


var MongoClient = require('mongodb').MongoClient;

//Mongo db atlas url
// var url = "mongodb+srv://Ravii_1996:Qwerty#97@cluster0-r98r8.mongodb.net/test?retryWrites=true&w=majority";


//local url
var url = "mongodb://localhost:27017/";
var db_name = "bookmyshow";
var assert = require('assert');
var fs = require('fs');
//************change the file name  & collection name accordingly *************
var file_name="theatre.json";
var collection_name="theatre"

// var file_name="movieList.json";
// var collection_name="movieList"

/// read file to inserted data.
fs.readFile(file_name, 'utf8', function (err, data) {
  assert.equal(null, err);
  var data = JSON.parse(data);
  insertRecord(data, collection_name);  // name of Collection
});


// inserted Query
var insertRecord = function (jsonFile, Collection_name) {
  MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    var dbo = db.db(db_name);
    dbo.collection(Collection_name).deleteMany({}, function () {
      assert.equal(null, err);
      console.log(Collection_name + " document deleted");
      dbo.collection(Collection_name).insertMany(jsonFile, function (err, res) {
        assert.equal(null, err);
        console.log(Collection_name + " document inserted");
        db.close();
      });
    })
  });
}
