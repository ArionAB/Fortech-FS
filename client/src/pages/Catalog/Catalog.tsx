import React, { useState, useEffect, useContext } from "react";
import CatalogTable from "../../components/CatalogTable/CatalogTable";
import Search from "../../components/Filters/Search/Search";
import { Header } from "../../components/header/header";
import AddStudent from "../../components/Modals/AddStudent/addStudent";
import { useNavigate } from "react-router-dom";

import "./catalog.styles.scss";
import { ClasaContext } from "../../components/Context/filterClassContext";

const Catalog = (props: any) => {
  console.log(props);
  const [show, setShow] = useState<boolean>(false);
  const [updateCatalog, setUpdateCatalog] = useState<boolean>(false);

  const navigate = useNavigate();
  const rank = localStorage.getItem("rank");
  const email = localStorage.getItem("email");

  useEffect(() => {
    if (!email) {
      alert("You need to be logged in to acces this data!");
      navigate("/");
    }
  }, []);

  const closeModal = () => {
    setShow(false);
  };

  const updateData = () => {
    setUpdateCatalog(true);
  };

  // const value = useContext(Context);
  // console.log(value);
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
          <Search />
          {/* <Search value={getSearchValue}/> */}
        </div>
        <CatalogTable updateData={updateData} />
      </main>
    </>
  );
};

export default Catalog;
