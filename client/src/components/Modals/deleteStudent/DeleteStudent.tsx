import React, { useState } from "react";
import axios from "axios";
import { url } from "../../shared";

import "./DeleteStudent.scss";

const DeleteStudent = ({
  id,
  selectedID,
  first,
  last,
  handleClose,
  isDeleted,
}: {
  id: any;
  selectedID: any;
  first: string;
  last: string;
  handleClose: () => void;
  isDeleted: () => void;
}) => {
  const deleteStudent = () => {
    axios
      .delete(`${url}/delete/${selectedID}`)
      .then((res) => (res.data === "Deleted" ? isDeleted() : ""));
  };

  return (
    <div
      style={id === selectedID ? { display: "block" } : { display: "none" }}
      className="delete-modal"
    >
      <p> {`Are you sure you want to delete ${first} ${last}?`}</p>

      <div className="Delete-yes-no">
        <button onClick={() => deleteStudent()}>Delete</button>
        <button onClick={() => handleClose()}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteStudent;
