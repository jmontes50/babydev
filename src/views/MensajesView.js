import React, { useState, useEffect } from "react";
import Mensaje from "../components/Mensaje";
import { getUsuarios } from "../services/userService";

export default function MensajesView() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    getUsuarios()
      .then((misUsuarios) => {
        setUsuarios(
          misUsuarios.filter((user) => {
            return user.mensaje !== undefined && user.mensaje !== "";
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container">
      <div className="seccion">
        <h2>Mensajitos</h2>
        <h4>Los mensajes escritos para ...</h4>
        <small className="text-secondary">Después de registrarte puedes dejarle un mensaje en tu Perfil ...</small>
        <div className="row mt-4  mensajitos">
          {usuarios
            ? usuarios.map((usu, i) => (
                <Mensaje
                  key={i}
                  foto={usu.foto}
                  nombre={usu.nombres}
                  mensaje={usu.mensaje}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
