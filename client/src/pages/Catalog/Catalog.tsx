import React, { useState } from "react";
import CatalogTable from "../../components/CatalogTable/CatalogTable";
import { Header } from "../../components/header/header";
import AddStudent from "../../components/Modals/AddStudent/addStudent";
import "./catalog.styles.scss";

const Catalog = () => {
  const [show, setShow] = useState<boolean>(false);
  const [updateCatalog, setUpdateCatalog] = useState<boolean>(false);

  const rank = localStorage.getItem("rank");

  const closeModal = () => {
    setShow(false);
  };

  const updateData = () => {
    setUpdateCatalog(true);
  };

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
        <CatalogTable updateData={updateData} />
      </main>
    </>
  );
};

export default Catalog;
