import React, { useState } from "react";
import CatalogTable from "../../../components/CatalogTable/CatalogTable";
import { Header } from "../../../components/header/header";
import AddStudent from "../../../components/Modals/AddStudent/addStudent";
import "./catalog.styles.scss";

const Catalog = () => {
  const [show, setShow] = useState<boolean>(false);

  const closeModal = () => {
    setShow(false);
  };

  return (
    <>
      <Header />
      <main className="catalog">
        <div className="title">
          <h1 className="catalog-title">Catalog</h1>
          <button onClick={() => setShow(true)}>Add student</button>
          {show ? <AddStudent handleClose={closeModal} /> : ""}
        </div>
        <CatalogTable />
      </main>
    </>
  );
};

export default Catalog;
