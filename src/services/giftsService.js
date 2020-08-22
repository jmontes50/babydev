import fire, { firebase } from "../config/firebase";

let db = fire.firestore();

let getRegalos = () => {
  return new Promise((resolve, reject) => {
    let query = db.collection("regalos");

    query.onSnapshot((snap) => {
      let arrTmp = [];
      snap.forEach((gift) => {
        let objGift = {
          id: gift.id,
          nombre: gift.data().nombre,
          precio: gift.data().precio,
          cantidad: gift.data().cantidad,
          descripcion: gift.data().descripcion,
          imagen: gift.data().imagen,
        };
        arrTmp.push(objGift);
      });
      resolve(arrTmp);
    });
  });
};

let getRegalo = (id) => {
  return new Promise((resolve, reject) => {
    let query = db.collection("regalos").doc(id);

    query
      .get()
      .then((doc) => {
        doc.exists ? resolve(doc.data()) : reject("No existe el documento");
      })
      .catch((err) => {
        console.log("error al obtener :", err);
      });
  });
};

let regalar = (uid, giftId, giftName) => {
  // console.log("regala",uid, giftId, giftName)
  return new Promise((resolve, reject) => {
    let query = db.collection("regalos").doc(giftId);
    return db.runTransaction((transaccion) => {
      return transaccion.get(query).then((regalo) => {
        let cantRegalo = regalo.data().cantidad;
        if (cantRegalo === 0) {
          reject("cantidad0");
        } else {
          query
            .update({
              cantidad: firebase.firestore.FieldValue.increment(-1),
            })
            .then(() => {
              let userquery = db.collection("usuarios").doc(uid);

              return userquery
                .update({
                  regalos: firebase.firestore.FieldValue.arrayUnion({
                    id: giftId,
                    nombre: giftName,
                  }),
                })
                .then(() => {
                  resolve("regalo separado y registrado");
                });
            })
            .catch((err) => {
              console.log(err);
              reject(`error al separar :  ${err}`);
            });
        }
      });
    });

    // ----
  });
};

export { getRegalos as default, getRegalo, regalar };
