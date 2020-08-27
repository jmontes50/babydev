import React, { Fragment, useContext } from "react";
import fire from "../config/firebase";
import { AuthContext } from "../Context/authContext";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function NavPrivate(props) {
  console.log(props)
  const { removeUser } = useContext(AuthContext);

  const salir = () => {
    fire
      .auth()
      .signOut()
      .then(() => {
        removeUser();
        props.cambiarAcceso("public");
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
        <Link className="nav-link active" to="/perfil">
        <i className="fas fa-star mr-2 fa-spin icono"></i>
          Perfil
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
