import React from "react";
import Slider from "../components/Slider";
import Mensajes from "../components/Mensajes";
import Tarjetas from "../components/Tarjetas";
export default function HomeView() {
  return (
    <div>
      <Slider />
      <div className="container">
        <Tarjetas />
        <Mensajes/>
      </div>
    </div>
  );
}
