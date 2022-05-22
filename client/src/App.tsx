import React, { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpSignIn from "./pages/SignUpSignIn/SignUpSignIn";
import Catalog from "./pages/Catalog/Catalog";
import Student from "./pages/Student/Student";
import { SearchContext } from "./components/Context/searchContext";
import { ClasaContext } from "./components/Context/filterClassContext";
import { SortContext } from "./components/Context/sortContext";
import "./styles.scss";

function App() {
  const [searchVal, setSearchVal] = useState("");
  const [filterVal, setFilterVal] = useState("");
  const [sortVal, setSortVal] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUpSignIn />}></Route>
        <Route path="/register" element={<SignUpSignIn />}></Route>

        <Route
          path="/catalog"
          element={
            <SortContext.Provider value={{ sortVal, setSortVal }}>
              <ClasaContext.Provider value={{ filterVal, setFilterVal }}>
                <SearchContext.Provider value={{ searchVal, setSearchVal }}>
                  <Catalog />
                </SearchContext.Provider>
              </ClasaContext.Provider>
            </SortContext.Provider>
          }
        ></Route>

        <Route path="/catalog/:id" element={<Student />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
