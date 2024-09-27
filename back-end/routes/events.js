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

module.exports = router;
