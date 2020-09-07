import React, { Fragment } from "react";
import { Carousel } from "react-bootstrap";
import c1 from "../assets/c1.png";
import c2 from "../assets/c2.jpg";
import header1 from "../assets/header1.jpg";
import header2 from "../assets/header2.jpg";
import "./css/Slider.css";

export default function Slider() {
  return (
    <Fragment>
      <Carousel>
        <Carousel.Item style={{maxHeight: '768px'}}>
          <img className="d-block w-100" src={header1} alt="..." />
          <Carousel.Caption>
            <h3>Bienvenid@</h3>
            <p>Nombre Apellido</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={{maxHeight: '768px'}}>
          <img className="d-block w-100" src={header2} alt="..." />
          <Carousel.Caption>
            <h3>Gracias!</h3>
            <p>Por compartir este momento!</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Fragment>
  );
}
