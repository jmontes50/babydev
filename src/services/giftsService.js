import fire from "../config/firebase";

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

      resolve(arrTmp) ;
    });
  });
};

export default getRegalos;
