import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ReferenceArea,
    ResponsiveContainer,
} from "recharts";
import { useEffect, useState, useRef } from "react";
// import { firestore } from "../../../services/firebase";
// import { collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";

export default function Grafik({ full = false, data = [], focusdate }) {

        const scrollRef = useRef(null);

            const ITEM_WIDTH = 70;

            const dataWithIndex = data.map((d, i) => {
        const jarak = Number(d.jarak);
        const radius = 12 + ((11.5 - 12) / 16.5) * jarak;
        const volume =
            (1 / 3) * Math.PI * jarak * (12 ** 2 + 12 * radius + radius ** 2);

        return {
            ...d,
            idx: i,
            volume: Math.round(volume / 1000),
        };
    });

    useEffect(() => {
        if (!full || !focusdate || !scrollRef.current) return;

        const target = new Date(focusdate);
        target.setHours(0, 0, 0, 0);

        const idx = dataWithIndex.findIndex(d => {
            const dDate = new Date(d.dateObj);
            dDate.setHours(0, 0, 0, 0);
            return dDate >= target;
        });

        if (idx >= 0) {
            scrollRef.current.scrollLeft = idx * ITEM_WIDTH;
        }
    }, [focusdate, dataWithIndex, full]);

      if (!data.length) {
        return (
            <div className="text-center text-gray-400">
                Memuat data grafik...
            </div>
        );
    }


    // const [data, setData] = useState([]);

    // ======================
    // 🔥 FETCH DATA
    // ======================
    // useEffect(() => {
    //     const q = full
    //         ? query(
    //             collection(firestore, "ProduksiHarianUltrasonik"),
    //             orderBy("waktuTS", "asc")
    //         )
    //         : query(
    //             collection(firestore, "ProduksiHarianUltrasonik"),
    //             orderBy("waktuTS", "desc"),
    //             limit(12)
    //         );

    //     const unsub = onSnapshot(q, (snapshot) => {
    //         const newData = snapshot.docs
    //             .map((doc) => {
    //                 const d = doc.data();
    //                 return {
    //                     id: doc.id,
    //                     ...d,
    //                     dateObj: d.waktuTS?.toDate(),
    //                 };
    //             })
    //             .sort((a, b) => a.dateObj - b.dateObj);

    //         setData(newData);
    //     });

    //     return () => unsub();
    // }, [full]);


    // useEffect(() => {
    //     if (full && scrollRef.current && data.length) {
    //         // tunggu render selesai
    //         setTimeout(() => {
    //             scrollRef.current.scrollLeft =
    //                 scrollRef.current.scrollWidth;
    //         }, 100);
    //     }
    // }, [full, data]);



  

    // ======================
    // 🔢 OLAH DATA (SAMA DGN SEBELUMNYA)
    // ======================
    

     

    const total = dataWithIndex.length;

    // ======================
    // 🎨 REFERENCE AREA (SAMA)
    // ======================
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
        color: colors[i % colors.length],
    }));

    // ======================
    // 🎯 TOOLTIP (SAMA)
    // ======================
    const CustomTooltip = ({ active, payload }) => {
        if (!active || !payload?.length) return null;
        const item = payload[0].payload;

        return (
            <div className="bg-white p-2 rounded-lg shadow text-sm">
                <b>Volume:</b> {item.volume} liter
            </div>
        );
    };


   


    // ======================
    // 📊 ISI CHART (DIPAKAI 2 MODE)
    // ======================
    const Chart = (
        <div style={{ width: "100%", height: "100%" }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={dataWithIndex}
                    margin={{ top: 10, right: 40, left: 10, bottom: 20 }}
                >
                    {/* X AXIS JAM */}
                    <XAxis
                        xAxisId="hour"
                        dataKey="idx"
                        type="number"
                        domain={[0, total - 1]}
                        tickFormatter={(i) =>
                            dataWithIndex[i]?.dateObj?.toLocaleTimeString("id-ID", {
                                hour: "2-digit",
                                minute: "2-digit",
                            })
                        }
                        ticks={dataWithIndex.map((_, i) => i)}
                        interval={0}
                        height={40}
                        tick={{ fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                        label={{
                            value: "Waktu Pengukuran",
                            position: "outsideBottom",
                            dy: 15,
                        }}
                    />

                    {/* X AXIS TANGGAL */}
                    <XAxis
                        xAxisId="date"
                        dataKey="idx"
                        type="number"
                        orientation="bottom"
                        domain={[0, total - 1]}
                        tickFormatter={(i) =>
                            dataWithIndex[i]?.dateObj?.toLocaleDateString("id-ID", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                            })
                        }
                        ticks={dataWithIndex.map((_, i) => i)}
                        interval={0}
                        height={30}
                        tick={{ fontSize: 8, fontWeight: "bold" }}
                    />

                    <YAxis
                        width={60}
                        label={{
                            value: "Produksi Gas (L)",
                            angle: -90,
                            position: "outsideLeft",
                            dy: 30,
                            dx: -20,
                        }}
                    />

                    <Tooltip content={<CustomTooltip />} />

                    {sections.map((s, i) => (
                        <ReferenceArea
                            key={i}
                            x1={s.x1}
                            x2={s.x2}
                            fill={s.color}
                            fillOpacity={0.3}
                        />
                    ))}

                    <Line
                        type="monotone"
                        dataKey="volume"
                        stroke="#000"
                        strokeWidth={2}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );

    // ======================
    // 🔑 RETURN FINAL
    // ======================
    return full ? (
        // 🔓 MODE MODAL (SCROLL)
        <div ref={scrollRef} className="w-full overflow-x-auto">
            <div
                className="h-[60vh]"
                style={{ minWidth: `${dataWithIndex.length * 70}px` }}
            >
                {Chart}
            </div>
        </div>
    ) : (
        // 🔒 MODE NORMAL (TANPA SCROLL)
        <div className="w-full h-[300px]">
            {Chart}
        </div>
    );
}
