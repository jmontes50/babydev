import React, { useState, useEffect, Fragment, useContext } from "react";
import fire, { storage } from "../config/firebase";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../Context/authContext";
import Swal from "sweetalert2";
import Loading from "../components/Loading";
import {
  getUsuario,
  updateFotoUsuario,
  enviarMensaje,
  anadirMensaje,
} from "../services/userService";

let imagenPerfil;

export default function PerfilView() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [usuario, setUsuario] = useState({
    nombres: "",
    email: "",
    foto: "",
    regalos: "",
    mensaje: "",
  });
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user === null) {
      history.push("/");
      return;
    }
    getUsuario(user).then((usuarioObtenido) => {
      setUsuario({ ...usuarioObtenido });
      console.log(usuarioObtenido);
      setLoading(false);
    });
  }, []);

  const upload = (imagen, refStorage) => {
    return new Promise((resolve, reject) => {
      const tarea = refStorage.put(imagen);
      tarea.on(
        "state_changed",
        (snapshot) => {},
        (err) => {
          reject(err);
        },
        () => {
          tarea.snapshot.ref
            .getDownloadURL()
            .then((urlImagen) => {
              resolve(urlImagen);
            })
            .catch((err) => {
              reject(err);
            });
        }
      );
    });
  };
  const subirImagenPerfil = () => {
    if (imagenPerfil === undefined) {
      return;
    }
    setLoading(true);
    const refStorage = storage.ref(`usuarios/${imagenPerfil.name}`);
    upload(imagenPerfil, refStorage).then((rutaImg) => {
      updateFotoUsuario(user, rutaImg)
        .then(() => {
          setUsuario({ ...usuario, foto: rutaImg });
          setLoading(false);
          Swal.fire({
            icon: "success",
            title: "Foto de Perfil Cambiada!",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            history.push("/perfil");
          });
        })
        .catch((err) => {
          setLoading(false);
          Swal.fire({
            icon: "error",
            title: "error al cambiar",
            showConfirmButton: false,
            timer: 2000,
          });
        });
    });
  };

  const manejarImagen = (e) => {
    e.preventDefault();
    let miImagen = e.target.files[0];
    console.log(miImagen);
    imagenPerfil = miImagen;
  };

  const enviarMensaje = () => {
    setLoading(true);
    anadirMensaje(user, mensaje)
      .then((rpta) => {
        console.log(rpta);
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "mensaje enviado",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <div className="container mt-4">
          <h2>Mi Perfil</h2>
          <div className="card" style={{ width: "100%" }}>
            <div className="row">
              <div className="col-12 col-md-5">
                {usuario.foto === "" ? (
                  <img
                    src="https://www.iconarchive.com/download/i63196/dapino/baby-boy/baby-sucking.ico"
                    style={{ width: "100%" }}
                  />
                ) : (
                  <img src={usuario.foto} style={{ width: "100%" }} />
                )}
              </div>
              <div className="col-12 col-md-7">
                <div
                  className="card-body"
                  style={{ borderRadius: "20px 20px 20px 20px" }}
                >
                  <h3 className="card-title">Hola {usuario.nombres}</h3>
                  <div className="card-text">
                    <h4>Has escogido</h4>
                    <span>
                      <i className="fas fa-gift mr-2"></i>{" "}
                      {usuario.regalos[0] !== undefined ? usuario.regalos[0].nombre : "Aun no has escogido un regalo"}
                    </span>
                  </div>
                  <hr />
                  <input
                    type="file"
                    className="form-control"
                    id="imagen"
                    accept="image/png, image/jpeg"
                    placeholder="Seleccione una imagen"
                    onChange={(e) => {
                      manejarImagen(e);
                    }}
                  />
                  <button
                    className="btn btn-shower mt-1"
                    onClick={() => {
                      subirImagenPerfil();
                    }}
                  >
                    Editar Foto
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="seccion">
            <h2>Escribe un mensaje</h2>
            <div className="form-group mt-2">
              {usuario.mensaje !== "" ? (
                <p className="font-weight-bold">Ya pusiste un mensaje</p>
              ) : (
                <Fragment>
                  <label htmlFor="mensaje">Tu mensaje</label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="mensaje"
                    value={mensaje}
                    maxLength={540}
                    placeholder="Tus deseos en 140 caracteres"
                    onChange={(e) => {
                      setMensaje(e.target.value);
                    }}
                  ></textarea>
                  <button
                    className="btn btn-shower mt-2"
                    onClick={() => {
                      enviarMensaje();
                    }}
                  >
                    Enviar Mensaje
                  </button>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
