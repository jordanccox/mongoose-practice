const mongoose = require("mongoose");

const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/peopleDB");

const addressSchema = new Schema({
  city: { type: String, required: true },
  street: { type: String, required: true },
  apartment: Number
});


const personSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  address: addressSchema
});

const Person = mongoose.model("Person", personSchema);

const david = new Person({
  firstName: "David",
  lastName: "Smith",
  age: 25,
  address: {
    city: "New York City",
    street: "Main St.",
    apartment: 123
  }
});

const katherine = new Person({
  firstName: "Katherine",
  lastName: "Arons",
  age: 26,
  address: {
    city: "Fort Collins",
    street: "Mulberry St",
    apartment: 345
  }
});

const joe = new Person({
  firstName: "Joe",
  lastName: "West",
  age: 31,
  address: {
    city: "Greeley",
    street: "24th St",
    apartment: 678
  }
});

async function addToDB(person) {
  await person.save();
}

async function query(person) {
  const found = await Person.find({ age: {$lte: 31, $gt: 25 } }).exec();

  console.log(found);
};

// addToDB(joe);
//addToDB(katherine);
query();