import fs from "fs";
import { GoogleAuth } from "google-auth-library";
import fetch from "node-fetch";

// load service account dari env
const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT
);

const projectId = serviceAccount.project_id;

// auth Google (OAuth2)
const auth = new GoogleAuth({
  credentials: serviceAccount,
  scopes: ["https://www.googleapis.com/auth/firebase.messaging"],
});

async function sendNotification() {
  const client = await auth.getClient();
  const accessToken = await client.getAccessToken();

  const url = `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`;

  const message = {
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
      Authorization: `Bearer ${accessToken.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });

  const text = await res.text();
  console.log("FCM response:", text);
}

sendNotification().catch(console.error);
