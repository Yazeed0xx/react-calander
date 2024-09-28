const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
const infoRoutes = require("./routes/events");
const path = require("path");

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "vite-project/build")));

// Handle any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/vite-project/build/index.html"));
});

mongoose
  .connect(
    "mongodb+srv://yazeedthunyan:4Iu4fKvJpprQSYxn@cluster0.b9xpn.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api", infoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port  ${PORT}`);
});
