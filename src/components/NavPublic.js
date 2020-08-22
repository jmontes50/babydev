import React, { Fragment,useContext } from "react";
import Swal from "sweetalert2";
import { registro, ingresar } from "../services/authService";
import {AuthContext} from "../Context/authContext";
import validateAdmin from "../utils/validateAdmin"

export default function NavPublic(props) {

  const {setAuthUser} = useContext(AuthContext);

  const mostrarRegistro = () => {
    Swal.fire({
      title: "Registro",
      html: `<div class="form-group text-left">
              <label htmlFor="nombre">Nombres y Apellidos</label>
              <input
                type="text"
                class="form-control"
                id="nombres"
              />
            </div>
            <div class="form-group text-left">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
              />
            </div>
            <div class="form-group text-left">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                class="form-control"
                id="password"
              />
            </div>`,
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Registrame",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return new Promise((resolve, reject) => {
          let nombres = document.getElementById("nombres");
          let email = document.getElementById("email");
          let password = document.getElementById("password");
          registro(nombres.value, email.value, password.value).then((rpta) => {
            
            resolve(rpta);
          });
        });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.dismiss) {
        Swal.close();
        return;
      }
      if (result) {
        Swal.fire({
          icon: "success",
          title: "Registrado",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  const mostrarLogin = () => {
    Swal.fire({
      title: "Ingresa",
      html: `</div>
            <div class="form-group text-left">
              <label htmlFor="emaillogin">Email</label>
              <input
                type="email"
                class="form-control"
                id="emaillogin"
              />
            </div>
            <div class="form-group text-left">
              <label htmlFor="passwordlogin">Contraseña</label>
              <input
                type="password"
                class="form-control"
                id="passwordlogin"
              />
            </div>`,
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Ingresar",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return new Promise((resolve, reject) => {
          let email = document.getElementById("emaillogin");
          let password = document.getElementById("passwordlogin");
          ingresar(email.value, password.value).then((rpta) => {
            // console.log("")
            // console.log(rpta.uid)
            
            resolve(rpta);
          }).catch(err => {
            // console.log(err)
            Swal.close();
            Swal.fire({
              icon: "error",
              title: "Login Invalido",
              showConfirmButton: false,
              timer: 2000,
            });
          })
        });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      console.log(result)
      if (result.dismiss || result.isDismissed) { 
        Swal.close();
        return;
      }
      if (result) {
        // console.log(result.value.uid)
        setAuthUser(result.value.uid);
        let esAdmin = validateAdmin(result.value.uid);
        if(esAdmin === true){
          props.cambiarAcceso("admin")
        }else{
          props.cambiarAcceso("registered")
        }
        Swal.fire({
          icon: "success",
          title: "Login Exitoso",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  return (
    <Fragment>
      <li className="nav-item">
        <button
          className="btn btn-shower mr-2 btn-sm"
          to="/subir"
          aria-disabled="true"
          onClick={() => {
            mostrarRegistro();
          }}
        >
          Registrarse
        </button>
      </li>
      <li className="nav-item">
        <button
          className="btn btn-outline-danger btn-sm login"
          to="/subir"
          aria-disabled="true"
          onClick={() => {
            mostrarLogin();
          }}
        >
          Login
        </button>
      </li>
    </Fragment>
  );
}
