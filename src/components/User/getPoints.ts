import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseApp";

export default async function getUserPoints() {
    if (auth.currentUser) {
        const uid = auth.currentUser.uid;
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("User data:", docSnap.data());
            return docSnap.data().points;
        } else {
            console.log("No such document!");
            return null;
        }
    }
}
