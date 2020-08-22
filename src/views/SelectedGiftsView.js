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
import {AuthContext} from "../Context/authContext";
import validateAdmin from "../utils/validateAdmin";
import {getUsuarios} from "../services/userService";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function SelectedGiftsView() {
  const [access, setAccess] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const {user} = useContext(AuthContext);
  const history = useHistory();
  const classes = useStyles();

  const obtenerUsuarios = () => {
    getUsuarios().then(usuarios => {
      setUsuarios(usuarios)
    }).catch(err =>{
      console.log(err)
    })
  }

  useEffect(() => {
    let esAdmin = validateAdmin(user);
    if(user !== null && esAdmin === true){
      setAccess(true);
    }else{
      return history.push('/');
    }
  }, []);

  useEffect(() => {
    obtenerUsuarios();
  }, [access]);

  return (
    <div className="container mb-4">
    {access ? ( <div className="seccion">
       <h2 className="mb-2">Usuarios y Regalos</h2>
       <TableContainer component={Paper}>
         <Table className={classes.table} aria-label="simple table">
           <TableHead>
             <TableRow>
               <TableCell>Nº</TableCell>
               <TableCell align="center">Nombre</TableCell>
               <TableCell align="center">Email</TableCell>
               <TableCell align="center">Regalo</TableCell>
             </TableRow>
           </TableHead>
           <TableBody>
             {usuarios.length > 0
               ? usuarios.map((user, i) => (
                   <TableRow key={i}>
                     <TableCell align="center">{i+1}</TableCell>
                     <TableCell align="center">{user.nombres}</TableCell>
                     <TableCell align="justify">{user.email}</TableCell>
                     <TableCell align="center">{user.regalos[0] !== undefined ? user.regalos[0].nombre : "Aun no ha escogido un regalo"}</TableCell>
                   </TableRow>
                 ))
               : null}
           </TableBody>
         </Table>
       </TableContainer>
     </div>) : null}
   </div>
  )
}
