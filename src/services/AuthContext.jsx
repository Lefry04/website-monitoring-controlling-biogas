import { createContext, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from "firebase/auth";
import { auth } from "./firebase";

const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {

  // 📝 Register + kirim email verifikasi
  const register = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await sendEmailVerification(userCredential.user);
    return userCredential.user;
  };

  // 🔁 Kirim ulang email verifikasi
  const resendVerification = async () => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
    }
  };

  const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ register, resendVerification, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
