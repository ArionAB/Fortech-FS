import React, { useState } from "react";
import { ReactComponent as X } from "../../../assets/x.svg";
import "./addStudent.styles.scss";

const AddStudent = ({ handleClose }: { handleClose: () => void }) => {
  return (
    <div className="add-student">
      <div className="add-student-title">
        <h1 className="add-title">Add a new student</h1>
        <X className="add-student-close " onClick={() => handleClose()} />
      </div>

      <form action="" className="add-student-form">
        <label>
          Name
          <input type="text" placeholder="name" />
        </label>
        <button type="submit" className="add-submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
