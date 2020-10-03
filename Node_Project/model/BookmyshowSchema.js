const mongoose = require('mongoose');
const dotenv= require('dotenv').config();
mongoose.connect(process.env.DB_URI , { useNewUrlParser: true, useUnifiedTopology: true });
const conn = mongoose.connection;
conn.on('connected', () => {
  console.log('MongoDB connected')
});

// check db is connected or not..
conn.on('error', (err) => {
  if (err) {
    throw err;
  }
});

var Schema = mongoose.Schema; 

var MovieSchema = new Schema({
  "format": [String],
  "visible": Boolean,
  "poster_url": String,
  "title": String,
  "certified": String,
  "language": String,
  "ratings": Number,
  "interested": Number,
  "genre": [String],
  "trailer": String,
  "release_date": String,
  "duration": String,
  "synopsis": String,
  "director": [
    {
      "director_name": String,
      "img": String,
    }
  ],
  "cast": [String],
  "cast_img": [String]
})

var TheatreSchema = new Schema({
  "city" : [String],
  "theatre_name" : String,
  "theatre_id" : String,
  "movies_array" : [String],
  "price": [String],
  "movie_screen" : [{"capacity":Number, "movie_timings" :String}]
  });


var CitySchema = new Schema({
    city: {
      type : String,
      required: true
    }
  });

var UserSchema = new Schema({
  email : { type: String, required: true, unique: true},
  password: { type: String, required: true },
  role: {
    type: String,
    default: 'USER',
    enum: ["USER", "ADMIN"]
  }
});

var Movie = mongoose.model('MovieList', MovieSchema);
var Theatre = mongoose.model('TheatreList', TheatreSchema);
var City = mongoose.model('CityList', CitySchema);
var User =mongoose.model('UserList', UserSchema);

module.exports={
  // This scheduler first delete the all entries and the insert the entry when app run first time.
  City : City,
  Movie: Movie,
  Theatre: Theatre,
  User : User,
  scheduler : async function (moviejson, theatrejson, userjson, citiesjson, callback) {
    await Movie.deleteMany(callback);
    await Theatre.deleteMany(callback);
    await User.deleteMany(callback);
    await City.deleteMany(callback);
    
    await Movie.insertMany(moviejson, callback);
    await Theatre.insertMany(theatrejson, callback);
    await User.insertMany(userjson, callback);
    await City.insertMany(citiesjson, callback);
    
    console.log(`Scheduler Executed Succesfully....`);
  }
}
