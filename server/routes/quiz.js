const express = require("express");
const router = express.Router();
const QuizSection = require("../models/quiz");

// Create a new quiz section with quizzes
router.post("/", async (req, res) => {
  try {
    const { sectionTitle, quizzes } = req.body;
    const newSection = new QuizSection({ sectionTitle, quizzes });
    await newSection.save();
    res.status(201).send({ message: "Section and quizzes created successfully", section: newSection });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error: error.message });
  }
});

// Get all quiz sections with quizzes
router.get("/", async (req, res) => {
  try {
    const sections = await QuizSection.find();
    res.status(200).send(sections);
  } catch (error) {
    res.status(500).send({ message: "Error fetching quizzes", error: error.message });
  }
});

// Delete a quiz section by ID
router.delete("/:id", async (req, res) => {
  try {
    const section = await QuizSection.findByIdAndDelete(req.params.id);
    if (!section) return res.status(404).send({ message: "Section not found" });
    res.status(200).send({ message: "Section deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = router;
