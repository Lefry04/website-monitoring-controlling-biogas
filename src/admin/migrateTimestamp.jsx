import { collection, getDocs, updateDoc, doc, Timestamp } from "firebase/firestore";
import { firestore } from "../services/firebase";

export async function migrateWaktuToTimestamp() {
    const snap = await getDocs(collection(firestore, "ProduksiHarianUltrasonik"));

    for (const d of snap.docs) {
        const data = d.data();

        // SKIP jika sudah punya timestamp
        if (data.waktuTS) continue;

        const waktu = data.waktu; 
        if (!waktu) continue;

        try {
            const [tgl, jam] = waktu.split(" ");
            const [day, month, year] = tgl.split("/");
            const [hour, minute, second] = jam.split(".");

            const iso = `${year}-${month}-${day}T${hour}:${minute}:${second}`;
            const newDate = new Date(iso);

            await updateDoc(doc(firestore, "ProduksiHarianUltrasonik", d.id), {
                waktuTS: Timestamp.fromDate(newDate),
            });

            console.log("UPDATED:", d.id);
        } catch (err) {
            console.error("GAGAL PARSE:", waktu, err);
        }
    }
}
