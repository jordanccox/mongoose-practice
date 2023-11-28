const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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

async function run(person) {
  await mongoose.connect("mongodb://localhost:27017/peopleDB");

  await person.save();
}

run(david);