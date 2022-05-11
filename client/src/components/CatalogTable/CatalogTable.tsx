import React, { useEffect, useState } from "react";
import "./CatalogTable.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { url } from "../shared";
import { ReactComponent as Delete } from "../../assets/trash.svg";
import { ReactComponent as Edit } from "../../assets/edit.svg";
import DeleteStudent from "../Modals/deleteStudent/DeleteStudent";

const CatalogTable = ({ updateData }: { updateData: () => void }) => {
  const [students, setStudents] = useState([]);
  const [selectedForDelete, setSelectedForDelete] = useState("");
  const [show, setShow] = useState<boolean>(false);

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

  const CloseDelete = () => setShow(false);

  return (
    <div className="table">
      <ul className="table-headings">
        <li>First Name</li>
        <li>Last Name</li>
        <li>Class</li>
      </ul>

      {students?.map((student: any, index: number) => {
        return (
          <div className="table-student">
            <Link
              to={`/catalog/${student._id}`}
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
            <Edit className="edit-student" />
            <Delete
              className="delete-student"
              onClick={() => {
                setSelectedForDelete(student._id);
                setShow(true);
              }}
            />
            {show ? (
              <DeleteStudent
                id={student._id}
                selectedID={selectedForDelete}
                first={student.firstName}
                last={student.lastName}
                handleClose={CloseDelete}
              />
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CatalogTable;
