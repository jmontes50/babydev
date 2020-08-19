import React from "react";
import "./css/Tarjeta.css";

export default function Tarjeta({ gift }) {
  console.log(gift);
  return (
    <div className="col-12 col-md-6 col-lg-4 mb-4">
      <div className="card">
        {/* <img className="card-img-top" src={gift.imagen} /> */}
        <div class="card-img-caption">
          <img class="card-img-top" src={gift.imagen} alt="..." />
        </div>
        {/* <div className="cardcantidad">{`Disponible: ${gift.cantidad}`}</div> */}
        <div className="card-body">
          <h5 className="card-title font-weight-bold">{gift.nombre}</h5>
          <p className="card-text text-justify">
            {`${gift.descripcion.slice(0, 120)} ...`}
          </p>
          <div className="d-flex justify-content-around mb-3 font-weight-bold">
            <span class="cantidad"><i className="fas fa-gifts mr-2"></i>{`${gift.cantidad}`}</span>
            <span className="precio"><i className="fas fa-money-bill-wave-alt mr-2"></i>{`${gift.precio}`}</span>
          </div>
          <div className="d-flex justify-content-center">
            <a href="#" className="btn btn-shower">
              <i className="fas fa-heart mr-2"></i>Regalar
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
