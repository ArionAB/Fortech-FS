import express from "express";
import mongoose from "mongoose";
const app = express();
import CatalogModel from "../server/models/Catalog";
import StudentModel from "../server/models/Student";
import cors from "cors";

const port = 5000;

app.use(cors());
app.use(express.json()); //middleware that allows us to recieve data from the frontend in json format

app.post("/catalog", async (req, res) => {
  const { firstName, lastName, grade } = req.body;
  const student = new StudentModel({
    firstName: firstName,
    lastName: lastName,
    grade: grade,
  });
  try {
    await student.save();
    res.send("Data added");
  } catch (err) {
    console.log(err);
  }
});

app.get("/catalog/read", (req, res) => {
  StudentModel.find({}, (err: any, result: any) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
  // StudentModel.find({$where: {firstName: "orice nume"}}, ) this is to fetch certain data
});

interface IUpdateStudent {
  firstName: string;
  lastName: string;
  grade: number;
  id: string;
  save: () => void;
}

app.put("/updateStudent", async (req, res) => {
  const { firstName, lastName, grade, id } = req.body;

  try {
    await StudentModel.findById(
      id,
      (err: any, updatedStudent: IUpdateStudent) => {
        updatedStudent.firstName = firstName;
        updatedStudent.lastName = lastName;
        updatedStudent.grade = grade;
        updatedStudent.save();
        res.send("updated succesfully");
      }
    );
  } catch (err) {
    console.log(err);
  }
});

app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await StudentModel.findByIdAndRemove(id).exec();
  res.send("Deleted");
});

mongoose.connect(
  "mongodb+srv://Arion:mancare@mern.jvjq5.mongodb.net/catalog?retryWrites=true&w=majority"
);

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
