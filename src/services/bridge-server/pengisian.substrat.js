import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { firestore } from "./firebase.bridge.js";

export const simpanSubstrat = async (substrat) => {
  await addDoc(
    collection(firestore, "PengisianSubstrat"),
    {
      waktu: serverTimestamp(), // 🔥 timestamp firestore
      substrat: substrat.map((s) => ({
        jenis: s.jenis,
        ukuran: Number(s.ukuran),
        satuan: s.satuan,
      })),
    }
  );
};
