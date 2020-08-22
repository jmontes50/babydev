import React, { useState, useEffect, Fragment, useContext } from "react";
import fire, { storage } from "../config/firebase";
import {useHistory} from "react-router-dom";
import { getRegalo } from "../services/giftsService";
import {AuthContext} from "../Context/authContext";
import validateAdmin from "../utils/validateAdmin"
import Swal from "sweetalert2";
import Loading from "../components/Loading";

let imagenRegalo;

export default function EditGiftView(props) {
  let id = props.match.params.id;
  const history = useHistory();
  const {user} = useContext(AuthContext);
  const [access, setAccess] = useState(false);
  const [regalo, setRegalo] = useState({
    nombre: "",
    precio: 0,
    descripcion: "",
    cantidad: 0,
  });

  const getGift = () => {
    setLoading(true);
    getRegalo(props.match.params.id).then((data) => {
      setRegalo({
        nombre: data.nombre,
        precio: data.precio,
        descripcion: data.descripcion,
        cantidad: data.cantidad,
        imagen:data.imagen
      });
      setSitios([...data.sitios]);
      setLoading(false);
    });
  };

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
    let esAdmin = validateAdmin(user);
    if(user !== null && esAdmin === true){
      setAccess(true);
    }else{
      return history.push('/');
    }
    getGift();
  }, []);

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

  const updateFirestore = (rutaImg = regalo.imagen) => {
    let db = fire.firestore();
    db.collection("regalos")
      .doc(id)
      .update({
        nombre: regalo.nombre,
        descripcion: regalo.descripcion,
        precio: regalo.precio,
        cantidad: regalo.cantidad,
        imagen: rutaImg,
        sitios: [...sitios],
      })
      .then(() => {
        setLoading(false);
        limpiar();
        Swal.fire({
          icon: "success",
          title: "Regalo editado!",
          showConfirmButton: false,
          timer: 2000,
        }).then(()=>{
          history.push('/editar')
        });
      });
  }

  const updateRegalo = () => {
    if (
      regalo.nombre.trim() === "" ||
      regalo.descripcion.trim() === "" ||
      regalo.precio === 0 ||
      regalo.cantidad === 0
    ) {
      return;
    }
    setLoading(true);
    if (imagenRegalo !== undefined) {
      const refStorage = storage.ref(`regalos/${imagenRegalo.name}`);
      upload(imagenRegalo, refStorage).then((rutaImg) => {
       updateFirestore(rutaImg);
      });
    }else{
      updateFirestore();
    }
  };

  return (
    <Fragment>
      {access ? (
        loading ? (
          <Loading />
        ) : (
          <div className="container">
            <div className="seccion">
              <h1>Actualizar Regalos</h1>
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
                   <small>Solo si agregas una imagen nueva se cambiará la imagen, si no se mantendrá la anterior</small>
                </div>
                <div className="form-group">
                  <label htmlFor="donde">Donde encontrarlo?</label>
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
                        Agrega links o sitios para ayudar a que encuentrennpm
                        state_changed el regalo deseado
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
                    updateRegalo();
                  }}
                >
                  Actualizar Regalo
                </button>
              </form>
            </div>
          </div>
        )
      ) : null}
    </Fragment>
  );
}
