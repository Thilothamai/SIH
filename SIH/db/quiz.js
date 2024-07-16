let mongoose = require("mongoose");

let model = new mongoose.Schema({
  department: String,
  questions: Array,
  syllabus: String,
  books: String,
  materials: String,
  video: String,
});

module.exports = mongoose.model("quizzes", model)