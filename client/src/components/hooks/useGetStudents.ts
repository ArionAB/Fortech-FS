import { useEffect, useState } from "react";
import { IStudent } from "../types/getStudents";
import { getStudents } from "../service/studentService";

export const UseGetStudents = (
  updateData: () => void,
  edit: boolean,
  deleted: boolean
) => {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getStudentsReq = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (err) {
      console.error(err);
      setIsError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getStudentsReq();
  }, [updateData]);

  useEffect(() => {
    if (edit) {
      getStudentsReq();
    } else return;
  }, [edit]);

  useEffect(() => {
    if (deleted) {
      getStudentsReq();
    } else return;
  }, [deleted]);

  return {
    students,
    isLoading,
    isError,
  };
};
