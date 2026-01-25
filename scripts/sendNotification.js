// import { GoogleAuth } from "google-auth-library";
// import fetch from "node-fetch";
// import admin from "firebase-admin";

// // =============================
// // LOAD SERVICE ACCOUNT
// // =============================
// if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
//   throw new Error("FIREBASE_SERVICE_ACCOUNT env not set");
// }

// const serviceAccount = JSON.parse(
//   process.env.FIREBASE_SERVICE_ACCOUNT
// );

// // =============================
// // INIT FIREBASE ADMIN (FIRESTORE)
// // =============================
// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//   });
// }

// const db = admin.firestore();
// const projectId = serviceAccount.project_id;

// // =============================
// // FCM AUTH
// // =============================
// const auth = new GoogleAuth({
//   credentials: serviceAccount,
//   scopes: ["https://www.googleapis.com/auth/firebase.messaging"],
// });

// async function sendNotification() {
//   const client = await auth.getClient();
//   const { token } = await client.getAccessToken();

//   const payload = {
//     message: {
//       topic: "iot-alert",
//       notification: {
//         title: "⚠️ Peringatan Sensor IoT",
//         body: "Nilai sensor melewati ambang batas!",
//       },
//       data: {
//         type: "ALERT",
//         source: "iot-system",
//       },
//     },
//   };

//   const url = `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`;

//   const res = await fetch(url, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(payload),
//   });

//   const result = await res.json();
//   console.log("FCM response:", result);

//   // =============================
//   // SAVE LOG TO FIRESTORE
//   // =============================
//   await db.collection("notification_logs").add({
//     title: payload.message.notification.title,
//     body: payload.message.notification.body,
//     topic: payload.message.topic,
//     type: payload.message.data.type,
//     source: payload.message.data.source,
//     createdAt: admin.firestore.FieldValue.serverTimestamp(),
//     fcmMessageId: result.name || null,
//     status: res.ok ? "SENT" : "FAILED",
//   });

//   console.log("Notification logged to Firestore");
// }

// sendNotification().catch(console.error);

import admin from "firebase-admin";
import fetch from "node-fetch";

// =====================
// INIT FIREBASE
// =====================
if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT not set");
}

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// =====================
// MAIN
// =====================
async function run() {
  console.log("🔥 PROJECT:", serviceAccount.project_id);

  // 1️⃣ ambil token dari firestore
  const usersSnap = await db.collection("users").get();

  let expoTokens = [];

  for (const userDoc of usersSnap.docs) {
    const tokenSnap = await userDoc.ref
      .collection("expoTokens")
      .get();

    tokenSnap.forEach((doc) => {
      const data = doc.data();
      if (data.token?.startsWith("ExponentPushToken")) {
        expoTokens.push(data.token);
      }
    });
  }

  console.log("📱 TOTAL TOKENS:", expoTokens.length);

  if (expoTokens.length === 0) {
    console.log("❌ TIDAK ADA TOKEN");
    return;
  }

  // 2️⃣ kirim notif ke expo
  const messages = expoTokens.map((token) => ({
    to: token,
    sound: "default",
    title: "🔥 Test Notifikasi",
    body: "Notif otomatis dari GitHub Actions",
    data: { type: "TEST" },
  }));

  const res = await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(messages),
  });

  const result = await res.json();

  // hitung sukses
  const successCount =
    result.data?.filter((r) => r.status === "ok").length || 0;

  // 3️⃣ SIMPAN LOG KE FIRESTORE
  await db.collection("notification_logs").add({
    title: "🔥 Test Notifikasi",
    body: "Notif otomatis dari GitHub Actions",
    totalTokens: expoTokens.length,
    successCount,
    status: "sent",
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  console.log("✅ NOTIF TERKIRIM & LOG TERSIMPAN");
}

run().catch(console.error);
