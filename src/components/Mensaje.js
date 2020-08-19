import React from "react";
import "./css/Mensaje.css";

export default function Mensaje() {
  return (
    <div className="col-12 col-md-6 col-lg-4 mb-5">
      <div className="mensaje">
        <div>
          <img className="foto" src="http://lorempixel.com/200/200/people" />
          <h4 className="text-center font-weight-bold">Título Mensaje</h4>
          <p className="text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in risus
            eu purus mollis varius. Fusce eget tellus blandit, aliquet arcu
            luctus, bibendum augue.
          </p>
        </div>
      </div>
    </div>
  );
}
