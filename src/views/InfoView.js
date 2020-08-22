import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

export default function InfoView() {
  return (
    <div className="container">
      <div className="seccion">
        <h2>Información!</h2>
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="card">
              <div className="card-body" style={{borderRadius:'20px'}}>
                <h5 className="card-title">En caso desees contactarnos</h5>
                <h6 className="card-subtitle mb-2 text-muted">Número</h6>
                <p className="card-text">1243421412</p>
                <h6 className="card-subtitle mb-2 text-muted">Cuenta</h6>
                <p className="card-text">1243421412-1241241-21412</p>
                <h6 className="card-subtitle mb-2 text-muted">Dirección</h6>
                <p className="card-text">Av. EEUU S/N</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <Map
              center={[-16.409046, -71.537453]}
              zoom={12}
              className="leaflet"
              style={{borderRadius:'20px'}}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
              />
              <Marker position={[-16.409046, -71.537453]}>
                <Popup>
                  <span>Aquí!</span>
                </Popup>
              </Marker>
            </Map>
          </div>
        </div>
      </div>
    </div>
  );
}
