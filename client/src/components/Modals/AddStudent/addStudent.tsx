import React, { useState, useEffect } from "react";
import { ReactComponent as X } from "../../../assets/x.svg";
import { useCreateStudent } from "../../hooks/useCreateStudent";

import "./addStudent.styles.scss";

const AddStudent = ({
  handleClose,
  updateData,
}: {
  handleClose: () => void;
  updateData: () => void;
}) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [grade, setGrade] = useState<number>(9);

  const { isError, isLoading, CreateStudent } = useCreateStudent(updateData);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await CreateStudent({
      firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
      lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
      grade,
    });

    /*     axios
      .post(`${url}/catalog`, {
        firstName: firstName,
        lastName: lastName,
        grade: grade,
      })
      .then((res) => (res.data === "Data added" ? updateData() : "")); */
  };

  return (
    <div className="add-student">
      <div className="add-student-title">
        <h1 className="add-title">Add a new student</h1>
        <X className="add-student-close " onClick={() => handleClose()} />
      </div>

      <form onSubmit={handleSubmit} className="add-student-form">
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
        <button type="submit" className="add-submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
