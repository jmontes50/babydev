import React, { useState, useEffect } from "react";
import Tarjeta from "../components/Tarjeta";
import getRegalos from "../services/giftsService";

export default function GiftsView() {
  const [regalos, setRegalos] = useState([]);

  let obtenerRegalos = () => {
    getRegalos().then((regalos) => {
      setRegalos(regalos);
    }).catch(err => {
      console.log(err)
    })
    
  }

  useEffect(() => {
    obtenerRegalos();
  }, []);

  return (
    <div className="container">
      <div className="seccion">
        <h2>Regalos!</h2>
        <h4>Regalos a elegir!</h4>
        <div className="row mt-4">
          {regalos.length > 0
            ? (regalos.map((gift, i) => <Tarjeta gift={gift} key={i} />))
            : null}
        </div>
      </div>
    </div>
  );
}
