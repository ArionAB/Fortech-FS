import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { url } from "../../shared";
import { UseGetStudents } from "../../hooks/useGetStudents";
import CatalogTable from "../../CatalogTable/CatalogTable";
import App from "../../../App";
import Catalog from "../../../pages/Catalog/Catalog";

export const Context = createContext("");

const Search = () => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .post(`${url}/catalog/read`, {
        search: search,
      })
      .then((res) => console.log(res));
  }, [search]);

  return (
    <Context.Provider value="salut">
      {/* <UseGetStudents />
      <CatalogTable /> */}
      <Catalog />

      <label className="search-label">
        <input
          type="text"
          placeholder="Search by name"
          onChange={(e) => setSearch(e.target.value)}
          value={search || ""}
        />
      </label>
    </Context.Provider>
  );
};

export default Search;
