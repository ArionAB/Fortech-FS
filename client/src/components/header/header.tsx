import React from "react";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import "./header.styles.scss";

export const Header = () => {
  const rank = localStorage.getItem("rank");
  const email = localStorage.getItem("email");

  return (
    <main className="header">
      <Link to="/">
        <Logo className="Logo" />
      </Link>
      <nav className="navbar">
        <ul>
          <Link to="/register">
            <li>{`Welcome, ${email}`}</li>
          </Link>
          <Link to="/catalog">
            <li>Catalog</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
        </ul>
      </nav>
    </main>
  );
};
