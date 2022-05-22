import { createContext } from "react";

export type GlobalClasa = {
  filterVal: string;
  setFilterVal: (c: string) => void;
};

export const ClasaContext = createContext<GlobalClasa>({
  filterVal: "",
  setFilterVal: () => {},
});
