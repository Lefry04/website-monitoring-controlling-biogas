// import { createContext, useContext, useEffect, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "./firebase";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, (u) => {
//       setUser(u);
//       setLoading(false);
//     });
//     return () => unsub();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

// import { createContext, useContext } from "react";
// import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
// import { auth } from "./firebase";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {

//   const register = (email, password) => {
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   return (
//     <AuthContext.Provider value={{ register }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// import { createContext, useContext } from "react";
// import {
//   createUserWithEmailAndPassword,
//   sendEmailVerification
// } from "firebase/auth";
// import { auth } from "./firebase";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {

//   const register = async (email, password) => {
//     // 1️⃣ Buat user
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );

//     // 2️⃣ Kirim email verifikasi
//     await sendEmailVerification(userCredential.user);

//     return userCredential.user;
//   };

//   return (
//     <AuthContext.Provider value={{ register }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

import { createContext, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification
} from "firebase/auth";
import { auth } from "./firebase";

const AuthContext = createContext();

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

  return (
    <AuthContext.Provider value={{ register, resendVerification }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
