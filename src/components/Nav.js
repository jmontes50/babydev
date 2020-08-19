import React from "react";
import "./css/Nav.css";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <div>
      <div className="container">
        <div className="title d-flex justify-content-center align-items-center">
          <h1>
            <span>B</span>
            <span>A</span>
            <span>B</span>
            <span>Y</span>
            <i className="fas fa-baby-carriage mx-3"></i>
            <span>SHOWER</span>
          </h1>
        </div>
      </div>
      <nav>
        <ul className="nav justify-content-center align-items-center">
          <li className="nav-item">
            <Link className="nav-link active" to='/'>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/'>
              Nosotros
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/regalos'>
              Lista de regalos
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to='/'
              aria-disabled="true"
            >
              Mensajitos
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to='/subir'
              aria-disabled="true"
            >
              Subir
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
