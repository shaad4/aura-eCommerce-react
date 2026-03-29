import { signInWithEmailAndPassword , createUserWithEmailAndPassword, updateProfile, signOut} from "firebase/auth";
import {auth} from "./firebase";


export const loginUser = async (email , password ) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user;
}

export const signupUser = async (email, password, username) => {
  const res = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await updateProfile(res.user, {
    displayName: username
  });

  return res.user;
};

export const logoutUser = async () => {
  await signOut(auth);
}