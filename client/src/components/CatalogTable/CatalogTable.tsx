import React, { useEffect, useState } from "react";
import "./CatalogTable.scss";
import { Link } from "react-router-dom";

import { url } from "../shared";
import { ReactComponent as Delete } from "../../assets/trash.svg";
import { ReactComponent as Edit } from "../../assets/edit.svg";
import DeleteStudent from "../Modals/deleteStudent/DeleteStudent";
import EditStudent from "../Modals/EditStudent/EditStudent";
import { useGetStudents } from "../hooks/useGetStudents";

const CatalogTable = ({ updateData }: { updateData: () => void }) => {
  const [selectedForDelete, setSelectedForDelete] = useState("");
  const [selectedForEdit, setSelectedForEdit] = useState("");
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [edit, setEdit] = useState(false);

  const rank = localStorage.getItem("rank");

  const { isLoading, isError, students } = useGetStudents(
    updateData,
    edit,
    deleted
  );

  const isDeleted = () => setDeleted(true);

  //we have to set delete to false otherwise on the second delete
  // we have to refresh because deleted is already true
  useEffect(() => {
    if (deleted) {
      setDeleted(false);
    } else return;
  }, [deleted]);

  //same like for delete
  useEffect(() => {
    if (edit) {
      setEdit(false);
    } else return;
  }, [edit]);

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
              style={
                rank === "profesor"
                  ? { position: "absolute" }
                  : { display: "none" }
              }
              className="edit-student"
              onClick={() => {
                setShowEdit(true);
                setSelectedForEdit(student._id);
              }}
            />
            <Delete
              style={
                rank === "profesor"
                  ? { position: "absolute" }
                  : { display: "none" }
              }
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
