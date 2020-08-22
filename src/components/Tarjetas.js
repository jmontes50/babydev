import React, {useState, useEffect} from "react";
import getRegalos from "../services/giftsService";
import Tarjeta from "./Tarjeta";
export default function () {

  const [regalos, setRegalos] = useState([]);

  let obtenerRegalos = () => {
    getRegalos().then(regalos => {
      reducirRegalos(regalos);
    }).catch(err => {
        console.log(err)
    })
    
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
            ? (regalos.slice(0,3).map((gift, i) => <Tarjeta gift={gift} key={i} />))
            : null}
        </div>
      </div>
    </div>
  );
}
