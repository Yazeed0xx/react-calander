const express = require("express");
const info = require("../models/db");
const router = express.Router();

router.post("/info", async (req, res) => {
  try {
    const newInfo = new info(req.body);
    await newInfo.save();
    res.status(201).json({ message: newInfo });
  } catch (error) {
    res.status(500).json({ error, details: error });
  }
});

router.get("/info", async (req, res) => {
  try {
    const allInfo = await info.find();
    res.status(200).json(allInfo);
  } catch (error) {
    res.status(500).json({ error: "Erroق", details: error });
  }
});
router.delete("/info/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedInfo = await info.findByIdAndDelete(id);

    if (!deletedInfo) {
      return res.status(404).json({ message: "Info not found" });
    }

    res.status(200).json({ message: "Info deleted successfully", deletedInfo });
  } catch (error) {
    res.status(500).json({ error: "Error deleting info", details: error });
  }
});

module.exports = router;
