import fire, { firebase } from "../config/firebase";

let db = fire.firestore();

let getUsuario = (id) => {
  return new Promise((resolve, reject) => {
    let query = db.collection("usuarios").doc(id);

    query
      .get()
      .then((doc) => {
        doc.exists ? resolve(doc.data()) : reject("No existe el usuario");
      })
      .catch((err) => {
        console.log("error al obtener usuario :", err);
      });
  });
};

let getUsuarios = () => {
  return new Promise((resolve, reject) => {
    let query = db.collection("usuarios");

    query.onSnapshot((snap) => {
      let arrTmp = [];
      snap.forEach((usuario) => {
        let objUsuario = {
          id: usuario.id,
          nombres: usuario.data().nombres,
          email: usuario.data().email,
          regalos: usuario.data().regalos,
          foto: usuario.data().foto,
          mensaje: usuario.data().mensaje
        };
        arrTmp.push(objUsuario);
      });
      resolve(arrTmp);
    });
  });
};

let updateFotoUsuario = (id, img) => {
  return new Promise((resolve, reject) => {
    let query = db.collection("usuarios").doc(id);

    query
      .update({
        foto: img,
      })
      .then(() => {
        resolve("ok");
      })
      .catch((err) => {
        reject(err);
      });
  });
};

let anadirMensaje = (id, mensaje) => {
  return new Promise((resolve, reject) => {
    let query = db.collection("usuarios").doc(id);

    query
      .update({
        mensaje: mensaje,
      })
      .then(() => {
        resolve("ok");
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export { getUsuario, getUsuarios, updateFotoUsuario, anadirMensaje };
