import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { firestore } from "../../../services/firebase"; // sesuaikan path

const getTemperatureData = async () => {
  const q = query(
    collection(firestore, "ProduksiHarianTemperatur"),
    orderBy("waktuTS", "asc"),
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    time: doc.data().waktuTS.toDate().toLocaleTimeString(),
    external: doc.data().external_c,
    up: doc.data().internal_up_c,
    down: doc.data().internal_down_c,
  }));
};

export { getTemperatureData };
