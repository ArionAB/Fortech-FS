import React from "react";
import "./DeleteStudent.scss";

const DeleteStudent = ({
  id,
  selectedID,
  first,
  last,
  handleClose,
}: {
  id: any;
  selectedID: any;
  first: string;
  last: string;
  handleClose: () => void;
}) => {
  return (
    <div
      style={id === selectedID ? { display: "block" } : { display: "none" }}
      className="delete-modal"
    >
      <p> {`Are you sure you want to delete ${first} ${last}?`}</p>

      <div className="Delete-yes-no">
        <button>Delete</button>
        <button onClick={() => handleClose()}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteStudent;
