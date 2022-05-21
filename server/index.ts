import express from "express";
import mongoose from "mongoose";
import CatalogModel from "../server/models/Catalog";
import StudentModel from "../server/models/Student";
import User from "./models/User";
import cors from "cors";
import jwt from "jsonwebtoken";

const port = 5000;
const app = express();
app.use(cors());
app.use(express.json()); //middleware that allows us to recieve data from the frontend in json format

//user auth

app.post("/register", async (req, res) => {
  const { email, password, rank } = req.body;

  try {
    const user = await User.create({
      email: email,
      password: password,
      rank: rank,
    });
    res.send({ user, status: 200 });
  } catch (err) {
    res.send({ status: 400, error: "Duplicate email" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email: email,
    password: password,
  });

  /*   if (user) {
    const token = jwt.sign(
      {
        email: email,
        rank: rank,
      },
      "randomString123"
    );
 */
  res.send({ status: 200, user: user });
});

//Create
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
//Read
/* app.post("/catalog/search", (req, res) => {
  console.log("*******", req.body.search.text);
  StudentModel.find(
    { firstName: req.body.search.text.trim() },
    (err: any, result: any) => {
      //trim()to remove extra space from beggining and end
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send(result);
    }
  );
  // StudentModel.find({$where: {firstName: "orice nume"}}, ) this is to fetch certain data
}); */

app.post("/catalog/read", async (req, res) => {
  const query = req.body.search;
  console.log(req.body);
  let catalog = await StudentModel.find({});
  let students: any[] = [];
  catalog.map((stud: any) => {
    const filteredStudents = stud.firstName.includes(query);
    if (filteredStudents) {
      students.push(stud);
    }
  });
  if (query) {
    res.status(200).send(students);
  } else res.status(200).send(catalog);
});

/* app.get("/catalog/read", (req, res) => {
  StudentModel.find({}, (err: any, result: any) => {
    if (err) {
      res.send(err);
    }
    res.status(200).send({ msg: "Catalog fetched", data: result });
  });
  // StudentModel.find({$where: {firstName: "orice nume"}}, ) this is to fetch certain data
}); */

interface IUpdateStudent {
  firstName: string;
  lastName: string;
  grade: number;
  id: string;
  save: () => void;
}
//Update
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
//Delete
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
