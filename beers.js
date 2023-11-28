const mongoose = require("mongoose");

const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/beersDB");

const beerSchema = new Schema({
  name: { type: String, required: true },
  abv: { type: Number, required: true },
  style: { type: String, required: true }
});

const Beer = mongoose.model("Beer", beerSchema);

const samAdamsIPA = new Beer({
  name: "Sam Adams IPA",
  abv: 5.93,
  style: "IPA"
});

samAdamsIPA.save();

module.exports.Beer = Beer;