const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://yazeedthunyan:4Iu4fKvJpprQSYxn@cluster0.b9xpn.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("db connected"));

const test = require("./routes/events");
app.use("/", test);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
