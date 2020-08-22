import React,{useEffect} from "react";
import "./App.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Routes from "./routes";
import Navigate from "./components/Navigate";
import AuthContextProvider from "./Context/authContext";
import {userIsLogged} from "./services/authService";
export default function App() {

  useEffect(()=>{
    userIsLogged();
  },[])

  return (
    <Router>
      <AuthContextProvider>
        <Navigate />
        <Switch>
          <Routes />
        </Switch>
      </AuthContextProvider>
    </Router>
  );
}
