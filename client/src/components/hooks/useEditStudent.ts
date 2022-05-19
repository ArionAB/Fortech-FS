import { useState } from "react";
import { IEditStudent } from "../types/editStudent";
import { editStudent } from "../service/studentService";

export const useEditStudent = (isEdit: () => void) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const EditStudent = async (edit: IEditStudent) => {
    try {
      setIsError(false);
      setIsLoading(true);
      await editStudent(edit, isEdit);
    } catch (err) {
      console.error(err);
      setIsError(true);
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    isError,
    EditStudent,
  };
};
