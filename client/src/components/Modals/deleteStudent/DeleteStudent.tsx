import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../../shared";
import { useDeleteStudent } from "../../hooks/useDeleteStudent";

import "./DeleteStudent.scss";

const DeleteStudent = ({
  id,
  selectedID,
  first,
  last,
  handleClose,
  isDeleted,
}: {
  id: string;
  selectedID: string;
  first: string;
  last: string;
  handleClose: () => void;
  isDeleted: () => void;
}) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
  }, []);

  useDeleteStudent(selectedID, isDeleted, ready);

  /*   const deleteStudent = () => {
    axios
      .delete(`${url}/delete/${selectedID}`)
      .then((res) => (res.data === "Deleted" ? isDeleted() : ""));
  }; */
  //     <button onClick={() => deleteStudent()}>Delete</button>
  return (
    <div
      style={id === selectedID ? { display: "block" } : { display: "none" }}
      className="delete-modal"
    >
      <p> {`Are you sure you want to delete ${first} ${last}?`}</p>

      <div className="Delete-yes-no">
        <button onClick={() => setReady(true)}>Delete</button>
        <button onClick={() => handleClose()}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteStudent;
