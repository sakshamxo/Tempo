const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/weatherapp');

var userSchema = mongoose.Schema({
  id: Number,
  name: String,
  state: String,
country: String,
  coord : {
      lon : Number,
     lat : Number
  }
})

module.exports = mongoose.model('user',userSchema)
