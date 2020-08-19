import React, {useState, useEffect} from "react";
import getRegalos from "../services/giftsService";
import Tarjeta from "./Tarjeta";
export default function () {

  const [regalos, setRegalos] = useState([]);

  let obtenerRegalos = async () => {
    let regalos = await getRegalos();
    reducirRegalos(regalos);
  }

  let reducirRegalos = (regalos) => {
    let cuatroRegalos = regalos.slice(0,3)
    setRegalos(cuatroRegalos);
  }

  useEffect(() => {
    obtenerRegalos();
  }, []);

  return (
    <div className="seccion">
      <div>
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
