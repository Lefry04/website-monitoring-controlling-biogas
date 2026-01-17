
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

    const [startDate, setStartDate] = useState(() => {
        const d = new Date();
        d.setDate(d.getDate() - 7);
        return d.toISOString().split("T")[0];
    });

    const [dataGrafik, setDataGrafik] = useState([]);

    // grafik kecil (card)
    const smallData = dataGrafik.slice(-12);

    // grafik full (modal + filter tanggal)
    const fullData = dataGrafik.filter(d => {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        return d.dateObj >= start;
    });



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

    useEffect(() => {
        const fetchData = async () => {
            const snap = await getDocs(
                collection(firestore, "ProduksiHarianUltrasonik")
            );

            const raw = snap.docs.map(doc => {
                const d = doc.data();
                return {
                    jarak: Number(d.jarak),
                    dateObj: d.waktuTS.toDate()
                };
            });

            setDataGrafik(
                raw.sort((a, b) => a.dateObj - b.dateObj)
            );
        };

        fetchData();
    }, []);

    const filteredData = showFullGrafik
        ? dataGrafik.filter(d => {
            const start = new Date(startDate);
            start.setHours(0, 0, 0, 0);
            return d.dateObj >= start;
        })
        : dataGrafik.slice(-12); // grafik kecil


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
                    <Grafik data={smallData} />
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
                            <input
                                type="date"
                                value={startDate}
                                onChange={e => setStartDate(e.target.value)}
                                className="box px-4 py-2 rounded-xl mb-4"
                            />
                            <Grafik data={fullData} full focusdate={startDate}/>
                        </div>
                    </div>
                </div>
            )}
        </BoxSec>
    );
};

export default GrafikAnalitik;
