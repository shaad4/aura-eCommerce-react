import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

export const addOrder = async (order) => {
  const docRef = await addDoc(collection(db, "orders"), order);

  return {
    id: docRef.id,
    ...order
  };
};

export const fetchOrders = async (userId) => {
  const q = query(
    collection(db, "orders"),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};