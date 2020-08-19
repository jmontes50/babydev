import React from "react";
import Mensaje from "./Mensaje";

export default function Mensajes() {
  return (
    <div className="seccion">
      <h2>Mensajitos</h2>
      <div className="row mt-4  mensajitos">
        <Mensaje />
        <Mensaje />
        <Mensaje />
      </div>
    </div>
  );
}
