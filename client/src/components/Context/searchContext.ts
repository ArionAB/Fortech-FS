import { createContext } from "react";

export type GlobalContent = {
  searchVal: string;
  setSearchVal: (c: string) => void;
};

export const SearchContext = createContext<GlobalContent>({
  searchVal: "",
  setSearchVal: () => {},
});
