import React, { Fragment, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import HomeView from "./views/HomeView";
import UploadView from "./views/UploadView"; 
import GiftsView from "./views/GiftsView";

function Routes() {

  return (
    <Fragment>
     <Route exact path='/' component={HomeView}/>
     <Route exact path='/subir' component={UploadView}/>
     <Route exact path='/regalos' component={GiftsView}/>
    </Fragment>
  );
}

export default Routes;