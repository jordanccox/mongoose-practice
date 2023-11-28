const mongoose = require("mongoose");
const Beer = require("./beers.js").Beer;

mongoose.connect("mongodb://localhost:27017/beersDB");

(async () => {
  const queryAll = await Beer.find({ _id: '6565eb3695abddc23fdc1e0c' }).exec();

  console.log(queryAll);
})();