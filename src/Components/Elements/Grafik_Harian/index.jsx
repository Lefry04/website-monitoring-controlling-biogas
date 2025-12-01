// import {
//     ResponsiveContainer,
//     ComposedChart,
//     XAxis,
//     YAxis,
//     Tooltip,
//     Bar,
//     Scatter,
//     CartesianGrid,
// } from "recharts";
import {
    ResponsiveContainer,
    ComposedChart,
    XAxis,
    YAxis,
    Tooltip,
    Bar,
    Scatter,
} from "recharts";

import { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { firestore } from "../../../services/firebase";


const data = [
    { tanggal: "22/09", produksi: 350 },
    { tanggal: "23/09", produksi: 220 },
    { tanggal: "24/09", produksi: 310 },
    { tanggal: "25/09", produksi: 750 },
];

export default function ChartProduksiHarian({ title }) {

    // const { title } = props;

    const [data, setData] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const q = query(
    //                 collection(firestore, "ProduksiHarianUltrasonik"),
    //                 orderBy("index", "desc"),
    //                 limit(4)
    //             );

    //             const snap = await getDocs(q);

    //             const fetched = snap.docs.map(doc => {
    //                 const d = doc.data();

    //                 // Convert waktu → tanggal "dd/mm"
    //                 let tanggal = d.waktu;
    //                 if (typeof tanggal === "string") {
    //                     const parts = tanggal.split(" ")[0].split("/"); // "21/11/2025"
    //                     tanggal = `${parts[0]}/${parts[1]}`; // "21/11"
    //                 }

    //                 return {
    //                     tanggal: tanggal,
    //                     produksi: d.jarak, // pakai JARAK sebagai produksi
    //                     index: d.index
    //                 };
    //             });

    //             // sort ascending supaya tanggal lama → baru
    //             const sorted = fetched.sort((a, b) => a.index - b.index);

    //             setData(sorted);

    //         } catch (err) {
    //             console.log("Error fetching data:", err);
    //         }
    //     };

    //     fetchData();
    // }, []);


    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const q = query(
    //                 collection(firestore, "ProduksiHarianUltrasonik"),
    //                 orderBy("index", "desc"),
    //                 limit(4)
    //             );

    //             const snap = await getDocs(q);

    //             const fetched = snap.docs.map((doc) => {
    //                 const d = doc.data();

    //                 // --- FORMAT TANGGAL ---
    //                 let tanggal = d.waktu;
    //                 if (typeof tanggal === "string") {
    //                     const parts = tanggal.split(" ")[0].split("/");
    //                     tanggal = `${parts[0]}/${parts[1]}`; // "21/11"
    //                 }

    //                 // --- HITUNG VOLUME ---
    //                 const jarak = Number(d.jarak);

    //                 // radius = 12 + ((11.5 - 12) / 16.5) * jarak
    //                 const radius =
    //                     12 + ((11.5 - 12) / 16.5) * jarak;

    //                 // Volume kerucut terpancung (cm³)
    //                 // V = 1/3 * π * t * (R² + Rr + r²)
    //                 const volume =
    //                     (1 / 3) *
    //                     Math.PI *
    //                     jarak *
    //                     (12 ** 2 + 12 * radius + radius ** 2);

    //                 // cm³ → liter + bulatkan 1 desimal
    //                 const volumeLiter = Number((volume / 1000).toFixed(1));

    //                 return {
    //                     tanggal,
    //                     produksi: volumeLiter, // ← PAKAI VOLUME
    //                     jarak: d.jarak,
    //                     index: d.index,
    //                 };
    //             });

    //             // Balik urutan → lama ke baru
    //             setData(fetched.sort((a, b) => a.index - b.index));

    //         } catch (err) {
    //             console.log("Error fetching data:", err);
    //         }
    //     };

    //     fetchData();
    // }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1) Ambil semua data (atau bisa dibatasi jika terlalu banyak)
                const q = query(
                    collection(firestore, "ProduksiHarianUltrasonik"),
                    orderBy("index", "desc")
                );

                const snap = await getDocs(q);

                // 2) Kelompokkan berdasarkan tanggal (dd/mm)
                const grouped = {};

                snap.docs.forEach(doc => {
                    const d = doc.data();

                    // format tanggal dd/mm
                    let tanggal = d.waktu;
                    if (typeof tanggal === "string") {
                        const parts = tanggal.split(" ")[0].split("/");
                        tanggal = `${parts[0]}/${parts[1]}`; // "21/11"
                    }

                    // Hitung volume
                    const jarak = Number(d.jarak);

                    const radius = 12 + ((11.5 - 12) / 16.5) * jarak;

                    const volume =
                        (1 / 3) *
                        Math.PI *
                        jarak *
                        (12 ** 2 + 12 * radius + radius ** 2);

                    const volumeLiter = Number((volume / 1000).toFixed(1));

                    // masukkan ke grup
                    if (!grouped[tanggal]) grouped[tanggal] = [];
                    grouped[tanggal].push(volumeLiter);
                });

                // 3) Hitung rata-rata per tanggal
                const averaged = Object.keys(grouped).map(tanggal => {
                    const arr = grouped[tanggal];
                    const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
                    return {
                        tanggal,
                        produksi: Number(avg.toFixed(1))
                    };
                });

                // 4) Urutkan berdasarkan tanggal terbaru → lama
                const sorted = averaged.sort((a, b) => {
                    const [da, ma] = a.tanggal.split("/");
                    const [db, mb] = b.tanggal.split("/");
                    return new Date(2025, ma - 1, da) - new Date(2025, mb - 1, db);
                });

                // 5) Ambil 4 tanggal terakhir
                const lastFour = sorted.slice(-4);

                setData(lastFour);

            } catch (err) {
                console.log("Error fetching data:", err);
            }
        };

        fetchData();
    }, []);

    const lastValue = data.length > 0 ? data[data.length - 1].produksi : 0;


    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload; // data point yang sedang di-hover
            return (
                <div className="bg-white p-2 rounded shadow border text-sm">
                    <p><strong>Volume:</strong> {data.produksi}</p>
                </div>
            );
        }
        return null;
    };


    return (
        <div className="p-4 w-full h-full flex flex-col justify-between">
            {/* Judul */}
            <p className="text-sm font-semibold text-gray-800 mb-1">
                {title}
            </p>

            {/* Grafik */}
            <div className="w-full">
                <ComposedChart
                    data={data}
                    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                    style={{ width: '100%', height: '100%', aspectRatio: 1.618 }}

                >
                    {/* <CartesianGrid vertical={false} stroke="#e5e7eb" /> */}
                    <XAxis
                        dataKey="tanggal"
                        tick={{ fontSize: 10 }}
                        axisLine={{ stroke: "#000", strokeWidth: 0.5 }}
                        tickLine={false}
                        interval={0}
                    />
                    <YAxis
                        domain={[0, 7]}
                        ticks={[0, 1, 3, 5, 7]}
                        tick={{ fontSize: 9 }}
                        axisLine={{ stroke: "#000", strokeWidth: 0.5 }}
                        tickLine={false}
                    />
                    <Tooltip
                        content={<CustomTooltip />}
                    />

                    {/* Garis vertikal */}
                    <Bar dataKey="produksi" barSize={2} fill="#000" />

                    {/* Titik di atas batang */}
                    <Scatter dataKey="produksi" fill="#000" />
                </ComposedChart>
            </div>

            {/* Keterangan di bawah grafik */}
            <p className="text-xs text-gray-600 text-center">
                Rata-rata produksi gas: {lastValue} L / hari
            </p>
        </div>
    );
}
