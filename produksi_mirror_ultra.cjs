const admin = require("firebase-admin");
const cron = require("node-cron");
const serviceAccount = require("./serviceAccountKey.json");

// 🔧 Ganti URL sesuai Realtime Database kamu
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tesdhtt-default-rtdb.firebaseio.com",
});

const dbRealtime = admin.database();
const dbFirestore = admin.firestore();

// 🕐 Jalankan tiap 1 menit
(async () => {
  console.log("⏰ Menyalin data dari Realtime Database ke Firestore...");

  try {
    const snapshot = await dbRealtime.ref("/ultrasonic_IDE/distance_cm").once("value");
    const jarakAsli = snapshot.val();

    if (jarakAsli !== null && jarakAsli !== undefined) {
      const jarak = 36.5 - jarakAsli;

      const collRef = dbFirestore.collection("ProduksiHarianUltrasonik");

      // 1️⃣ Ambil dokumen terakhir
      const lastDocSnap = await collRef
        .orderBy("index", "desc")
        .limit(1)
        .get();

      // 2️⃣ Tentukan nomor urut
      let nextIndex = 1;
      if (!lastDocSnap.empty) {
        nextIndex = (lastDocSnap.docs[0].data().index || 0) + 1;
      }

      // 3️⃣ ID custom
      const customId = `u${String(nextIndex).padStart(5, "0")}`;

      // 4️⃣ Buat timestamp Firestore
      const waktuTS = admin.firestore.Timestamp.now();

      // 5️⃣ Simpan ke Firestore
      await collRef.doc(customId).set({
        index: nextIndex,
        waktuTS,   // ⬅️ sekarang pakai Firestore Timestamp
        jarak,
      });

      console.log(`✅ Berhasil simpan data sebagai ${customId} (TS: ${waktuTS.toDate()})`);
    } else {
      console.log("⚠️ Tidak ada data di Realtime Database");
    }
  } catch (err) {
    console.error("❌ Gagal sinkronisasi:", err);
  }
})();
