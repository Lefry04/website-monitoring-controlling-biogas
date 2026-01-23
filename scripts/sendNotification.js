import { GoogleAuth } from "google-auth-library";
import fetch from "node-fetch";

if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT env not set");
}

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT
);

const projectId = serviceAccount.project_id;

const auth = new GoogleAuth({
  credentials: serviceAccount,
  scopes: ["https://www.googleapis.com/auth/firebase.messaging"],
});

async function sendNotification() {
  const client = await auth.getClient();
  const { token } = await client.getAccessToken();

  const url = `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`;

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

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  console.log("FCM response:", await res.text());
}

sendNotification().catch(console.error);
