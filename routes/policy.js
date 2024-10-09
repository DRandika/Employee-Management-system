const express = require("express");
const router = express.Router();
const Policy = require("../models/policy");

// Create a new policy
router.post("/", async (req, res) => {
  try {
    const { title, sections } = req.body; // Destructure sections from the body
    const newPolicy = new Policy({ title, sections });
    await newPolicy.save();
    res.status(201).send({ message: "Policy created successfully", policy: newPolicy });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error: error.message });
  }
});

// Get all policies
router.get("/", async (req, res) => {
  try {
    const policies = await Policy.find();
    res.status(200).send(policies);
  } catch (error) {
    res.status(500).send({ message: "Error fetching policies", error: error.message });
  }
});

// Delete a policy by ID
router.delete("/:id", async (req, res) => {
  try {
    const policy = await Policy.findByIdAndDelete(req.params.id);
    if (!policy) return res.status(404).send({ message: "Policy not found" });
    res.status(200).send({ message: "Policy deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = router;

