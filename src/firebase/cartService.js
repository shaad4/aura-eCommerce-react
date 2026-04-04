import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";



export const saveCart = async (userId, cartItem) => {
    await setDoc(doc(db, "carts", userId), {
        items : cartItem
    })

}

export const getCart = async (userId) => {
    const docRef = doc(db, "carts", userId);
    const snapshot = await getDoc(docRef);

    if(snapshot.exists()){
        return snapshot.data().items;
    }else{
        return [];
    }
};