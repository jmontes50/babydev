import React, { useState, useEffect } from "react";
import Tarjeta from "../components/Tarjeta";
import getRegalos from "../services/giftsService";

export default function GiftsView() {
  const [regalos, setRegalos] = useState([]);

  let obtenerRegalos = async () => {
    let regalos = await getRegalos();
    setRegalos(regalos);
  }

  useEffect(() => {
    obtenerRegalos();
  }, []);

  return (
    <div className="container">
      <div className="seccion">
        <h2>Regalos Disponibles</h2>
        <div className="row mt-4">
          {regalos.length > 0
            ? (regalos.map((gift, i) => <Tarjeta gift={gift} key={i} />))
            : null}
        </div>
      </div>
    </div>
  );
}
