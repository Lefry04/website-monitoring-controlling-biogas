import BoxUtama from "../Fragments/BoxUtama";
import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, setDoc, doc } from "firebase/firestore";
import { firestore } from "../../services/firebase";

const InputSubtrat = () => {

    const [waktu, setWaktu] = useState("");

    const [substrats, setSubstrats] = useState([
        { jenis: "", ukuran: "", satuan: "" },
    ]);

    const tambahSubstrat = () => {
        setSubstrats([...substrats, { jenis: "", ukuran: "", satuan: "" }]);
    };

    const hapusSubstrat = (index) => {
        if (substrats.length > 1) {
            const newData = substrats.filter((_, i) => i !== index);
            setSubstrats(newData);
        }
    };

    const handleChange = (index, field, value) => {
        const newData = [...substrats];
        newData[index][field] = value;
        setSubstrats(newData);
    };

    const generateNextId = async () => {
        const snapshot = await getDocs(collection(firestore, "PengisianSubstrat"));
        let maxNumber = 0;

        snapshot.forEach((doc) => {
            const id = doc.id;  // contoh: "s00012"
            const num = parseInt(id.replace("s", ""), 10);
            if (!isNaN(num) && num > maxNumber) {
                maxNumber = num;
            }
        });

        const nextNumber = maxNumber + 1;
        return "s" + nextNumber.toString().padStart(5, "0");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nextId = await generateNextId();

        await setDoc(doc(firestore, "PengisianSubstrat", nextId), {
            waktu: waktu,
            items: substrats,
        });

        alert("Data berhasil disimpan dengan ID: " + nextId);

        setSubstrats([{ jenis: "", ukuran: "", satuan: "" }]);
    };

    const [riwayat, setRiwayat] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(firestore, "PengisianSubstrat"));
            const data = [];

            querySnapshot.forEach((doc) => {
                data.push(doc.data());
            });

            // Urutkan berdasarkan waktu
            data.sort((a, b) => new Date(a.waktu) - new Date(b.waktu));

            setRiwayat(data);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const now = new Date();
        const formattedTime =
            now.toLocaleDateString("id-ID") +
            " " +
            now.toLocaleTimeString("id-ID").replaceAll(":", ".");

        setWaktu(formattedTime);
    }, []);


    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log("Data dikirim:", substrats);
    // };


    const data = [
        {
            tanggal: "09/09/2025",
            items: [
                { jenis: "Kotoran Sapi", ukuran: "1 L" },
                { jenis: "Limbah Organik", ukuran: "1 L" },
            ],
        },
        {
            tanggal: "15/09/2025",
            items: [
                { jenis: "Kotoran Sapi", ukuran: "1 L" },
                { jenis: "Limbah Organik", ukuran: "1 L" },
            ],
        },
        {
            tanggal: "21/09/2025",
            items: [
                { jenis: "Kotoran Sapi", ukuran: "1 L" },
                { jenis: "Limbah Organik", ukuran: "1 L" },
            ],
        },
        {
            tanggal: "25/09/2025",
            items: [
                { jenis: "Kotoran Sapi", ukuran: "1 L" },
                { jenis: "Limbah Organik", ukuran: "1 L" },
            ],
        },
        {
            tanggal: "31/09/2025",
            items: [{ jenis: "Kotoran Sapi", ukuran: "1 L" }],
        },
    ];

    return (
        <BoxUtama>
            <form
                onSubmit={handleSubmit}
                className="w-full mx-auto bg-white p-8 rounded-3xl space-y-6"
            >
                {/* Judul */}
                <h2 className="text-xl font-bold">
                    Formulir Pengisian Substrat
                </h2>

                {/* Waktu Pengisian */}
                <div className="box p-4 rounded-2xl flex flex-row items-center justify-between">
                    <label className="font-light">Waktu Pengisian</label>
                    <input
                        type="text"
                        value={waktu}
                        disabled
                        className="w-7/10 rounded-2xl bg-gray-100 py-3 px-4 cursor-not-allowed text-gray-600"
                    />

                </div>

                {/* Loop data substrat */}
                {substrats.map((item, index) => (
                    <div
                        key={index}
                        className="box p-4 rounded-2xl space-y-3 transition-all relative"
                    >
                        {substrats.length > 1 && (
                            <button
                                type="button"
                                onClick={() => hapusSubstrat(index)}
                                className="absolute top-3 right-3 text-red-600 hover:text-red-800 text-sm"
                            >
                                ✕
                            </button>
                        )}
                        {/* Jenis Substrat */}
                        <div className="flex flex-col gap-2">
                            <label className="font-light">Jenis Substrat</label>
                            <input
                                type="text"
                                value={item.jenis}
                                onChange={(e) => handleChange(index, "jenis", e.target.value)}
                                placeholder="Masukkan jenis substrat"
                                className="w-full rounded-2xl bg-white py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#7A7D6D]"
                            />
                        </div>

                        {/* Ukuran Substrat + Satuan */}
                        <div className="flex flex-col gap-2">
                            <label className="font-light">Ukuran Substrat</label>
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    value={item.ukuran}
                                    onChange={(e) => handleChange(index, "ukuran", e.target.value)}
                                    placeholder="Masukkan ukuran substrat"
                                    className="flex-1 rounded-2xl bg-white py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#7A7D6D]"
                                />
                                <select
                                    value={item.satuan}
                                    onChange={(e) => handleChange(index, "satuan", e.target.value)}
                                    className="w-32 rounded-2xl bg-white py-3 px-3 focus:outline-none focus:ring-2 focus:ring-[#7A7D6D]"
                                >
                                    <option value="">Satuan</option>
                                    <option value="kg">Kg</option>
                                    <option value="g">Gram</option>
                                    <option value="L">Liter</option>
                                </select>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Tombol tambah */}
                <div className="flex flex-col items-end gap-4">
                    <button
                        type="button"
                        onClick={tambahSubstrat}
                        className="text-sm underline cursor-pointer text-gray-800 hover:text-gray-600"
                    >
                        Tambah Jenis Substrat
                    </button>

                    <button
                        type="submit"
                        className="bg-lime-950 text-white px-10 py-3 rounded-2xl hover:bg-lime-800 transition"
                    >
                        Kirim
                    </button>
                </div>
            </form>

            <div className="w-full mx-auto bg-white p-6 rounded-2xl">
                <h2 className="text-xl font-bold mb-4">
                    Riwayat Pengisian Substrat
                </h2>

                {/* Header */}
                <div className="grid grid-cols-3 bg-white rounded-t-xl border border-[#d4d9cd] text-center">
                    <div className="py-3 border-r border-[#d4d9cd]">Tanggal</div>
                    <div className="py-3 border-r border-[#d4d9cd]">Jenis</div>
                    <div className="py-3">Ukuran</div>
                </div>

                {/* Body */}
                <div className="bg-white border-x border-b border-[#d4d9cd] rounded-b-xl">
                    {riwayat.map((entry, i) => (
                        <div key={i} className="flex border-t border-[#d4d9cd] first:border-t-0">
                            {/* Kolom Tanggal */}
                            <div className="flex items-center justify-center border-r border-[#d4d9cd] text-center w-1/3 py-3">
                                <span>{entry.waktu}</span>
                            </div>

                            {/* Kolom Jenis & Ukuran */}
                            <div className="flex-1 flex flex-col w-2/3">
                                {entry.items.map((item, j) => (
                                    <div
                                        key={j}
                                        className={`grid grid-cols-2 text-center border-t border-[#d4d9cd] first:border-t-0`}
                                    >
                                        <div className="py-3 border-r border-[#d4d9cd]">{item.jenis}</div>
                                        <div className="py-3">{item.ukuran}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </BoxUtama>
    )
}

export default InputSubtrat;