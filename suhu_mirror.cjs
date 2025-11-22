// const admin = require("firebase-admin");
// const cron = require("node-cron");
// const serviceAccount = require("./serviceAccountKey.json");

// // 🔧 Ganti URL sesuai Realtime Database kamu
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://tesdhtt-default-rtdb.firebaseio.com",
// });

// const dbRealtime = admin.database();
// const dbFirestore = admin.firestore();

// // 🕐 Jalankan tiap 1 menit
// cron.schedule("*/1 * * * *", async () => {
//   console.log("⏰ Menyalin data dari Realtime Database ke Firestore...");

//   try {
//     const snapshot = await dbRealtime.ref("/suhu/"jarak).once("value");
//     const jarak = snapshot.val();

//     if (jarak !== null && jarak !== undefined) {
//       const collRef = dbFirestore.collection("ProduksiHarianUltrasonik");

//       // ✅ 1️⃣ Ambil dokumen terakhir dari Firestore
//       const lastDocSnap = await collRef.orderBy("index", "desc").limit(1).get();

//       // ✅ 2️⃣ Tentukan nomor urut berikutnya
//       let nextIndex = 1;
//       if (!lastDocSnap.empty) {
//         nextIndex = (lastDocSnap.docs[0].data().index || 0) + 1;
//       }

//       // ✅ 3️⃣ Buat ID custom seperti u001, u002, dst
//       const customId = `u${String(nextIndex).padStart(5, "0")}`;

//       // ✅ 4️⃣ Format waktu agar jadi tanggal dan jam (lokal Indonesia)
//       const now = new Date();
//       const waktu = now
//         .toLocaleString("id-ID", {
//           timeZone: "Asia/Jakarta",
//           hour12: false,
//         })
//         .replace(",", "");

//       // ✅ 5️⃣ Simpan ke Firestore
//       await collRef.doc(customId).set({
//         index: nextIndex,
//         waktu, // waktu dalam format lokal
//         jarak, // data dari Realtime Database
//       });

//       console.log(`✅ Berhasil simpan data sebagai ${customId} (${waktu})`);
//     } else {
//       console.log("⚠️ Tidak ada data di Realtime Database");
//     }
//   } catch (err) {
//     console.error("❌ Gagal sinkronisasi:", err);
//   }
// });
