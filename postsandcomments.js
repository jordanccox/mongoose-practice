const mongoose = require("mongoose");

const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/test");

// Define schemas 
const commentSchema = new Schema({
  text: { type: String, required: true },
  username: { type: String, required: true }
})

const postSchema = new Schema({
  text: { type: String, required: true },
  username: { type: String, required: true },
  comments: [commentSchema || null]
});

// Create Post and Comment models
const Post = mongoose.model("Post", postSchema);
const Comment = mongoose.model("Comment", commentSchema);

// Create Post instance
const newPost = new Post({
  text: "Hello, this is my new post!",
  username: "jordan123",
  comments: []
});

(async function () { // used only at start of program, then removed function call
  await newPost.save();
  console.log("Post saved!")
});

// Create a new comment and add to new post
const newComment = new Comment({
  text: "This is a great post!",
  username: "notjordan123"
});

(async function () {
  try {
    const post = await Post.findOne({ _id: '65688bdfd2b39eeacafecd2f'});
    post.comments.push(newComment);
    await post.save();
    const postWithComment = await Post.findOne({ _id: '65688bdfd2b39eeacafecd2f' });
    console.log(postWithComment);
  } catch(err) {
    console.log(err);
  }
})();