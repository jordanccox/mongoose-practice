const mongoose = require("mongoose");

const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/booksandauthors");

const bookSchema = new Schema({
  title: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review"}]
});

const criticSchema = new Schema({
  name: String,
  reviews: [{ type: Schema.Types.ObjectId , ref: "Review" }]
});

const reviewSchema = new Schema({
  text: String,
  book: { type: Schema.Types.ObjectId, ref: "Book"},
  critic: { type: Schema.Types.ObjectId, ref: "Critic" }
});

const Book = mongoose.model("Book", bookSchema);
const Critic = mongoose.model("Critic", criticSchema);
const Review = mongoose.model("Review", reviewSchema);

const critic1 = new Critic({
  name: "Acritic Criticus",
  reviews: []
});

const book1 = new Book({
  title: "The Book",
  reviews: []
});

const review1 = new Review({
  text: "Great book. Would read again",
  book: book1._id,
  critic: critic1._id,
});

// book1.reviews.push(review1);
// critic1.reviews.push(review1);

// review1.save();
// critic1.save();
// book1.save();

// (async function () {
//   try {
//     const myBook = await Book.findOne({title: "The Book"}).populate("reviews");
//     console.log(myBook);
//   } catch (err) {
//     console.error(err);
//   }
// })();

// (async function () {
//   try {
//     const myCritic = await Critic.findOne({ name: "Acritic Criticus"}).populate({
//         path: 'reviews',
//         populate: { path: 'critic'}
//   });
//     console.log(myCritic.reviews[0].critic);
//   } catch (err) {
//     console.error(err);
//   }
// })();

// (async function () {
//   try {
//     const myCritic = await Critic.findOne({ name: "Acritic Criticus"}).populate({
//       path: 'reviews',
//       populate: {
//         path: 'book'
//       }
//     });
//     console.log(myCritic.reviews[0].book);
//   } catch(err) {
//     console.error(err);
//   }
// })();

// (async function () {
//   const myReview = await Review.find({}).populate("critic book");
//   console.log(myReview);
// })();

// (async function () {
//     const myCritic = await Critic.findOne({ name: "Acritic Criticus"}).populate({ path: 'reviews', select: 'text -_id'}).exec();
//     console.log(myCritic);
// })();

(async function () {
  const myCritic = await Critic.findOne({ name: 'Acritic Criticus'});
  console.log(await myCritic.populate('reviews'));
})();