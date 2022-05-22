import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
const localemail = localStorage.getItem("email");

const Student = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localemail) {
      alert("You need to be logged in to acces this data!");
      navigate("/");
    }
  }, []);
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
