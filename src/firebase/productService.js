import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
  updateDoc,
  runTransaction
} from "firebase/firestore";

//add product
export const addProduct = async (product) => {
    const docRef = await addDoc(collection(db, "products"), product);
    return { id : docRef.id, ...product};

};

//fetch all product
export const fetchProducts = async() => {
    const snapShot = await getDocs(collection(db, "products"));

    return snapShot.docs.map(doc => ({
        id : doc.id,
        ...doc.data()
    }));
}

export const markProductAsSold = async (id) => {
    const ref = doc(db, "products" , id);

    await runTransaction(db, async (transaction) => {
        const docSnap = await transaction.get(ref);

        if(!docSnap.exists()){
            throw new Error("Product does not exist");
        }
        const data = docSnap.data();

        if (data.isSold){
            throw new Error("Product already sold");
        }

        transaction.update(ref, {
            isSold : true
        })
    } )
};

//fetch my products
export const fetchMyProducts = async (userId) => {
    const q = query(
        collection(db, "products"),
        where("sellerId", "==", userId)
    );

    const snapShot = await getDocs(q);

    return snapShot.docs.map(doc => ({
        id : doc.id,
        ...doc.data()
    }));
};