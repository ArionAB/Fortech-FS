import React, { useEffect, useState } from "react";
import "./CatalogTable.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { url } from "../shared";

const CatalogTable = ({ updateData }: { updateData: () => void }) => {
  const [students, setStudents] = useState([]);

  const getStudents = () => {
    axios
      .get(`${url}/catalog/read`)
      .then((res) => {
        console.log(res);
        setStudents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getStudents();
  }, [updateData]);

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div className="table">
      <ul className="table-headings">
        <li>First Name</li>
        <li>Last Name</li>
        <li>Class</li>
      </ul>
      {students?.map((student: any, index: number) => {
        return (
          <Link
            to={`/catalog/${student.__v}`}
            className="student"
            key={student._id}
            style={
              index % 2
                ? { backgroundColor: "transparent" }
                : { backgroundColor: "#e3e3e3" }
            }
          >
            <p>{student.firstName}</p>
            <p>{student.lastName}</p>
            <p>{student.grade}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default CatalogTable;
