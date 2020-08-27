import React from "react";
import "./css/Mensaje.css";

export default function Mensaje({foto,mensaje,nombre}) {
  console.log(foto)
  return (
    <div className="col-12 col-md-6 col-lg-4 mb-5">
      <div className="mensaje">
        <div>
          {foto === '' ? (<img className="foto" src={'https://www.iconarchive.com/download/i63196/dapino/baby-boy/baby-sucking.ico'} />) : (<img className="foto" src={foto} />)}
  <h4 className="text-center font-weight-bold">{nombre}</h4>
          <p className="text-center">
            {mensaje}
          </p>
        </div>
      </div>
    </div>
  );
}
