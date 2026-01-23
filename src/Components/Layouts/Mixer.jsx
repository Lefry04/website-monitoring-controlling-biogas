import BoxUtama from "../Fragments/BoxUtama";
import { useState, useEffect, useRef } from "react";
import { ref, onValue, update } from "firebase/database";
import { db } from "../../services/firebase"; // pastikan konfigurasi sudah benar

const Mixer = () => {
    const motorRef = ref(db, "motor");

    const [status, setStatus] = useState("OFF");
    const [control, setControl] = useState("AUTO");
    const [time, setTime] = useState(5 * 60); // ubah ke 300 untuk 5 menit
    const [isActive, setIsActive] = useState(false);

    const startTimeRef = useRef(null); // menyimpan startTime dari Firebase
    const MAX_TIME = 5 * 60; // detik (ubah ke 300 untuk 5 menit)

    // 🔹 Ambil data realtime dari Firebase
    useEffect(() => {
        const unsubscribe = onValue(motorRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setStatus(data.status);
                setControl(data.control);
                if (data.startTime) startTimeRef.current = data.startTime;
            }
        });
        return () => unsubscribe();
    }, []);

    // 🔹 Jalankan timer berdasarkan waktu mulai (startTime)
    useEffect(() => {
        let timer;

        if (status === "ON") {
            setIsActive(true);

            timer = setInterval(() => {
                const now = Date.now();
                const elapsed = Math.floor((now - (startTimeRef.current || 0)) / 1000);
                const remaining = MAX_TIME - elapsed;

                if (remaining <= 0) {
                    // waktu habis → matikan motor otomatis
                    update(motorRef, { status: "OFF" });
                    clearInterval(timer);
                    setTime(0);
                    setIsActive(false);
                } else {
                    setTime(remaining);
                }
            }, 1000);
        } else {
            clearInterval(timer);
            setIsActive(false);
            setTime(MAX_TIME);
        }

        return () => clearInterval(timer);
    }, [status]);

    // 🔹 Fungsi tombol manual
    const handleManualStart = async () => {
        const startTime = Date.now();
        await update(motorRef, {
            control: "ON",
            status: "ON",
            startTime, // simpan waktu mulai
        });
    };

    // 🔹 Format MM:SS
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");

    // 🔹 Data dummy riwayat
    const data = [
        { no: 1, riwayat: "Otomatis oleh Sistem", tanggal: "09/09/2025", waktu: "00:01 – 00.05" },
        { no: 2, riwayat: "Manual oleh Manusia", tanggal: "09/09/2025", waktu: "06:01 – 06.05" },
        { no: 3, riwayat: "Otomatis oleh Sistem", tanggal: "09/09/2025", waktu: "12:01 – 12.05" },
        { no: 4, riwayat: "Manual oleh Manusia", tanggal: "09/09/2025", waktu: "18:01 – 18.05" },
        { no: 5, riwayat: "Otomatis oleh Sistem", tanggal: "10/09/2025", waktu: "00:01 – 00.05" },
    ];

    return (
        <BoxUtama>
            <div className="w-full h-full flex flex-col gap-6">
                {/* Bagian kontrol pengaduk */}
                <div className="w-full h-60 bg-white rounded-2xl p-6 text-base flex flex-col justify-between">
                    <div className="w-full h-1/2 flex flex-row justify-between">
                        {/* Tombol Pengaduk */}
                        <div className="w-9/20 box-pengaduk p-3 rounded-3xl flex flex-row gap-4 items-center justify-between">
                            <h1 className="font-bold text-lg">Pengaduk</h1>
                            <div className="flex items-center justify-between w-full h-full p-2 rounded-2xl bg-white">
                                <div
                                    className={`flex items-center justify-center w-1/2 h-full rounded-2xl text-lg font-semibold transition-all duration-300 ${status === "OFF"
                                            ? "bg-gray-500 text-white shadow-inner"
                                            : "bg-transparent text-black/30"
                                        }`}
                                >
                                    Mati
                                </div>
                                <button
                                    onClick={handleManualStart}
                                    disabled={status === "ON"}
                                    className={`flex items-center justify-center w-1/2 text-lg font-semibold transition-all duration-300 ${status === "ON"
                                            ? "bg-gray-500 text-white hover:cursor-default"
                                            : "text-black/70"
                                        } rounded-2xl h-full`}
                                >
                                    Aktif
                                </button>
                            </div>
                        </div>

                        {/* Timer */}
                        <div className="flex items-center gap-2 text-4xl font-light h-full">
                            <div className="bg-[#c7ccc1] rounded-2xl w-20 flex h-full justify-center items-center">{minutes[0]}</div>
                            <div className="bg-[#c7ccc1] rounded-2xl w-20 flex h-full justify-center items-center">{minutes[1]}</div>
                            <div className="text-6xl font-bold">:</div>
                            <div className="bg-[#c7ccc1] rounded-2xl w-20 flex h-full justify-center items-center">{seconds[0]}</div>
                            <div className="bg-[#c7ccc1] rounded-2xl w-20 flex h-full justify-center items-center">{seconds[1]}</div>
                        </div>
                    </div>

                    {/* Catatan */}
                    <div className="flex flex-col gap-3">
                        <h1 className="font-bold text-xs">Catatan :</h1>
                        <p className="font-light text-xs">
                            Pengaduk biogas beroperasi maksimal 5 menit setiap kali dinyalakan (baik manual maupun otomatis).
                            Saat status "OFF", timer akan reset kembali.
                        </p>
                    </div>
                </div>

                {/* Tabel Riwayat */}
                <div className="bg-white p-6 rounded-2xl">
                    <h2 className="text-lg font-bold">Riwayat Pengaduk</h2>

                    <div className="overflow-x-auto">
                        <table className="min-w-full text-center border-separate border-spacing-y-4">
                            <thead>
                                <tr>
                                    <th className="pb-2 w-16 font-normal">No.</th>
                                    <th className="pb-2 font-normal">Riwayat</th>
                                    <th className="pb-2 font-normal">Tanggal</th>
                                    <th className="pb-2 font-normal">Waktu</th>
                                </tr>
                                <tr>
                                    <td colSpan="4">
                                        <div className="h-1 box"></div>
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr key={item.no} className="font-normal">
                                        <td className="py-3">{item.no}.</td>
                                        <td className="py-3">{item.riwayat}</td>
                                        <td className="py-3">{item.tanggal}</td>
                                        <td className="py-3">{item.waktu}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </BoxUtama>
    );
};

export default Mixer;
