import admin from "firebase-admin";
import fetch from "node-fetch";
import fs from "fs";

const serviceAccount = JSON.parse(
  fs.readFileSync("./serviceAccountKey.json", "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function sendNotif() {
  const usersSnap = await db.collection("users").get();
  console.log("👤 TOTAL USERS:", usersSnap.size);

  const expoTokens = [];

  for (const userDoc of usersSnap.docs) {
    const level1 = await db
      .collection("users")
      .doc(userDoc.id)
      .collection("expoTokens")
      .get();

    for (const uidDoc of level1.docs) {
      const level2 = await db
        .collection("users")
        .doc(userDoc.id)
        .collection("expoTokens")
        .doc(uidDoc.id)
        .collection(uidDoc.id) // ← NAMA COLLECTION TOKEN
        .get();

      level2.forEach((tokenDoc) => {
        const data = tokenDoc.data();
        if (data.token?.startsWith("ExponentPushToken")) {
          expoTokens.push(data.token);
        }
      });
    }
  }

  console.log("📱 TOTAL EXPO TOKENS:", expoTokens.length);

  if (expoTokens.length === 0) {
    console.log("❌ TIDAK ADA EXPO PUSH TOKEN");
    return;
  }

  const messages = expoTokens.map((token) => ({
    to: token,
    sound: "default",
    title: "🔥 Test Notif",
    body: "Notif berhasil dari Firestore 🚀",
  }));

  const res = await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(messages),
  });

  console.log("✅ RESPONSE:", await res.json());
}

sendNotif();
