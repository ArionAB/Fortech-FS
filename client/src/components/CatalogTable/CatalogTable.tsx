import React, { useEffect, useState } from "react";
import "./CatalogTable.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { url } from "../shared";
import { ReactComponent as Delete } from "../../assets/trash.svg";
import { ReactComponent as Edit } from "../../assets/edit.svg";
import DeleteStudent from "../Modals/deleteStudent/DeleteStudent";
import EditStudent from "../Modals/EditStudent/EditStudent";

const CatalogTable = ({ updateData }: { updateData: () => void }) => {
  const [students, setStudents] = useState([]);
  const [selectedForDelete, setSelectedForDelete] = useState("");
  const [selectedForEdit, setSelectedForEdit] = useState("");
  const [show, setShow] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [edit, setEdit] = useState(false);

  const getStudents = () => {
    axios
      .get(`${url}/catalog/read`)
      .then((res) => {
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

  useEffect(() => {
    if (edit) {
      getStudents();
    } else return;
  }, [edit]);

  useEffect(() => {
    if (deleted) {
      getStudents();
    } else return;
  }, [deleted]);

  const isDeleted = () => setDeleted(true);

  const isEdited = () => setEdit(true);

  const CloseDelete = () => setShow(false);

  const CloseEditModal = () => setShowEdit(false);

  return (
    <div className="table">
      <ul className="table-headings">
        <li>First Name</li>
        <li>Last Name</li>
        <li>Class</li>
      </ul>

      {students?.map((student: any, index: number) => {
        return (
          <div className="table-student" key={student._id}>
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
            <Edit
              className="edit-student"
              onClick={() => {
                setShowEdit(true);
                setSelectedForEdit(student._id);
              }}
            />
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
                isDeleted={isDeleted}
              />
            ) : (
              ""
            )}
            {showEdit && (
              <EditStudent
                updateData={getStudents}
                handleClose={CloseEditModal}
                id={student._id}
                selectedID={selectedForEdit}
                first={student.firstName}
                last={student.lastName}
                clasa={student.grade}
                isEdit={isEdited}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CatalogTable;
