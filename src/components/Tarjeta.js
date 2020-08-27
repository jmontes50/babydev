import React, { Fragment, useEffect, useState, useContext } from "react";
import "./css/Tarjeta.css";
import { useHistory } from "react-router-dom";
import { regalar } from "../services/giftsService";
import { getUsuario } from "../services/userService";
import { AuthContext } from "../Context/authContext";
import Swal from "sweetalert2";
import Loading from "../components/Loading";
export default function Tarjeta({ gift }) {
  console.log(gift)
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  let verificarCantidadRegalo = () => {
    return new Promise((resolve, reject) => {
      getUsuario(user).then((usuario) => {
        // console.log(usuario);
        if (usuario.regalos.length !== 0) {
          setLoading(false);
          Swal.fire({
            icon: "info",
            title: "Ya has separado un regalo",
            showConfirmButton: false,
            timer: 2000,
          });
          reject("muchosregalos");
        } else {
          resolve("ok");
        }
      });
    });
  };

  let separarRegalo = (uid, idGift, nameGift) => {
    setLoading(true);
    if (user === null) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "No estas logueado",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    verificarCantidadRegalo()
      .then(() => {
        return regalar(uid, idGift, nameGift);
      })
      .then((rpta) => {
        // console.log("tarjeta", rpta);
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Has separado el regalo!",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          return history.push("/perfil");
        });
      })
      .catch((err) => {
        // console.log(err);
        if (err === "cantidad0") {
          setLoading(false);
          Swal.fire({
            icon: "error",
            title: "El regalo ha sido separado en su totalidad",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            return history.push("/");
          });
        }
      });
  };

  const verDetalleRegalo = () => {
    Swal.fire({
      title: `<strong>${gift.nombre}</strong>`,
      // icon: 'info',
      imageUrl: `${gift.imagen}`,
      html:
        
        `<p>${gift.descripcion}</p>` +
        `<p className="font-weight-bold">Precio: S/${gift.precio}</p>` +
        `<p className="font-weight-bold">Cantidad Disponible: ${gift.cantidad}</p>`
    })
  }

  // console.log(gift);
  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <div className="col-12 col-md-6 col-lg-4 mb-4">
          <div className="card">
            {/* <img className="card-img-top" src={gift.imagen} /> */}
            <div className="card-img-caption">
              <img className="card-img-top" src={gift.imagen} alt="..." />
            </div>
            {/* <div className="cardcantidad">{`Disponible: ${gift.cantidad}`}</div> */}
            <div className="card-body">
              <h5 className="card-title font-weight-bold">{gift.nombre}</h5>
              <p className="card-text text-justify">
                {`${gift.descripcion.slice(0, 120)} ...`}
              </p>
              <div className="d-flex justify-content-around mb-3 font-weight-bold">
                <span className="cantidad">
                  <i className="fas fa-gifts mr-2"></i>
                  {`# ${gift.cantidad}`}
                </span>
                <span className="precio">
                  <i className="fas fa-money-bill-wave-alt mr-2"></i>
                  {`S/ ${gift.precio}`}
                </span>
              </div>
              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-shower"
                  onClick={() => {
                    separarRegalo(user, gift.id, gift.nombre);
                  }}
                >
                  <i className="fas fa-heart mr-2"></i>Regalar
                </button>
                <button
                  className="btn btn-info"
                  onClick={() => {
                    verDetalleRegalo()
                  }}
                >
                  <i className="fas fa-info-circle mr-2"></i>Ver Detalle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
