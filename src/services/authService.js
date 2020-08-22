import fire from "../config/firebase";
const db = fire.firestore();

const registro = (nombres, email, password) => {
  console.log({ nombres, email, password });
  return new Promise((resolve, reject) => {
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((u) => {
        console.log(u.user.uid);
        return db.collection("usuarios").doc(u.user.uid).set({
          nombres,
          email,
          regalos: [],
          foto:'',
          mensaje:''
        });
      })
      .then(() => {
        resolve("Usuario Creado");
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const ingresar = (email, password) => {
  return new Promise((resolve, reject) => {
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((u) => {
        resolve(u.user)
      }).catch(err => reject(err));
  });
};

const userIsLogged = () => {
  let user = fire.auth().currentUser;
  console.log("islogged", user)
  if (user) {
    console.log("logged")
  } else {
    console.log("notlogged")
  }
}

export { registro, ingresar, userIsLogged };
