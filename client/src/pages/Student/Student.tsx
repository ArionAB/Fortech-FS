import React from "react";
import { Header } from "../../components/header/header";
import "./Student.scss";

const classes: any = [
  "Biology",
  "Geography",
  "Math",
  "History",
  "Chemistry",
  "Art",
];

const Student = () => {
  return (
    <>
      <Header />
      <div className="table">
        <ul className="table-headings">
          <li>Class</li>
          <li>Grades</li>
          <li>Average</li>
        </ul>
        {classes.map((ceva: any) => {
          return ceva;
        })}
      </div>
    </>
  );
};

export default Student;
