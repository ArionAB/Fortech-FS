import axios from "axios";
import React, { useState, useEffect } from "react";
import { url } from "../../shared";

import { ReactComponent as X } from "../../../assets/x.svg";

import "./EditStudent.styles.scss";

const EditStudent = ({
  id,
  selectedID,
  first,
  last,
  clasa,
  handleClose,
  isEdit,
}: {
  handleClose: () => void;
  isEdit: () => void;
  id: string;
  selectedID: string;
  first: string;
  last: string;
  clasa: number;
}) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState("");
  const [grade, setGrade] = useState<number>(9);

  useEffect(() => {
    setFirstName(first);
    setLastName(last);
    setGrade(clasa);
  }, [first, last, clasa]);

  const updateStudent = (e: any) => {
    e.preventDefault();

    axios
      .put(`${url}/updateStudent`, {
        id: selectedID,
        firstName: firstName,
        lastName: lastName,
        grade: grade,
      })
      .then((res) => (res.data === "updated succesfully" ? isEdit() : ""));
  };

  return (
    <div
      className="add-student"
      style={id === selectedID ? { display: "block" } : { display: "none" }}
    >
      <div className="add-student-title">
        <h1 className="add-title">{`Edit ${first} ${last}`}</h1>
        <X className="add-student-close " onClick={() => handleClose()} />
      </div>

      <form className="add-student-form">
        <label>
          <p>First Name</p>

          <input
            type="text"
            placeholder="John"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
        </label>
        <label>
          <p> Last Name</p>

          <input
            type="text"
            placeholder="Cena"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </label>
        <label htmlFor="">
          <p> Class</p>

          <select
            value={grade}
            onChange={(e) => setGrade(Number(e.target.value))}
          >
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
        </label>
        <button
          type="button"
          className="edit-submit"
          onClick={(e) => {
            handleClose();
            updateStudent(e);
          }}
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditStudent;
