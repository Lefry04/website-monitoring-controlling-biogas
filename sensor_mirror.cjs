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
    console.log("🌡️ Menyalin data semua sensor...");

    try {
        // 🔹 Ambil data dari Realtime Database
        const [externaltempSnap, internaltempSnap, pressureSnap, phtopSnap, phbotSnap, proximitySnap, methaneSnap, carbonSnap, flowSnap] = await Promise.all([
            dbRealtime.ref("/temp_external_IDE/temperature_c").once("value"),
            dbRealtime.ref("/temp_internal_IDE").once("value"),
            dbRealtime.ref("/pressure_IDE/biogas_pressure_kpa").once("value"),
            dbRealtime.ref("/ph_sensor_IDE/value").once("value"),
            dbRealtime.ref("/ph_sensor_IDE_2/value").once("value"),
            dbRealtime.ref("/ultrasonic_IDE/distance_cm").once("value"),
            dbRealtime.ref("/methane_IDE/percent_adjusted").once("value"),
            dbRealtime.ref("/carbondioxide_IDE/co2_relative_percent").once("value"),
            dbRealtime.ref("/aliran/flow_Lmin").once("value"),
        ]);

        const tempExternal = externaltempSnap.val();
        const tempInternal = internaltempSnap.val();
        const pressure = pressureSnap.val();
        const ph = phtopSnap.val();
        const ph2 = phbotSnap.val();
        const proximity = proximitySnap.val();
        const methane = methaneSnap.val();
        const carbon = carbonSnap.val();
        const flow = flowSnap.val();

        if (
            tempExternal === null ||
            tempInternal === null ||
            tempInternal.up_c === undefined ||
            tempInternal.down_c === undefined ||
            pressure === null ||
            ph === null ||
            ph2 === null ||
            proximity === null ||
            methane === null ||
            carbon === null ||
            flow === null
        ) {
            console.log("⚠️ Data sensor tidak lengkap");
            return;
        }

        // 🔹 Koleksi Firestore
        const collRef = dbFirestore.collection("LoggingSensorLengkap");

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
            pressure_kpa: pressure,
            ph_top: ph,
            ph_bottom: ph2,
            proximity_cm: proximity,
            methane_percent: methane,
            carbon_dioxide_percent: carbon,
            flow_Lmin: flow
        });

        console.log(
            `✅ Data sensor tersimpan (${customId}) | External: ${tempExternal}°C`
        );
    } catch (err) {
        console.error("❌ Gagal mirror data sensor:", err);
    }
})();
