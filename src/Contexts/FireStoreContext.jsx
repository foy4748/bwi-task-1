import { getFirestore } from "firebase/firestore";
import firebaseApp from "../firebase.config.js";

const db = getFirestore(firebaseApp);

export default db;
