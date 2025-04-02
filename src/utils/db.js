import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAktkDlpF0ZC2ElwE2ew97zpXM_LqYYyoU",
  authDomain: "mtm6404-contact-book-415f4.firebaseapp.com",
  projectId: "mtm6404-contact-book-415f4",
  storageBucket: "mtm6404-contact-book-415f4.firebasestorage.app",
  messagingSenderId: "348411465290",
  appId: "1:348411465290:web:c7b515d107405d747a20b3",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
