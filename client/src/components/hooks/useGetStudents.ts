import { useEffect, useState, useContext } from "react";
import { IStudent } from "../types/getStudents";
import { GetStudents } from "../service/studentService";
import { SearchContext } from "../Context/searchContext";
import { ClasaContext } from "../Context/filterClassContext";

export const UseGetStudents = (
  updateData: () => void,
  edit: boolean,
  deleted: boolean
) => {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const search = useContext(SearchContext);
  const clasa = useContext(ClasaContext);

  const getStudentsReq = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const data = await GetStudents(search.searchVal, clasa.filterVal);
      setStudents(data);
    } catch (err) {
      console.error(err);
      setIsError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getStudentsReq();
  }, [clasa.filterVal]);

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
