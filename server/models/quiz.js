const mongoose = require("mongoose");

// Schema for individual quiz
const quizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
  answers: {
    type: [String],
    required: true,
  },
});

// Schema for quiz section
const quizSectionSchema = new mongoose.Schema({
  sectionTitle: {
    type: String,
    required: true,
  },
  totalMarks: {
    type: Number, // Add this field for the total marks (default to 100)
    default: 100,
  },
  quizzes: [quizSchema], // An array of quizzes in each section
});

const QuizSection = mongoose.model("QuizSection", quizSectionSchema);
module.exports = QuizSection;
