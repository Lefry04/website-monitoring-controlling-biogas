const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

// 🔧 Ganti URL sesuai Realtime Database kamu
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tesdhtt-default-rtdb.firebaseio.com",
});

const dbRealtime = admin.database();
const dbFirestore = admin.firestore();

(async () => {
  console.log("🌡️ Menyalin data temperatur internal & external...");

  try {
    // 🔹 Ambil data dari Realtime Database
    const [externalSnap, internalSnap] = await Promise.all([
      dbRealtime.ref("/temp_external_IDE/temperature_c").once("value"),
      dbRealtime.ref("/temp_internal_IDE").once("value"),
    ]);

    const tempExternal = externalSnap.val();
    const tempInternal = internalSnap.val();

    if (
      tempExternal === null ||
      tempInternal === null ||
      tempInternal.up_c === undefined ||
      tempInternal.down_c === undefined
    ) {
      console.log("⚠️ Data temperatur tidak lengkap");
      return;
    }

    // 🔹 Koleksi Firestore
    const collRef = dbFirestore.collection("ProduksiHarianTemperatur");

    // 1️⃣ Ambil dokumen terakhir
    const lastDocSnap = await collRef
      .orderBy("index", "desc")
      .limit(1)
      .get();

    // 2️⃣ Tentukan index berikutnya
    let nextIndex = 1;
    if (!lastDocSnap.empty) {
      nextIndex = (lastDocSnap.docs[0].data().index || 0) + 1;
    }

    // 3️⃣ Custom ID
    const customId = `t${String(nextIndex).padStart(5, "0")}`;

    // 4️⃣ Timestamp Firestore
    const waktuTS = admin.firestore.Timestamp.now();

    // 5️⃣ Simpan ke Firestore
    await collRef.doc(customId).set({
      index: nextIndex,
      waktuTS,
      external_c: tempExternal,     // ✅ hanya temperature
      internal_up_c: tempInternal.up_c,
      internal_down_c: tempInternal.down_c,
    });

    console.log(
      `✅ Data temperatur tersimpan (${customId}) | External: ${tempExternal}°C`
    );
  } catch (err) {
    console.error("❌ Gagal mirror data temperatur:", err);
  }
})();
