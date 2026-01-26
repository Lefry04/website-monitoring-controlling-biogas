// import admin from "firebase-admin";
// import fetch from "node-fetch";

// // =====================
// // INIT FIREBASE
// // =====================
// if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
//   throw new Error("FIREBASE_SERVICE_ACCOUNT not set");
// }

// const serviceAccount = JSON.parse(
//   process.env.FIREBASE_SERVICE_ACCOUNT
// );

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// const db = admin.firestore();

// // =====================
// // MAIN
// // =====================
// async function run() {
//   console.log("🔥 PROJECT:", serviceAccount.project_id);

//   // 1️⃣ ambil token dari firestore
//   const usersSnap = await db.collection("users").get();

//   let expoTokens = [];

//   for (const userDoc of usersSnap.docs) {
//     const tokenSnap = await userDoc.ref
//       .collection("expoTokens")
//       .get();

//     tokenSnap.forEach((doc) => {
//       const data = doc.data();
//       if (data.token?.startsWith("ExponentPushToken")) {
//         expoTokens.push(data.token);
//       }
//     });
//   }

//   console.log("📱 TOTAL TOKENS:", expoTokens.length);

//   if (expoTokens.length === 0) {
//     console.log("❌ TIDAK ADA TOKEN");
//     return;
//   }

//   // 2️⃣ kirim notif ke expo
//   const messages = expoTokens.map((token) => ({
//     to: token,
//     sound: "default",
//     title: "🔥 Test Notifikasi",
//     body: "Notif otomatis dari GitHub Actions",
//     data: { type: "TEST" },
//   }));

//   const res = await fetch("https://exp.host/--/api/v2/push/send", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//     body: JSON.stringify(messages),
//   });

//   const result = await res.json();

//   // hitung sukses
//   const successCount =
//     result.data?.filter((r) => r.status === "ok").length || 0;

//   // 3️⃣ SIMPAN LOG KE FIRESTORE
//   await db.collection("notification_logs").add({
//     title: "🔥 Test Notifikasi",
//     body: "Notif otomatis dari GitHub Actions",
//     totalTokens: expoTokens.length,
//     successCount,
//     status: "sent",
//     createdAt: admin.firestore.FieldValue.serverTimestamp(),
//   });

//   console.log("✅ NOTIF TERKIRIM & LOG TERSIMPAN");
// }

// run().catch(console.error);

// import admin from "firebase-admin";
// import fetch from "node-fetch";

// // 🔑 SERVICE ACCOUNT
// import fs from "fs";

// const serviceAccount = JSON.parse(
//   fs.readFileSync("./serviceAccountKey.json", "utf8")
// );

// // 🔥 INIT FIREBASE ADMIN
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://tesdhtt-default-rtdb.firebaseio.com",
// });

// const rtdb = admin.database();
// const firestore = admin.firestore();

// async function run() {
//   console.log("🚀 TEST PH NOTIF (LOCAL)");

//   // 1️⃣ Ambil nilai pH
//   const snap = await rtdb.ref("ph_sensor_IDE/value").once("value");
//   const ph = snap.val();

//   console.log("📊 pH:", ph);

//   let status = null;
//   if (ph < 6.5) status = "asam";
//   if (ph > 8.5) status = "basa";

//   if (!status) {
//     console.log("✅ pH normal, stop");
//     return;
//   }

//   // 2️⃣ Anti spam
//   const statusRef = firestore.doc("system/ph");
//   const lastSnap = await statusRef.get();
//   const last = lastSnap.exists ? lastSnap.data().status : null;

//   if (last === status) {
//     console.log("⏸️ Status sama, tidak kirim notif");
//     return;
//   }

//   // 3️⃣ Ambil Expo tokens
//   const usersSnap = await firestore.collection("users").get();
//   const tokens = [];

//   for (const user of usersSnap.docs) {
//     const tokenSnap = await user.ref.collection("expoTokens").get();
//     tokenSnap.forEach(doc => tokens.push(doc.id));
//   }

//   console.log("📱 TOTAL TOKEN:", tokens.length);

//   if (tokens.length === 0) {
//     console.log("❌ Tidak ada token");
//     return;
//   }

//   // 4️⃣ Kirim notif
//   const messages = tokens.map(token => ({
//     to: token,
//     sound: "default",
//     title: "⚠️ Peringatan pH Biogas",
//     body:
//       status === "asam"
//         ? `pH terlalu asam (${ph})`
//         : `pH terlalu basa (${ph})`,
//   }));

//   await fetch("https://exp.host/--/api/v2/push/send", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(messages),
//   });

//   // 5️⃣ Simpan status baru
//   await statusRef.set({
//     status,
//     value: ph,
//     updatedAt: admin.firestore.FieldValue.serverTimestamp(),
//   });

//   console.log("🎉 NOTIF TERKIRIM:", status);
// }

// run().catch(console.error);

import admin from "firebase-admin";
import fetch from "node-fetch";


if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT not set");
}

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://tesdhtt-default-rtdb.firebaseio.com",
});

const db = admin.firestore();
const rtdb = admin.database();

// =====================
// MAIN
// =====================
async function run() {
  console.log("🔥 PH NOTIFICATION CHECKER");

  // 1️⃣ AMBIL pH DARI RTDB
  const phSnap = await rtdb
    .ref("ph_sensor_IDE/value")
    .once("value");

  const ph = phSnap.val();
  console.log("📊 pH:", ph);

  if (ph === null || ph === undefined) {
    console.log("❌ pH tidak ada");
    return;
  }

  // 2️⃣ TENTUKAN STATUS
  let status = null;
  let message = "";

  if (ph < 6.5) {
    status = "asam";
    message = `⚠️ pH terlalu ASAM (${ph})`;
  } else if (ph > 8.5) {
    status = "basa";
    message = `⚠️ pH terlalu BASA (${ph})`;
  } else {
    console.log("✅ pH normal");
    return;
  }

  // 3️⃣ CEK STATUS TERAKHIR (ANTI SPAM)
  const statusRef = db.doc("system/ph");
  const lastSnap = await statusRef.get();
  const lastStatus = lastSnap.exists
    ? lastSnap.data().status
    : null;

  if (lastStatus === status) {
    console.log("⏸️ Status sama, tidak kirim notif");
    return;
  }

  // 4️⃣ AMBIL EXPO PUSH TOKEN
  const usersSnap = await db.collection("users").get();
  let tokens = [];

  for (const userDoc of usersSnap.docs) {
    const tokenSnap = await userDoc.ref
      .collection("expoTokens")
      .get();

    tokenSnap.forEach((doc) => {
      const t = doc.data().token;
      if (t?.startsWith("ExponentPushToken")) {
        tokens.push(t);
      }
    });
  }

  console.log("📱 TOTAL TOKEN:", tokens.length);

  if (tokens.length === 0) {
    console.log("❌ Tidak ada token");
    return;
  }

  // 5️⃣ KIRIM NOTIF KE HP
  const messages = tokens.map((token) => ({
    to: token,
    sound: "default",
    title: "🚨 Peringatan pH Biogas",
    body: message,
    data: {
      type: "PH_ALERT",
      value: ph,
      status,
    },
  }));

  const res = await fetch(
    "https://exp.host/--/api/v2/push/send",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(messages),
    }
  );

  const result = await res.json();
  console.log("📦 EXPO:", result);

  // 6️⃣ SIMPAN LOG NOTIF
  await db.collection("notification_logs").add({
    sensor: "ph",
    value: ph,
    status,
    totalTokens: tokens.length,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  // 7️⃣ SIMPAN STATUS BARU
  await statusRef.set({
    status,
    value: ph,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  console.log("🚀 NOTIF TERKIRIM:", status);
}

run().catch(console.error);
