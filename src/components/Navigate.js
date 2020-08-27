import React, { useState, useEffect, Fragment, useContext } from "react";
import "./css/Nav.css";
import { Link } from "react-router-dom";
import NavPublic from "./NavPublic";
import NavPrivate from "./NavPrivate";
import NavAdmin from "./NavAdmin";
import { AuthContext } from "../Context/authContext";
import validateAdmin from "../utils/validateAdmin";
import { Navbar, Nav } from "react-bootstrap";

export default function Navigate() {
  const [access, setAccess] = useState("public");
  const [menu, setMenu] = useState("false");
  const { user } = useContext(AuthContext);

  let cambiarAcceso = (permisos) => {
    setAccess(permisos);
  };

  useEffect(() => {
    let esAdmin = validateAdmin(user);
    if (user !== null && esAdmin === true) {
      setAccess("admin");
    } else if (user !== null) {
      setAccess("registered");
    } else {
      setAccess("public");
    }
  }, []);

  return (
    <div>
      <div className="container">
        <div className="title d-flex justify-content-center align-items-center text-center">
          <h1 className="cabecera">
            <span>B</span>
            <span>A</span>
            <span>B</span>
            <span>Y</span>
            <i className="fas fa-baby-carriage mx-3"></i>
            <span>GIFT</span>
            <i className="fas fa-baby mx-3"></i>
            <span>PARTY</span>
          </h1>
        </div>
      </div>

      <Navbar expand="md">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <ul className="nav justify-content-center align-items-center navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/regalos">
                  Lista de regalos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/mensajes" aria-disabled="true">
                  Mensajitos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/info">
                  Info
                </Link>
              </li>

              {access === "admin" ? (
                <NavAdmin cambiarAcceso={cambiarAcceso} />
              ) : null}
              {access === "registered" ? (
                <NavPrivate cambiarAcceso={cambiarAcceso} />
              ) : null}

              {access === "public" ? (
                <NavPublic cambiarAcceso={cambiarAcceso} />
              ) : null}
            </ul>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
