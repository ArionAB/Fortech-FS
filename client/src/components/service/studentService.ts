import axios from "axios";
import { ICreateStudent } from "../types/createStudent";
import { IStudent } from "../types/getStudents";
import { IStudentDelete } from "../types/deleteStudent";
import { IEditStudent } from "../types/editStudent";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

export const getStudents = async () => {
  const { data } = await axiosInstance.get<IStudent[]>("/catalog/read");
  return data;
};

export const deleteStudent = async (id: string) => {
  const { data } = await axiosInstance.delete<IStudentDelete>(`/delete/${id}`);
  return data;
};

export const addStudent = async (
  add: ICreateStudent,
  updateData: () => void
) => {
  const { data } = await axiosInstance.post<ICreateStudent>(`/catalog`, add);
  if (data) {
    updateData();
  }
  return data;
};

export const editStudent = async (edit: IEditStudent, isEdit: () => void) => {
  console.log(edit);
  const { data } = await axiosInstance.put<IEditStudent>(
    `/updateStudent`,
    edit
  );
  if (data) {
    isEdit();
  }
  return data;
};
