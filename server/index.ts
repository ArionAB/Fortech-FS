import express from "express";
import mongoose from "mongoose";
import CatalogModel from "../server/models/Catalog";
import StudentModel from "../server/models/Student";
import User from "./models/User";
import cors from "cors";
import jwt from "jsonwebtoken";
import Catalog from "../server/models/Catalog";

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
    res.send({ status: 400, error: "Email already exists" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      email: email,
      password: password,
    });
    if (user) {
      res.send({ status: 200, user: user });
    } else res.send({ status: 400, err: "Incorrect email or password" });
  } catch (err) {
    res.send({ status: 400, user: err });
  }

  /*   if (user) {
    const token = jwt.sign(
      {
        email: email,
        rank: rank,
      },
      "randomString123"
    );
 */
});

app.post("/grades", async (req, res) => {
  const { userID, className, grades } = req.body;

  try {
    const marks = await CatalogModel.create({
      userID: userID,
      className: className,
      grades: grades,
    });
    res.send({ marks, status: 200 });
  } catch (err) {
    res.send({ status: 400, error: err });
  }
});

app.post("/grades/get", async (req, res) => {
  const { id } = req.body;
  let catalog = await CatalogModel.find({});
  let grades: string[] = [];

  catalog.map((stud: any) => {
    const filterById = stud.userID === id;
    if (filterById) {
      grades.push(stud);
    }
  });
  if (id) {
    res.status(200).send(grades);
  } else res.status(200).send("Nothing to fetch");
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
/* app.post("/catalog", async (req, res) => {
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
}); */

//Read
app.post("/catalog/read", async (req, res) => {
  const { clasa, search } = req.body;

  let catalog = await StudentModel.find({});
  let students: any[] = [];

  catalog.map((stud: any) => {
    const filteredStudents = stud.firstName.includes(
      search.charAt(0).toUpperCase() + search.slice(1)
    );
    const filterClass = stud.grade === Number(clasa);

    if (clasa && search) {
      if (filteredStudents && filterClass) {
        students.push(stud);
      }
    }
    if (clasa && !search) {
      if (filterClass) {
        students.push(stud);
        return;
      }
    } else if (filteredStudents) {
      students.push(stud);
    }
  });
  if (search || (search && clasa) || (!search && clasa)) {
    res.status(200).send(students);
  } else res.status(200).send(catalog);
});

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
