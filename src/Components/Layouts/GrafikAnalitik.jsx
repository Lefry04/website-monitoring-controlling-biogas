// import BoxSec from "../Fragments/BoxSec";
// import Grafik from "../Elements/Grafik_Produksi";
// import Button from "../Elements/Button";
// import { useState, useEffect, useRef } from "react";
// import { ChevronUp, ChevronDown } from "lucide-react";
// import { collection, getDocs } from "firebase/firestore";
// import { firestore } from "../../services/firebase";


// const bulanIndonesia = [
//     "Januari",
//     "Februari",
//     "Maret",
//     "April",
//     "Mei",
//     "Juni",
//     "Juli",
//     "Agustus",
//     "September",
//     "Oktober",
//     "November",
//     "Desember",
// ];

// const GrafikAnalitik = () => {

//     const [activeMonth, setActiveMonth] = useState(() => {
//         const now = new Date();
//         return bulanIndonesia[now.getMonth()]; // getMonth() 0-11
//     });

//     const [history, setHistory] = useState({
//         Januari: [],
//         Februari: [],
//         Maret: [],
//         April: [],
//         Mei: [],
//         Juni: [],
//         Juli: [],
//         Agustus: [],
//         September: [],
//         Oktober: [],
//         November: [],
//         Desember: [],
//     });

//     // const data = {
//     //     Agustus: [],
//     //     September: [
//     //         { date: "09/09/2025", change: "Naik 10 mol (g/mol)", type: "up" },
//     //         { date: "10/09/2025", change: "Turun 15 mol (g/mol)", type: "down" },
//     //         { date: "11/09/2025", change: "Naik 10 mol (g/mol)", type: "up" },
//     //         { date: "12/09/2025", change: "Naik 10 mol (g/mol)", type: "up" },
//     //         { date: "13/09/2025", change: "Naik 10 mol (g/mol)", type: "up" },
//     //     ],
//     //     Oktober: [],
//     // };

//     useEffect(() => {
//         const fetchHistory = async () => {
//             const querySnapshot = await getDocs(
//                 collection(firestore, "ProduksiHarianUltrasonik")
//             );

//             let raw = [];
//             querySnapshot.forEach((doc) => raw.push(doc.data()));

//             // Kelompokkan data per tanggal, ambil data terakhir tiap tanggal
//             const tempByDate = {}; // { "dd/mm/yyyy": item }
//             raw.forEach((item) => {
//                 const dateKey = item.waktuTS.toDate().toLocaleDateString("id-ID");
//                 tempByDate[dateKey] = item; // otomatis menimpa jika ada lebih dari 1 data di tanggal sama
//             });

//             // Ambil array dari object dan urutkan berdasarkan tanggal
//             const sortedDates = Object.values(tempByDate).sort(
//                 (a, b) => a.waktuTS.toDate() - b.waktuTS.toDate()
//             );

//             const grouped = {
//                 Januari: [],
//                 Februari: [],
//                 Maret: [],
//                 April: [],
//                 Mei: [],
//                 Juni: [],
//                 Juli: [],
//                 Agustus: [],
//                 September: [],
//                 Oktober: [],
//                 November: [],
//                 Desember: [],
//             };

//             sortedDates.forEach((item, i) => {
//                 if (i === 0) return; // skip hari pertama, tidak ada pembanding

//                 const prev = sortedDates[i - 1];

//                 const jarakNow = Number(item.jarak);
//                 const jarakPrev = Number(prev.jarak);

//                 // === 1) Hitung radius
//                 const calcRadius = (jarak) => 12 + ((11.5 - 12) / 16.5) * jarak;

//                 // === 2) Hitung volume m³ → liter
//                 const calcLiter = (jarak) => {
//                     const r = calcRadius(jarak);
//                     const volumeM3 = (1 / 3) * Math.PI * jarak * (12 ** 2 + 12 * r + r ** 2);
//                     return Math.floor(volumeM3 / 1000);
//                 };

//                 const volNow = calcLiter(jarakNow);
//                 const volPrev = calcLiter(jarakPrev);

//                 const diff = volNow - volPrev;

//                 let type = "same";
//                 let text = "Tetap";

//                 if (diff > 0) {
//                     type = "up";
//                     text = `Naik ${diff.toFixed(1)} liter`;
//                 } else if (diff < 0) {
//                     type = "down";
//                     text = `Turun ${Math.abs(diff).toFixed(1)} liter`;
//                 }

//                 const dateObj = item.waktuTS.toDate();
//                 const monthName = dateObj.toLocaleString("id-ID", { month: "long" });
//                 const dateKey = dateObj.toLocaleDateString("id-ID");

//                 grouped[monthName]?.push({
//                     date: dateKey,
//                     change: text,
//                     type: type,
//                     volume: volNow,
//                 });
//             });

//             setHistory(grouped);
//         };

//         fetchHistory();
//     }, []);


//     // useEffect(() => {
//     //     const fetchHistory = async () => {
//     //         const querySnapshot = await getDocs(
//     //             collection(firestore, "ProduksiHarianUltrasonik")
//     //         );

//     //         let raw = [];

//     //         querySnapshot.forEach((doc) => {
//     //             raw.push(doc.data());
//     //         });

//     //         // Sort berdasarkan waktu (dd/mm/yyyy hh.mm.ss)
//     //         raw.sort((a, b) => {
//     //             const toDate = (str) => {
//     //                 const [d, m, yTime] = str.split("/");
//     //                 const [y, time] = yTime.split(" ");
//     //                 const [hh, mm, ss] = time.split(".");
//     //                 return new Date(`${y}-${m}-${d}T${hh}:${mm}:${ss}`);
//     //             };
//     //             return toDate(a.waktu) - toDate(b.waktu);
//     //         });

//     //         const grouped = {
//     //             Januari: [],
//     //             Februari: [],
//     //             Maret: [],
//     //             April: [],
//     //             Mei: [],
//     //             Juni: [],
//     //             Juli: [],
//     //             Agustus: [],
//     //             September: [],
//     //             Oktober: [],
//     //             November: [],
//     //             Desember: [],
//     //         };

//     //         raw.forEach((item, i) => {
//     //             if (i === 0) return;

//     //             const prev = raw[i - 1];

//     //             const jarakNow = Number(item.jarak);
//     //             const jarakPrev = Number(prev.jarak);

//     //             // === 1) Hitung radius
//     //             const calcRadius = (jarak) => {
//     //                 return 12 + ((11.5 - 12) / 16.5) * jarak;
//     //             };

//     //             // === 2) Hitung volume m³ → lalu jadikan liter (1 m³ = 1000 L)
//     //             const calcLiter = (jarak) => {
//     //                 const r = calcRadius(jarak);
//     //                 const volumeM3 = (1 / 3) * Math.PI * jarak * (12 ** 2 + 12 * r + r ** 2);
//     //                 return Math.floor(volumeM3 / 1000); // hanya 1 angka di belakang koma
//     //             };

//     //             const volNow = calcLiter(jarakNow);
//     //             const volPrev = calcLiter(jarakPrev);

//     //             const diff = volNow - volPrev;

//     //             let type = "same";
//     //             let text = "Tetap";

//     //             if (diff > 0) {
//     //                 type = "up";
//     //                 text = `Naik ${diff.toFixed(1)} liter`;
//     //             } else if (diff < 0) {
//     //                 type = "down";
//     //                 text = `Turun ${Math.abs(diff).toFixed(1)} liter`;
//     //             }

//     //             // Ambil bulan
//     //             const [d, m] = item.waktu.split("/");
//     //             const monthName = {
//     //                 "01": "Januari",
//     //                 "02": "Februari",
//     //                 "03": "Maret",
//     //                 "04": "April",
//     //                 "05": "Mei",
//     //                 "06": "Juni",
//     //                 "07": "Juli",
//     //                 "08": "Agustus",
//     //                 "09": "September",
//     //                 "10": "Oktober",
//     //                 "11": "November",
//     //                 "12": "Desember",
//     //             }[m];

//     //             grouped[monthName]?.push({
//     //                 date: item.waktu,
//     //                 change: text,
//     //                 type: type,
//     //                 volume: volNow,       // kalau nanti mau dipakai
//     //             });
//     //         });


//     //         // raw.forEach((item, i) => {
//     //         //     if (i === 0) return; // hari pertama tidak ada pembanding

//     //         //     const prev = raw[i - 1];

//     //         //     const produksiNow = item.jarak;
//     //         //     const produksiPrev = prev.jarak;

//     //         //     const diff = produksiNow - produksiPrev;

//     //         //     // const type = diff >= 0 ? "up" : "down";
//     //         //     // const text = diff >= 0
//     //         //     //     ? `Naik ${diff.toFixed(1)}`
//     //         //     //     : `Turun ${Math.abs(diff).toFixed(1)}`;

//     //         //     let type = "same";
//     //         //     let text = "Tetap";

//     //         //     if (diff > 0) {
//     //         //         type = "up";
//     //         //         text = `Naik ${diff.toFixed(1)}`;
//     //         //     } else if (diff < 0) {
//     //         //         type = "down";
//     //         //         text = `Turun ${Math.abs(diff).toFixed(1)}`;
//     //         //     }

//     //         //     // Ambil bulan
//     //         //     const [d, m] = item.waktu.split("/");
//     //         //     const monthName = {
//     //         //         "01": "Januari",
//     //         //         "02": "Februari",
//     //         //         "03": "Maret",
//     //         //         "04": "April",
//     //         //         "05": "Mei",
//     //         //         "06": "Juni",
//     //         //         "07": "Juli",
//     //         //         "08": "Agustus",
//     //         //         "09": "September",
//     //         //         "10": "Oktober",
//     //         //         "11": "November",
//     //         //         "12": "Desember",
//     //         //     }[m];

//     //         //     grouped[monthName]?.push({
//     //         //         date: item.waktu,
//     //         //         change: text,
//     //         //         type: type
//     //         //     });
//     //         // });

//     //         setHistory(grouped);
//     //     };

//     //     fetchHistory();
//     // }, []);

//     return (
//         <BoxSec>
//             <div className="w-full min-h-1/2 mx-auto bg-white p-8 rounded-3xl flex flex-col gap-5">
//                 <h1 className="font-bold text-lg">Grafik Produksi Harian Bulan <span className="text-red-500 underline">Agustus</span></h1>
//                 <Grafik />
//                 <Button classname="box py-2 rounded-2xl self-end text-black cursor-pointer" type="submit">Export</Button>
//             </div>

//             <div className="bg-white rounded-3xl p-8 w-full">
//                 <h2 className="text-lg font-bold text-gray-800 mb-6">
//                     Riwayat Produksi Gas
//                 </h2>

//                 {/* Tabs */}
//                 <div className="flex justify-center space-x-10 mb-6 text-gray-400">
//                     {bulanIndonesia.slice(9).map((month) => (
//                         <button
//                             key={month}
//                             onClick={() => setActiveMonth(month)}
//                             className={`text-lg font-medium transition ${activeMonth === month
//                                 ? "text-gray-900 relative after:absolute after:-bottom-2 after:left-0 after:right-0 after:h-[3px] after:bg-gray-900 after:rounded-full"
//                                 : ""
//                                 }`}
//                         >
//                             {month}
//                         </button>
//                     ))}
//                 </div>

//                 {/* Card List */}
//                 {/* <div className="box rounded-3xl p-4">
//                     {history[activeMonth].length === 0 ? (
//                         <p className="text-center text-gray-400 py-6">
//                             Tidak ada data untuk bulan {activeMonth}
//                         </p>
//                     ) : (
//                         history[activeMonth].map((item, index) => (
//                             <div
//                                 key={index}
//                                 className="flex items-center justify-between py-3 border-b border-gray-200 last:border-none"
//                             >
//                                 <span className="text-gray-800">{item.date.split(" ")[0]}</span>
//                                 <span className="text-gray-700">{item.change}</span>
//                                 {item.type === "up" && (
//                                     <ChevronUp className="text-green-100 bg-green-400 rounded-full p-1 w-6 h-6" />
//                                 )}

//                                 {item.type === "down" && (
//                                     <ChevronDown className="text-red-100 bg-red-400 rounded-full p-1 w-6 h-6" />
//                                 )}

//                                 {item.type === "same" && (
//                                     <div className="bg-gray-400 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
//                                         -
//                                     </div>
//                                 )}
//                             </div>
//                         ))
//                     )}
//                 </div> */}
//                 {/* Card List */}
//                 <div className="box rounded-3xl px-4 max-h-60 overflow-y-auto overflow-hidden">
//                     {history[activeMonth].length === 0 ? (
//                         <p className="text-center text-gray-400 py-6">
//                             Tidak ada data untuk bulan {activeMonth}
//                         </p>
//                     ) : (
//                         history[activeMonth].map((item, index) => (
//                             <div
//                                 key={index}
//                                 className="flex items-center justify-between py-3 border-b border-gray-200 last:border-none"
//                             >
//                                 <span className="text-gray-800">{item.date.split(" ")[0]}</span>
//                                 <span className="text-gray-700">{item.change}</span>

//                                 {item.type === "up" && (
//                                     <ChevronUp className="text-green-100 bg-green-400 rounded-full p-1 w-6 h-6" />
//                                 )}

//                                 {item.type === "down" && (
//                                     <ChevronDown className="text-red-100 bg-red-400 rounded-full p-1 w-6 h-6" />
//                                 )}

//                                 {item.type === "same" && (
//                                     <div className="bg-gray-400 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
//                                         -
//                                     </div>
//                                 )}
//                             </div>
//                         ))
//                     )}
//                 </div>

//             </div>
//         </BoxSec>
//     )
// }

// export default GrafikAnalitik;
// import BoxSec from "../Fragments/BoxSec";
// import Grafik from "../Elements/Grafik_Produksi";
// import Button from "../Elements/Button";
// import { useState, useEffect } from "react";
// import { ChevronUp, ChevronDown } from "lucide-react";
// import { collection, getDocs } from "firebase/firestore";
// import { firestore } from "../../services/firebase";

// const bulanIndonesia = [
//     "Januari", "Februari", "Maret", "April", "Mei", "Juni",
//     "Juli", "Agustus", "September", "Oktober", "November", "Desember"
// ];

// const GrafikAnalitik = () => {
//     // set bulan aktif sesuai bulan saat ini
//     const [activeMonth, setActiveMonth] = useState(() => {
//         const now = new Date();
//         return bulanIndonesia[now.getMonth()];
//     });

//     const [history, setHistory] = useState({
//         Januari: [], Februari: [], Maret: [], April: [], Mei: [], Juni: [],
//         Juli: [], Agustus: [], September: [], Oktober: [], November: [], Desember: []
//     });

//     // fetch data
//     useEffect(() => {
//         const fetchHistory = async () => {
//             const querySnapshot = await getDocs(collection(firestore, "ProduksiHarianUltrasonik"));
//             let raw = [];
//             querySnapshot.forEach(doc => raw.push(doc.data()));

//             // ambil data terakhir tiap tanggal
//             const tempByDate = {};
//             raw.forEach(item => {
//                 const dateKey = item.waktuTS.toDate().toLocaleDateString("id-ID");
//                 tempByDate[dateKey] = item; // otomatis menimpa jika ada lebih dari 1 data di tanggal sama
//             });

//             const sortedDates = Object.values(tempByDate).sort(
//                 (a, b) => a.waktuTS.toDate() - b.waktuTS.toDate()
//             );

//             const grouped = {
//                 Januari: [], Februari: [], Maret: [], April: [], Mei: [], Juni: [],
//                 Juli: [], Agustus: [], September: [], Oktober: [], November: [], Desember: []
//             };

//             sortedDates.forEach((item, i) => {
//                 if (i === 0) return; // skip hari pertama

//                 const prev = sortedDates[i - 1];

//                 const jarakNow = Number(item.jarak);
//                 const jarakPrev = Number(prev.jarak);

//                 const calcRadius = jarak => 12 + ((11.5 - 12) / 16.5) * jarak;
//                 const calcLiter = jarak => {
//                     const r = calcRadius(jarak);
//                     const volumeM3 = (1 / 3) * Math.PI * jarak * (12 ** 2 + 12 * r + r ** 2);
//                     return Math.round(volumeM3 / 1000);
//                 };

//                 const volNow = calcLiter(jarakNow);
//                 const volPrev = calcLiter(jarakPrev);
//                 const diff = volNow - volPrev;

//                 let type = "same";
//                 let text = "Tetap";
//                 if (diff > 0) { type = "up"; text = `Naik ${diff.toFixed(1)} liter`; }
//                 else if (diff < 0) { type = "down"; text = `Turun ${Math.abs(diff).toFixed(1)} liter`; }

//                 const dateObj = item.waktuTS.toDate();
//                 const monthName = dateObj.toLocaleString("id-ID", { month: "long" });
//                 const dateKey = dateObj.toLocaleDateString("id-ID");

//                 grouped[monthName]?.push({
//                     date: dateKey,
//                     change: text,
//                     type: type,
//                     volume: volNow
//                 });
//             });

//             setHistory(grouped);
//         };

//         fetchHistory();
//     }, []);

//     // ambil 3 bulan untuk tabs: [bulan sebelumnya, bulan aktif, bulan berikutnya]
//     const activeIndex = bulanIndonesia.indexOf(activeMonth);
//     const visibleMonths = [
//         bulanIndonesia[activeIndex - 1] ?? "",
//         activeMonth,
//         bulanIndonesia[activeIndex + 1] ?? ""
//     ].filter(Boolean);

//     return (
//         <BoxSec>
//             <div className="w-full min-h-1/2 mx-auto bg-white p-8 rounded-3xl flex flex-col gap-5">
//                 <h1 className="font-bold text-lg">Grafik Produksi Harian Bulan <span className="text-red-500 underline">Agustus</span></h1>
//                 <Grafik />
//                 <Button classname="box py-2 rounded-2xl self-end text-black cursor-pointer" type="submit">Export</Button>
//             </div>

//             <div className="bg-white rounded-3xl p-8 w-full">
//                 <h2 className="text-lg font-bold text-gray-800 mb-6">
//                     Riwayat Produksi Gas
//                 </h2>

//                 {/* Tabs 3 bulan */}
//                 <div className="flex justify-center space-x-10 mb-6 text-gray-400">
//                     {visibleMonths.map((month) => (
//                         <button
//                             key={month}
//                             onClick={() => setActiveMonth(month)}
//                             className={`text-lg font-medium transition ${activeMonth === month
//                                 ? "text-gray-900 relative after:absolute after:-bottom-2 after:left-0 after:right-0 after:h-[3px] after:bg-gray-900 after:rounded-full"
//                                 : ""
//                                 }`}
//                         >
//                             {month}
//                         </button>
//                     ))}
//                 </div>

//                 {/* Card List */}
//                 <div className="box rounded-3xl px-4 max-h-60 overflow-y-auto overflow-hidden">
//                     {history[activeMonth].length === 0 ? (
//                         <p className="text-center text-gray-400 py-6">
//                             Tidak ada data untuk bulan {activeMonth}
//                         </p>
//                     ) : (
//                         history[activeMonth].map((item, index) => (
//                             <div
//                                 key={index}
//                                 className="flex items-center justify-between py-3 border-b border-gray-200 last:border-none"
//                             >
//                                 <span className="text-gray-800">{item.date}</span>
//                                 <span className="text-gray-700">{item.change}</span>

//                                 {item.type === "up" && (
//                                     <ChevronUp className="text-green-100 bg-green-400 rounded-full p-1 w-6 h-6" />
//                                 )}
//                                 {item.type === "down" && (
//                                     <ChevronDown className="text-red-100 bg-red-400 rounded-full p-1 w-6 h-6" />
//                                 )}
//                                 {item.type === "same" && (
//                                     <div className="bg-gray-400 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
//                                         -
//                                     </div>
//                                 )}
//                             </div>
//                         ))
//                     )}
//                 </div>
//             </div>
//         </BoxSec>
//     );
// };

// export default GrafikAnalitik;

import BoxSec from "../Fragments/BoxSec";
import Grafik from "../Elements/Grafik_Produksi";
import Button from "../Elements/Button";
import { useState, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../services/firebase";

const bulanIndonesia = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

const GrafikAnalitik = () => {
    const [activeMonth, setActiveMonth] = useState(() => {
        const now = new Date();
        return bulanIndonesia[now.getMonth()];
    });

    const [showFullGrafik, setShowFullGrafik] = useState(false);

    const [history, setHistory] = useState({
        Januari: [], Februari: [], Maret: [], April: [], Mei: [], Juni: [],
        Juli: [], Agustus: [], September: [], Oktober: [], November: [], Desember: []
    });

    useEffect(() => {
        const fetchHistory = async () => {
            const querySnapshot = await getDocs(
                collection(firestore, "ProduksiHarianUltrasonik")
            );

            let raw = [];
            querySnapshot.forEach(doc => raw.push(doc.data()));

            const tempByDate = {};
            raw.forEach(item => {
                const dateKey = item.waktuTS.toDate().toLocaleDateString("id-ID");
                tempByDate[dateKey] = item;
            });

            const sortedDates = Object.values(tempByDate).sort(
                (a, b) => a.waktuTS.toDate() - b.waktuTS.toDate()
            );

            const grouped = {
                Januari: [], Februari: [], Maret: [], April: [], Mei: [], Juni: [],
                Juli: [], Agustus: [], September: [], Oktober: [], November: [], Desember: []
            };

            sortedDates.forEach((item, i) => {
                if (i === 0) return;

                const prev = sortedDates[i - 1];

                const jarakNow = Number(item.jarak);
                const jarakPrev = Number(prev.jarak);

                const calcRadius = jarak => 12 + ((11.5 - 12) / 16.5) * jarak;
                const calcLiter = jarak => {
                    const r = calcRadius(jarak);
                    const volumeM3 =
                        (1 / 3) * Math.PI * jarak * (12 ** 2 + 12 * r + r ** 2);
                    return Math.round(volumeM3 / 1000);
                };

                const volNow = calcLiter(jarakNow);
                const volPrev = calcLiter(jarakPrev);
                const diff = volNow - volPrev;

                let type = "same";
                let text = "Tetap";

                if (diff > 0) {
                    type = "up";
                    text = `Naik ${diff.toFixed(1)} liter`;
                } else if (diff < 0) {
                    type = "down";
                    text = `Turun ${Math.abs(diff).toFixed(1)} liter`;
                }

                const dateObj = item.waktuTS.toDate();
                const monthName = dateObj.toLocaleString("id-ID", { month: "long" });
                const dateKey = dateObj.toLocaleDateString("id-ID");

                grouped[monthName]?.push({
                    date: dateKey,
                    change: text,
                    type,
                    volume: volNow
                });
            });

            setHistory(grouped);
        };

        fetchHistory();
    }, []);

    const activeIndex = bulanIndonesia.indexOf(activeMonth);
    const visibleMonths = [
        bulanIndonesia[activeIndex - 1],
        activeMonth,
        bulanIndonesia[activeIndex + 1]
    ].filter(Boolean);

    return (
        <BoxSec>
            {/* ===== GRAFIK CARD ===== */}
            <div className="w-full bg-white p-8 rounded-3xl flex flex-col gap-5 h-fit">
                <h1 className="font-bold text-lg">
                    Grafik Produksi Harian
                </h1>

                <div className="h-full">
                    <Grafik />
                </div>

                <Button
                    classname="box py-2 rounded-2xl self-end cursor-pointer"
                    onClick={() => setShowFullGrafik(true)}
                >
                    Tampilkan Semua
                </Button>
            </div>

            {/* ===== RIWAYAT ===== */}
            <div className="bg-white rounded-3xl p-8 w-full">
                <h2 className="text-lg font-bold text-gray-800 mb-6">
                    Riwayat Produksi Gas
                </h2>

                <div className="flex justify-center space-x-10 mb-6 text-gray-400">
                    {visibleMonths.map(month => (
                        <button
                            key={month}
                            onClick={() => setActiveMonth(month)}
                            className={`text-lg font-medium transition ${activeMonth === month
                                ? "text-gray-900 relative after:absolute after:-bottom-2 after:left-0 after:right-0 after:h-[3px] after:bg-gray-900 after:rounded-full"
                                : ""
                                }`}
                        >
                            {month}
                        </button>
                    ))}
                </div>

                <div className="box rounded-3xl px-4 max-h-60 overflow-y-auto">
                    {history[activeMonth].length === 0 ? (
                        <p className="text-center text-gray-400 py-6">
                            Tidak ada data untuk bulan {activeMonth}
                        </p>
                    ) : (
                        history[activeMonth].map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between py-3 border-b border-gray-200 last:border-none"
                            >
                                <span>{item.date}</span>
                                <span>{item.change}</span>

                                {item.type === "up" && (
                                    <ChevronUp className="text-green-100 bg-green-400 rounded-full p-1 w-6 h-6" />
                                )}
                                {item.type === "down" && (
                                    <ChevronDown className="text-red-100 bg-red-400 rounded-full p-1 w-6 h-6" />
                                )}
                                {item.type === "same" && (
                                    <div className="bg-gray-400 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                                        -
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* ===== MODAL FULL GRAFIK ===== */}
            {showFullGrafik && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={() => setShowFullGrafik(false)}
                    />

                    <div className="relative bg-[#f3f4ef] w-[90%] h-97/100 max-w-5xl rounded-3xl p-8 shadow-xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Produksi Gas</h2>
                            <button
                                onClick={() => setShowFullGrafik(false)}
                                className="text-xl text-gray-500 hover:text-black"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="bg-white rounded-3xl p-6 overflow-x-auto">
                            <h3 className="font-semibold mb-4">Grafik Produksi Gas</h3>

                            <Grafik full />
                        </div>
                    </div>
                </div>
            )}
        </BoxSec>
    );
};

export default GrafikAnalitik;
