import { createContext } from "react";

export type GlobalSort = {
  sortVal: string;
  setSortVal: (c: string) => void;
};

export const SortContext = createContext<GlobalSort>({
  sortVal: "",
  setSortVal: () => {},
});
