import React, { useState, useContext, createContext } from "react";
import CatalogTable from "../../components/CatalogTable/CatalogTable";
import Search from "../../components/Filters/Search/Search";
import { Header } from "../../components/header/header";
import AddStudent from "../../components/Modals/AddStudent/addStudent";
import { Context } from "../../components/Filters/Search/Search";
import "./catalog.styles.scss";

const Catalog = (props: any) => {
  console.log(props);
  const [show, setShow] = useState<boolean>(false);
  const [updateCatalog, setUpdateCatalog] = useState<boolean>(false);

  const rank = localStorage.getItem("rank");

  const closeModal = () => {
    setShow(false);
  };

  const getSearchValue = (val: string) => {
    console.log(val);
  };

  const updateData = () => {
    setUpdateCatalog(true);
  };

  const value = useContext(Context);
  console.log(value);
  return (
    <>
      <Header />
      <main className="catalog">
        <div className="title">
          <h1 className="catalog-title">Catalog</h1>

          {rank === "profesor" ? (
            <button onClick={() => setShow(true)}>Add student</button>
          ) : (
            ""
          )}

          {show ? (
            <AddStudent handleClose={closeModal} updateData={updateData} />
          ) : (
            ""
          )}
        </div>
        <div className="filter-section">
          {/* <Search value={getSearchValue}/> */}
        </div>
        <CatalogTable updateData={updateData} />
      </main>
    </>
  );
};

export default Catalog;
