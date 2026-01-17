// import express from "express";
// import cors from "cors";
// import { simpanSubstrat } from "./pengisian.substrat.js";

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.post("/kirim-substrat", async (req, res) => {
//   try {
//     const { substrat } = req.body;

//     if (!Array.isArray(substrat)) {
//       return res.status(400).json({ error: "Format substrat salah" });
//     }

//     await simpanSubstrat(substrat);

//     res.json({ success: true });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false });
//   }
// });

// app.listen(5000, () => {
//   console.log("🔥 Bridge API jalan di http://localhost:5000");
// });

import express from "express";
import cors from "cors";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { firestore } from "./firebase.bridge.js";

const app = express();

// =========================
// MIDDLEWARE
// =========================
app.use(cors());
app.use(express.json());

const PORT = 5050;

// =========================
// POST KIRIM SUBSTRAT
// =========================
// app.post("/kirim-substrat", async (req, res) => {
//   try {
//     const { substrat } = req.body;

//     if (!substrat || !Array.isArray(substrat)) {
//       return res.status(400).json({ message: "Data substrat tidak valid" });
//     }

//     await addDoc(collection(firestore, "PengisianSubstrat"), {
//       waktu: serverTimestamp(),
//       substrat: substrat,
//     });

//     res.json({ message: "Pengisian substrat berhasil disimpan" });
//   } catch (error) {
//     console.error("❌ Gagal simpan substrat:", error);
//     res.status(500).json({ message: "Gagal menyimpan data" });
//   }
// });

app.post("/kirim-substrat", async (req, res) => {
    console.log("🔥 ROUTE /kirim-substrat TERPANGGIL");

    try {
        console.log("📥 BODY:", req.body);

        const { substrat } = req.body;

        if (!substrat || !Array.isArray(substrat)) {
            console.log("❌ SUBSTRAT INVALID");
            return res.status(400).json({ message: "Data substrat tidak valid" });
        }

        await addDoc(collection(firestore, "PengisianSubstrat"), {
            waktu: serverTimestamp(),
            substrat,
        });

        console.log("✅ DATA DISIMPAN KE FIRESTORE");

        return res.json({
            message: "Pengisian substrat berhasil disimpan",
        });
    } catch (err) {
        console.error("🔥 ERROR:", err);
        return res.status(500).json({ message: "Server error" });
    }
});

// =========================
// SERVER
// =========================
app.listen(PORT, "0.0.0.0", () => {
    console.log("🚀 Bridge server aktif di port 5050");
});
