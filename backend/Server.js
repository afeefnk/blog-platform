const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const cors = require('cors')

dotenv.config();
const app = express();

// Middleware

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Routes
app.use("/api", authRoutes);
app.use("/api", postRoutes);

app.listen(process.env.PORT || 9012, () => {
  console.log("Server is connected ...");
});
