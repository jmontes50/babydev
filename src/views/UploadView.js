import React, { useState, useEffect, Fragment } from "react";
import fire, { storage } from "../config/firebase";
import Swal from "sweetalert2";
import Loading from "../components/Loading";

let imagenRegalo;

export default function UploadView() {
  const [regalo, setRegalo] = useState({
    nombre: "",
    precio: 0,
    descripcion: "",
    cantidad: 0,
  });

  const [loading, setLoading] = useState(false);

  const [donde, setDonde] = useState("");

  const [sitios, setSitios] = useState([]);

  const anadirDonde = (e) => {
    e.preventDefault();
    if (donde.trim() !== "") {
      setSitios([...sitios, donde]);
    }
  };

  const limpiar = () => {
    setRegalo({
      nombre: "",
      precio: 0,
      descripcion: "",
      cantidad: 0,
    });
    setSitios([]);
  };

  const eliminarDonde = (i) => {
    let arrTmp = [...sitios];
    arrTmp.splice(i, 1);
    setSitios([...arrTmp]);
  };

  useEffect(() => {
    setDonde("");
  }, [sitios]);

  const manejarImagen = (e) => {
    e.preventDefault();
    let miImagen = e.target.files[0];
    console.log(miImagen);
    imagenRegalo = miImagen;
  };

  const upload = (imagen, refStorage) => {
    console.log(imagenRegalo);
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

  const crearRegalo = () => {
    if (
      regalo.nombre.trim() === "" ||
      regalo.descripcion.trim() === "" ||
      regalo.precio === 0 ||
      regalo.cantidad === 0 ||
      imagenRegalo === undefined
    ) {
      return;
    }
    setLoading(true);
    const refStorage = storage.ref(`regalos/${imagenRegalo.name}`);
    upload(imagenRegalo, refStorage).then((rutaImg) => {
      let db = fire.firestore();
      db.collection("regalos")
        .add({
          nombre: regalo.nombre,
          descripcion: regalo.descripcion,
          precio: regalo.precio,
          cantidad:regalo.cantidad,
          imagen: rutaImg,
          sitios: [...sitios]
        })
        .then(() => {
          setLoading(false);
          limpiar()
          Swal.fire({
            icon: "success",
            title: "Exito!",
            showConfirmButton: false,
            timer: 2000,
          });
        });
    });
  };

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <div className="container">
          <div className="seccion">
            <h1>Subir Regalos</h1>
            <form>
              <div className="form-group">
                <label htmlFor="nombre">Nombre del regalo *</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  value={regalo.nombre}
                  onChange={(e) => {
                    setRegalo({ ...regalo, nombre: e.target.value });
                  }}
                />
              </div>
              <div className="form-row">
                <div className="form-group col-12 col-md-6">
                  <label htmlFor="precio">Precio *</label>
                  <input
                    type="number"
                    className="form-control"
                    id="precio"
                    value={regalo.precio}
                    onChange={(e) => {
                      setRegalo({ ...regalo, precio: e.target.value });
                    }}
                  />
                </div>
                <div className="form-group col-12 col-md-6">
                  <label htmlFor="cantidad">Cantidad Límite *</label>
                  <input
                    type="number"
                    className="form-control"
                    id="cantidad"
                    value={regalo.cantidad}
                    onChange={(e) => {
                      setRegalo({ ...regalo, cantidad: e.target.value });
                    }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="descripcion">Descripción *</label>
                <textarea
                  type="text"
                  className="form-control"
                  id="descripcion"
                  value={regalo.descripcion}
                  onChange={(e) => {
                    setRegalo({ ...regalo, descripcion: e.target.value });
                  }}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="imagen">Imagen *</label>
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
              </div>
              <div className="form-group">
                <label htmlFor="donde">Donde encontrarlo</label>
                <div className="row">
                  <div className="col-12 col-md-9">
                    <input
                      type="text"
                      className="form-control"
                      id="donde"
                      value={donde}
                      onChange={(e) => {
                        setDonde(e.target.value);
                      }}
                    />
                    <small className="form-text text-muted">
                      Agrega links o sitios donde puedan encontrar el regalo
                      deseado
                    </small>
                  </div>
                  <div className="col-12 col-md-3">
                    <button
                      className="btn btn-outline-info btn-block"
                      onClick={(e) => {
                        anadirDonde(e);
                      }}
                    >
                      Agregar
                    </button>
                  </div>
                </div>
                {/* lista */}
                <div className="form-group">
                  <label>Sitios agregados</label>
                  <ul className="list-group">
                    {sitios.length > 0 ? (
                      sitios.map((sitio, i) => (
                        <li
                          className="list-group-item d-flex justify-content-between"
                          key={i}
                        >
                          <span className="text-secondary">{`${
                            i + 1
                          }. ${sitio}`}</span>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                              eliminarDonde(i);
                            }}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </li>
                      ))
                    ) : (
                      <small>No ha ingresado ningún sitio</small>
                    )}
                  </ul>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-shower btn-block btn-lg"
                onClick={() => {
                  crearRegalo();
                }}
              >
                Publicar Regalo
              </button>
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
}
