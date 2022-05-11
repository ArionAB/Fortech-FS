import React from "react";
import "./CatalogTable.scss";
import { Link } from "react-router-dom";

const CatalogTable = () => {
  interface IStudents {
    name: string;
    lastName: string;
    class: number;
    id: number;
  }
  const students: IStudents[] = [
    { name: "Gabriel", lastName: "Popescu", class: 9, id: 1 },
    { name: "Razvan", id: 2, lastName: "Popa", class: 10 },
    { name: "Cipri", id: 3, lastName: "Radu", class: 11 },
  ];
  return (
    <div className="table">
      <ul className="table-headings">
        <li>First Name</li>
        <li>Last Name</li>
        <li>Class</li>
      </ul>
      {students.map((student: any, index: number) => {
        return (
          <Link
            to={`/catalog/${student.id}`}
            className="student"
            key={student.id}
            style={
              index % 2
                ? { backgroundColor: "transparent" }
                : { backgroundColor: "#e3e3e3" }
            }
          >
            <p>{student.lastName}</p>
            <p>{student.name}</p>
            <p>{student.class}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default CatalogTable;
