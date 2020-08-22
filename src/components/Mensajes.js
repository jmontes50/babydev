import React, { useState, useEffect } from "react";
import Mensaje from "./Mensaje";
import { getUsuarios } from "../services/userService";

export default function Mensajes() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    getUsuarios().then((misUsuarios)=>{
      setUsuarios(misUsuarios.filter((user) => {return user.mensaje !== undefined && user.mensaje !== ""}).slice(0,3));
    }).catch(err => {
      console.log(err)
    })
    
  },[]);

  return (
    <div className="seccion">
      <h2>Mensajitos</h2>
      <div className="row mt-4  mensajitos">
        {usuarios ? usuarios.map((usu,i)=>(
          <Mensaje key = {i} foto={usu.foto} nombre={usu.nombres} mensaje={usu.mensaje} col={12}/>
        )) : null}
      </div>
    </div>
  );
}
