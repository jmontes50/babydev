import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import fire from "../config/firebase";
import { AuthContext } from "../Context/authContext";
import Swal from "sweetalert2";
export default function NavAdmin() {
  const { removeUser } = useContext(AuthContext);
  const salir = () => {
    fire
      .auth()
      .signOut()
      .then(() => {
        removeUser();
        console.log("bye");
        Swal.fire({
          icon: "info",
          title: "Se ha deslogueado",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      <li className="nav-item">
        <Link className="nav-link" to="/subir" aria-disabled="true">
          Subir
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/editar" aria-disabled="true">
          Editar
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/regalosescogidos" aria-disabled="true">
          Usuarios y regalos
        </Link>
      </li>
      <li className="nav-item">
        <button
          className="btn btn-shower mr-2 btn-sm"
          to="/subir"
          aria-disabled="true"
          onClick={() => {
            salir();
          }}
        >
          Salir
        </button>
      </li>
    </Fragment>
  );
}
