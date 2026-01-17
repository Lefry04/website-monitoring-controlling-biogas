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

    const [data, setData] = useState([]);

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
                    const tanggalTS = d.waktuTS ? d.waktuTS.toDate() : new Date();

                    // --- kunci hanya tanggal/bulan ---
                    const key = tanggalTS.toISOString().split("T")[0];
                    // hasil: "2026-01-09"

                    const jarak = Number(d.jarak);
                    const radius = 12 + ((11.5 - 12) / 16.5) * jarak;
                    const volume =
                        (1 / 3) * Math.PI * jarak * (12 ** 2 + 12 * radius + radius ** 2);
                    const volumeLiter = Number((volume / 1000).toFixed(1));

                    if (!grouped[key]) grouped[key] = [];
                    grouped[key].push(volumeLiter);
                });


                const averaged = Object.keys(grouped).map(key => {
                    const arr = grouped[key];
                    const avg = arr.reduce((a, b) => a + b, 0) / arr.length;

                    return {
                        waktuTS: new Date(key), // ASLI
                        label: key,
                        produksi: Number(avg.toFixed(1))
                    };
                });

                // Urutkan ascending berdasarkan timestamp
                averaged.sort((a, b) => a.waktuTS - b.waktuTS);

                // Ambil 4 tanggal terakhir
                const lastFour = averaged.slice(-4);
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
            const data = payload[0].payload;
            const date = new Date(data.waktuTS);
            return (
                <div className="bg-white p-2 rounded shadow border text-sm">
                    <p><strong>Volume:</strong> {data.produksi} L</p>
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
                        dataKey="waktuTS"
                        tick={{ fontSize: 10 }}
                        axisLine={{ stroke: "#000", strokeWidth: 0.5 }}
                        tickLine={false}
                        interval={0}
                        tickFormatter={(value) => {
                            const d = new Date(value);
                            return `${d.getDate()}/${d.getMonth() + 1}`; // tampilkan dd/mm
                        }}
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
