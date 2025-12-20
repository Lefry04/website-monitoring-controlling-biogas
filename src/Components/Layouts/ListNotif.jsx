import BoxSec from "../Fragments/BoxSec";
import { useState } from "react";
import { AlertTriangle, Trash2 } from "lucide-react";
import { migrateWaktuToTimestamp } from "../../admin/migrateTimestamp";

const Notif = () => {

    const [notifications, setNotifications] = useState([
        { id: 1, message: "Halo! Mohon masukkan feed stock segera, level cairan di dalam rektor sudah rendah" },
        { id: 2, message: "Halo! Mohon masukkan feed stock segera, level cairan di dalam rektor sudah rendah" },
        { id: 3, message: "Halo! Mohon masukkan feed stock segera, level cairan di dalam rektor sudah rendah" },
        { id: 4, message: "Halo! Mohon masukkan feed stock segera, level cairan di dalam rektor sudah rendah" },
        { id: 5, message: "Halo! Mohon masukkan feed stock segera, level cairan di dalam rektor sudah rendah" },
        { id: 6, message: "Halo! Mohon masukkan feed stock segera, level cairan di dalam rektor sudah rendah" },
        { id: 7, message: "Halo! Mohon masukkan feed stock segera, level cairan di dalam rektor sudah rendah" },
    ]);

    // --- hapus notifikasi ---
    const handleDelete = (id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    return (
        <BoxSec>
            <div className="bg-white rounded-2xl p-6 w-full h-full">
                <h1 className="text-lg font-bold mb-10">Notifikasi</h1>

                {/* daftar notifikasi */}
                <div className="space-y-3">
                    {notifications.map((notif) => (
                        <div
                            key={notif.id}
                            className="flex items-center justify-between bg-[#dbe2d0] rounded-xl p-3 h-15 shadow-sm"
                        >
                            <div className="flex items-center gap-3 text-sm text-gray-700">
                                <AlertTriangle className="text-red-500 w-5 h-5" />
                                <span>{notif.message}</span>
                            </div>

                            <button
                                onClick={() => handleDelete(notif.id)}
                                className="text-gray-500 hover:text-red-600 transition"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* pagination */}
                <div className="flex justify-end items-center gap-3 mt-5 text-gray-500 text-sm">
                    <button className="p-2 hover:text-black">&lt;</button>
                    <span>1</span>
                    <button className="p-2 hover:text-black">&gt;</button>
                </div>
            </div>
        </BoxSec>
    )
}

export default Notif;