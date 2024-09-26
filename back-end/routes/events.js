const express = require("express");
const router = express.Router();
const info = require("../models/db");

const { getEvents } = require("../contrrolers/events");

router.get("/", getEvents);

router.post("/info", async (req, res) => {
  try {
    if (
      !req.body.person ||
      !req.body.second ||
      !req.body.title ||
      !req.body.start ||
      !req.body.end
    ) {
      return res.status(400).end({
        message: "all field reqiured",
      });
    }
    const newEvent = {
      person: req.body.person,
      second: req.body.second,
      title: req.body.title,
      start: req.body.start,
      end: req.body.end,
    };

    const event = await info.create(newEvent);
    return res.status(201).send(event);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
