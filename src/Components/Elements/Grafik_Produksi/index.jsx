import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ReferenceArea,
    ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { firestore } from "../../../services/firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function Example() {

    const [data, setData] = useState([]);

    useEffect(() => {
        const unsub = onSnapshot(collection(firestore, "ProduksiHarianUltrasonik"), (snapshot) => {

            const newData = snapshot.docs.map((doc) => {
                const d = doc.data();
                const waktu = d.waktu;

                // Ubah format "7/11/2025 13.43.06" → Date object
                let dateObj = null;
                if (waktu) {
                    try {
                        const [tgl, jam] = waktu.split(" ");
                        const [day, month, year] = tgl.split("/");
                        const [hour, minute, second] = jam.split(".");
                        const isoString = `${year}-${month.padStart(
                            2,
                            "0"
                        )}-${day.padStart(2, "0")}T${hour}:${minute}:${second}`;
                        dateObj = new Date(isoString);
                    } catch (error) {
                        console.warn("Format waktu tidak dikenali:", waktu);
                    }
                }

                return {
                    id: doc.id,
                    ...d,
                    dateObj,
                };
            });

            // Urutkan data berdasarkan waktu
            newData.sort((a, b) => a.dateObj - b.dateObj);
            console.log("Data Firestore:", newData);
            setData(newData);
        });

        return () => unsub();
    }, []);

    if (!data.length)
        return <div className="text-center text-gray-500">Memuat data dari Firestore...</div>;

    const total = data.length;
    const numSections = 3;
    const sectionSize = Math.ceil(total / numSections);
    const colors = [
        "rgba(171, 255, 15, 0.2)",
        "rgba(255, 0, 0, 0.2)",
        "rgba(255, 182, 36, 0.2)",
    ];
    const sections = Array.from({ length: numSections }, (_, i) => ({
        x1: i * sectionSize,
        x2: Math.min((i + 1) * sectionSize, total - 1),
        color: colors[i % 3],
    }));

    // const dataWithIndex = data.map((d, i) => ({ ...d, idx: i }));

    // const dataWithIndex = data.map((d, i) => {
    //     const jarak = Number(d.jarak);

    //     // Hitung jari-jari
    //     const radius = 12 + ((11.5 - 12) / 16.5) * jarak;

    //     // Hitung volume (m³)
    //     const volume = (1 / 3) * Math.PI * jarak * (12 ** 2 + 12 * radius + radius ** 2);

    //     return {
    //         ...d,
    //         idx: i,
    //         radius,
    //         volume,  // ← ini yang dipakai grafik
    //     };
    // });

    const dataWithIndex = data.map((d, i) => {
        const jarak = Number(d.jarak);

        // Hitung jari-jari
        const radius = 12 + ((11.5 - 12) / 16.5) * jarak;

        // Hitung volume (cm³)
        const volume = (1 / 3) * Math.PI * jarak * (12 ** 2 + 12 * radius + radius ** 2);

        // Ubah ke liter + bulatkan 1 angka di belakang koma
        const volumeLiter = volume / 1000;
        const volumeFinal = Number(volumeLiter.toFixed(1));

        return {
            ...d,
            idx: i,
            radius,
            volume: volumeFinal,   // ← ini yang dipakai grafik
        };
    });

    const CustomTooltip = ({ active, payload }) => {
        if (!active || !payload || !payload.length) return null;

        const item = payload[0].payload;

        return (
            <div
                style={{
                    background: "white",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                }}
            >
                <div style={{ marginTop: "6px" }}>
                    <b>Volume:</b> {item.volume} liter
                </div>
            </div>
        );
    };

    return (
        <LineChart
            data={dataWithIndex}
            margin={{
                top: 5,
                right: 40,
                left: 10,
                bottom: 5,
            }}
            style={{ width: '100%', height: '100%', aspectRatio: 1.618 }}
        >
            <XAxis
                xAxisId="hour"
                dataKey="idx"
                type="number"
                domain={[0, total - 1]}
                tickFormatter={(i) => {
                    const t = dataWithIndex[Math.floor(i)]?.dateObj;
                    if (!t) return "";
                    return t.toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                    });
                }}
                interval={0}
                ticks={dataWithIndex.map((_, i) => i)}
                height={40}
                tick={{ fontSize: 10 }}
                label={{
                    value: "Waktu Pengukuran",
                    position: "outsideBottom",
                    dy: 15,
                }}
                axisLine={false}
                tickLine={false}
            />

            {/* ✅ Sumbu X atas → tanggal */}
            <XAxis
                xAxisId="date"
                dataKey="idx"
                type="number"
                orientation="bottom"
                domain={[0, total - 1]}
                tickFormatter={(i) => {
                    const t = dataWithIndex[Math.floor(i)]?.dateObj;
                    if (!t) return "";
                    return t.toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                    });
                }}
                allowDuplicatedCategory={false}
                tick={{ fontSize: 11, fontWeight: "bold" }}
                ticks={dataWithIndex.map((_, i) => i)}
                interval={0}
                height={30}
            />

            <YAxis
                width={60}
                domain={[3, 6]}
                tick={{ fontSize: 12 }}
                label={{
                    value: "Produksi Gas (L)", // ✅ label kiri
                    angle: -90,
                    position: "outsideLeft",
                    dy: 30,
                    dx: -20,
                }}
            />


            {/* <Tooltip labelFormatter={(i) => dataWithIndex[Math.floor(i)]?.time || ""} /> */}
            <Tooltip
                content={<CustomTooltip />}
            />

            {/* <Legend /> */}

            {sections.map((s, i) => (
                <ReferenceArea
                    key={i}
                    x1={s.x1}
                    x2={s.x2}
                    fill={s.color}
                    fillOpacity={0.3}
                />
            ))}

            <Line type="monotone" dataKey="volume" stroke="#000000" activeDot={{ r: 6 }} />
        </LineChart>
    );
}

