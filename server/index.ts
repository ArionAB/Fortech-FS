const express = require("express");
const mongoose = require("mongoose");
const app = express();

const CatalogModel = require("./server/models/Catalog");

const port = 5000;

app.use(express.json()); //middleware that allows us to recieve data from the frontend in json format
app.get("/", async (req, res) => {
  const catalog = new CatalogModel({ className: "Biology", grades: 10 });
  try {
    await catalog.save();
  } catch (err) {
    console.log(err);
  }
});

mongoose.connect(
  "mongodb+srv://Arion:mancare@mern.jvjq5.mongodb.net/catalog?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
