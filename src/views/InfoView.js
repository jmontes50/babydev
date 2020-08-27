import React,{useState} from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

export default function InfoView() {
  // const coords = 
  const [coords, setCoords] = useState([-16.379105, -71.553493])
  
  const centrarMapa = () =>{

  }

  return (
    <div className="container">
      <div className="seccion">
        <h2>Información!</h2>
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="card">
              <div className="card-body" style={{borderRadius:'20px'}}>
                <h5 className="card-title">En caso desees contactarnos:</h5>
                <h6 className="card-subtitle mb-2 text-muted">Contactos</h6>
                <p className="card-text">Thalia Mendoza Gamero - 994781053</p>
                <p className="card-text">Fabiola Llerena - 949724747</p>
                <p className="card-text">Daniela Mancilla 982746755</p>
                <h6 className="card-subtitle mb-2 text-muted">Cuenta de Ahorro BCP:</h6>
                <p className="card-text">215-34558660-0-34</p>
                <h6 className="card-subtitle mb-2 text-muted">Dirección:</h6>
                <p className="card-text">Urb. Los Ángeles de Cayma C-16 - Cayma</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <Map
              center={coords}
              zoom={15}
              className="leaflet"
              style={{borderRadius:'20px'}}
              scrollWheelZoom="center"
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
              />
              <Marker position={[-16.379105, -71.553493]}>
                <Popup>
                  <span>Aquí!</span>
                </Popup>
              </Marker>
              {/* <button className="btn btn-primary" style={{position:'absolute', bottom:'10px', right:'10px', zIndex:'1000'}} onClick={()=>{setCoords([-16.379105, -71.553493])}}>Centrar</button> */}
            </Map>
          </div>
        </div>
      </div>
    </div>
  );
}
