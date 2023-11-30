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
  address: addressSchema,
  updated_at: Date,
  created_at: Date
});

// pre save
personSchema.pre("save", function (next) {
  const currentDate = new Date();

  this.updated_at = currentDate;

  if (!this.created_at) {
    this.created_at = currentDate;
  }

  next();
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

const guy = new Person({
  firstName: "Guy",
  lastName: "Jones",
  age: 34,
  address: {
    city: "Miami",
    street: "Main St.",
    apartment: 321
  }
});

const ronald = new Person({
  firstName: "Ronald",
  lastName: "Brogan",
  age: 56,
  address: {
    city: "Washington DC",
    street: "Main St.",
    apartment: 413
  }
});

async function addToDB(person) {
  try { 
    await person.save();
    const found = await Person.find({ firstName: person.firstName });
    console.log(found);
  } catch (err) {
    console.log(err);
  } 
}

async function query(person) {
  const found = await Person.find({ age: {$lte: 31, $gt: 25 } }).exec();

  console.log(found);
};

// Find one and update

const findOneAndUpdate = async function () {
  try {
    await Person.findOneAndUpdate({ firstName: "Ronald"}, { lastName: "Reagan"} ); // pre save is not executed before findOneAndUpdate
  } catch (err) {
    console.log(err);
  }
};

// traditional method of finding and saving
const findandsave = async function () {
  try {
    const doc = await Person.findById('65672260cbff7fda1edb5029');
    doc.firstName = 'Jorge';
    await doc.save();
  } catch (err) {
    console.log(err);
  }
};

// Find one and remove

(async function () {
  try {
    const deleted = await Person.findOneAndDelete({ firstName: "Bro"});
    console.log(deleted);
  } catch (err) {
    console.log(err);
  }
});

(async function () {
  try {
    const found = await Person.findById('65672260cbff7fda1edb5029');
    console.log(found);
  } catch (err) {
    console.log(err);
  }
});