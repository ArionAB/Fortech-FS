import { useEffect, useState } from "react";
import { IStudentDelete } from "../types/deleteStudent";
import { deleteStudent } from "../service/studentService";

export const useDeleteStudent = (
  id: string,
  isDeleted: () => void,
  ready: boolean
) => {
  const deleteStudentReq = async () => {
    try {
      await deleteStudent(id);

      isDeleted();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (ready) {
      deleteStudentReq();
    } else return;
  }, [ready]);
};
