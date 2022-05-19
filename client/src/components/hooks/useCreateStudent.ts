import { useState } from "react";
import { ICreateStudent } from "../types/createStudent";
import { addStudent } from "../service/studentService";

export const useCreateStudent = (updateData: () => void) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const CreateStudent = async (add: ICreateStudent) => {
    try {
      setIsError(false);
      setIsLoading(true);
      await addStudent(add, updateData);
    } catch (err) {
      console.error(err);
      setIsError(true);
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    isError,
    CreateStudent,
  };
};
