import React, { useState, useEffect,useContext } from "react";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import getRegalos from "../services/giftsService";
import {Link} from "react-router-dom";
import {AuthContext} from "../Context/authContext";
import validateAdmin from "../utils/validateAdmin"

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function EditView() {
  const [regalos, setRegalos] = useState([]);
  const [access, setAccess] = useState(false);
  const {user} = useContext(AuthContext);
  const history = useHistory();

  const classes = useStyles();

  let obtenerRegalos = () => {
    getRegalos().then((regalos)=>{
      setRegalos(regalos);
    }).catch(err =>{
      console.log(err)
    })
  };
  
  useEffect(() => {
    let esAdmin = validateAdmin(user);
    if(user !== null && esAdmin === true){
      setAccess(true);
    }else{
      return history.push('/');
    }
  }, []);

  useEffect(() => {
    obtenerRegalos();
  }, [access]);

  return (
    <div className="container mb-4">
     {access ? ( <div className="seccion">
        <h2 className="mb-2">Editar</h2>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell align="center">Descripción</TableCell>
                <TableCell align="center">Precio</TableCell>
                <TableCell align="center">Cantidad</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {regalos.length > 0
                ? regalos.map((gift, i) => (
                    <TableRow key={i}>
                      <TableCell align="center">{gift.nombre}</TableCell>
                      <TableCell align="justify">{gift.descripcion}</TableCell>
                      <TableCell align="center">{gift.precio}</TableCell>
                      <TableCell align="center">{gift.cantidad}</TableCell>
                      <TableCell align="center">
                        <Link className="btn btn-shower" to={`/editar/${gift.id}`}>Editar</Link>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </div>) : null}
    </div>
  );
}
