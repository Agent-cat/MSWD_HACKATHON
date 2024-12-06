require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const authRoutes = require("./routes/auth.routes.js");
const connectDB = require("./database/database.js");
const cors = require("cors");
const projectRoutes = require("./routes/project.routes.js");
app.use(cors());
connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/projects", projectRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
