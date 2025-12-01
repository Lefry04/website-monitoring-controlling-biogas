import profil from "../../assets/profil.svg"
import icon1 from "../../assets/icon1.svg"
import BoxGrafik from "./BoxGrafik";
import { Box } from "lucide-react";
import { useEffect, useState } from "react";

const BoxSec = (props) => {

    const { children } = props;

    const [dateInfo, setDateInfo] = useState({
        hari: "",
        tanggal: "",
        jam: ""
    });

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();

            const hariIndo = now.toLocaleDateString("id-ID", { weekday: "long" });
            const tanggalIndo = now.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric"
            });

            const jam = now.toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit"
            });

            setDateInfo({
                hari: hariIndo,
                tanggal: tanggalIndo,
                jam
            });
        };

        updateTime();

        // update setiap 1 menit
        const interval = setInterval(updateTime, 60000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="left-1/10 my-15 w-screen absolute flex flex-row gap-8 items-scretch">
            <div className='w-3/5 box rounded-3xl'>
                <div className='flex flex-col gap-8 p-10 w-full h-full'>
                    <h1 className='text-2xl font-bold self-start'>SMARTBIOGAS</h1>
                    {children}
                </div>
            </div>
            <div className="w-1/4 box rounded-3xl p-10 flex flex-col gap-8">
                <div className="flex flex-row gap-4 mb-9">
                    <img src={profil} alt="" />
                    <div className="text-base font-bold">
                        <p>Jonathan Ricardo</p>
                        <p className="opacity-50">Admin</p>
                    </div>
                </div>
                <BoxGrafik />
                <img src={icon1} alt="" className="w-20 self-end drag-none" />
                <div className="text-xl self-end text-right">
                    <p>{dateInfo.hari}, {dateInfo.tanggal}
                        <br />{dateInfo.jam}
                    </p>
                    <p className="font-thin mt-17 hidden xl:block">Dashboard IoT Biogas ini menghadirkan kontrol dan insight cerdas untuk mengoptimalkan energi terbarukan Anda dengan mudah dan efisien.</p>
                </div>
            </div>
        </div>
    )
}

export default BoxSec;