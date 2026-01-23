// hooks/useSensorHistory.js
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { firestore } from "../services/firebase";
import { useEffect, useState } from "react";

const useSensorHistory = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const q = query(
      collection(firestore, "LoggingSensorLengkap"),
      orderBy("waktuTS", "asc")
    );

    const unsub = onSnapshot(q, (snap) => {
      setData(
        snap.docs.map(doc => {
          const ts = doc.data().waktuTS;

          return {
            id: doc.id,
            ...doc.data(),
            dateObj: ts?.toDate(),                    // ✅ Date object
            waktu: ts?.toDate().toLocaleTimeString() // ✅ String
          };
        })
      );
    });

    return () => unsub();
  }, []);

  return data;
};

export default useSensorHistory;
