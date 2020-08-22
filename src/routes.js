import React, { Fragment, useContext } from "react";
import { Route } from "react-router-dom";
import HomeView from "./views/HomeView";
import UploadView from "./views/UploadView";
import GiftsView from "./views/GiftsView";
import EditView from "./views/EditView";
import EditGiftView from "./views/EditGiftView";
import PerfilView from "./views/PerfilView";
import MensajesView from "./views/MensajesView";
import InfoView from "./views/InfoView";
import SelectedGiftsView from "./views/SelectedGiftsView";
function Routes() {
  return (
    <Fragment>
      <Route exact path="/" component={HomeView} />
      <Route exact path="/regalos" component={GiftsView} />
      <Route exact path="/mensajes" component={MensajesView} />
      <Route exact path="/info" component={InfoView} />
      {/* private */}
      <Route exact path="/subir" component={UploadView} />
      <Route exact path="/editar" component={EditView} />
      <Route exact path="/perfil" component={PerfilView} />
      <Route exact path="/editar/:id" component={EditGiftView} />
      <Route exact path="/regalosescogidos" component={SelectedGiftsView} />
    </Fragment>
  );
}

export default Routes;
