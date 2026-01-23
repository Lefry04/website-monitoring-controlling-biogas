// import { GoogleAuth } from "google-auth-library";
// import fetch from "node-fetch";

// if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
//   throw new Error("FIREBASE_SERVICE_ACCOUNT env not set");
// }

// const serviceAccount = JSON.parse(
//   process.env.FIREBASE_SERVICE_ACCOUNT
// );

// const projectId = serviceAccount.project_id;

// const auth = new GoogleAuth({
//   credentials: serviceAccount,
//   scopes: ["https://www.googleapis.com/auth/firebase.messaging"],
// });

// async function sendNotification() {
//   const client = await auth.getClient();
//   const { token } = await client.getAccessToken();

//   const url = `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`;

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

//   const res = await fetch(url, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(payload),
//   });

//   console.log("FCM response:", await res.text());
// }

// sendNotification().catch(console.error);

import { GoogleAuth } from "google-auth-library";
import fetch from "node-fetch";
import admin from "firebase-admin";

// =============================
// LOAD SERVICE ACCOUNT
// =============================
if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT env not set");
}

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT
);

// =============================
// INIT FIREBASE ADMIN (FIRESTORE)
// =============================
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
const projectId = serviceAccount.project_id;

// =============================
// FCM AUTH
// =============================
const auth = new GoogleAuth({
  credentials: serviceAccount,
  scopes: ["https://www.googleapis.com/auth/firebase.messaging"],
});

async function sendNotification() {
  const client = await auth.getClient();
  const { token } = await client.getAccessToken();

  const payload = {
    message: {
      topic: "iot-alert",
      notification: {
        title: "⚠️ Peringatan Sensor IoT",
        body: "Nilai sensor melewati ambang batas!",
      },
      data: {
        type: "ALERT",
        source: "iot-system",
      },
    },
  };

  const url = `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();
  console.log("FCM response:", result);

  // =============================
  // SAVE LOG TO FIRESTORE
  // =============================
  await db.collection("notification_logs").add({
    title: payload.message.notification.title,
    body: payload.message.notification.body,
    topic: payload.message.topic,
    type: payload.message.data.type,
    source: payload.message.data.source,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    fcmMessageId: result.name || null,
    status: res.ok ? "SENT" : "FAILED",
  });

  console.log("Notification logged to Firestore");
}

sendNotification().catch(console.error);
