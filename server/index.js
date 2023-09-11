const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const { mongoose } = require("mongoose");
const userRoute = require("./routes/user");
dotenv.config();

const port = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute);

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected!"))
  .catch((err) => console.log(err));
