const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const { mongoose } = require("mongoose");
dotenv.config();

const port = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected!"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
