import pic from "../../../assets/contoh_monitoring.svg"
import { useState, useEffect } from "react";
import { getSensor } from "../../../services/sensor.service";
import { data } from "react-router-dom";
import HorizontalBar from "../Bar_Tekanan_pH";

const Monitoring = () => {

    const [sensor, setSensor] = useState([{
        nama: "Tekanan",
        kapasitas: 1,
        buttonStyle: "bg-green-500 text-center",
        tekanan: "",
        keadaan: ""
    },
    {
        nama: "pH",
        kapasitas: 7,
        buttonStyle: "bg-green-500 text-center",
        tekanan: "",
        keadaan: ""
    }
]);

    const handleAddSensor = (nama) => {
        if (sensor.find((item) => item.nama === nama)) {
            setSensor(sensor.map((item) => item.nama === nama ? { ...item, kapasitas: item.kapasitas + 1 } : item));
        }
    }

    if (sensor[0].kapasitas < 1.6) {
        sensor[0].buttonStyle = "text-green-500 text-center";
        sensor[0].tekanan = "Rendah";
        sensor[0].keadaan = "Aman";
    }
    else if (sensor[0].kapasitas >= 1.6 && sensor[0].kapasitas <= 3.3) {
        sensor[0].buttonStyle = "text-amber-500 text-center";
        sensor[0].tekanan = "Sedang";
        sensor[0].keadaan = "Waspada";
    }
    else {
        sensor[0].buttonStyle = "text-red-500 text-center";
        sensor[0].tekanan = "Tinggi";
        sensor[0].keadaan = "Bahaya";
    }

    // useEffect(() => {
    //         getSensor((data) => {
    //             setSensor(data);
    //             console.log(data);
    //         });
    // }, []);

    return (
        <div className="w-full h-fit bg-white rounded-2xl p-6 font-bold text-base flex flex-col gap-3">
            <h1>Tekanan Gas</h1>
            <div className="w-full flex items-center justify-center">
                <HorizontalBar value={sensor[0].kapasitas} max={5} satuan="kPa" col1="bg-green-500" col2="bg-yellow-400" col3="bg-red-500"/>
            </div>
            {sensor.map((item) => (
                <div key={item.nama}>
                    <h1 className={item.buttonStyle}>Tekanan {item.tekanan}</h1>
                    <div className="flex flex-1 font-light text-xs mt-2">
                        <p className="pe-2 w-3/5">Tekanan: {item.kapasitas} kPa
                            <br />Status Sensor: Aktif</p>
                        <div
                            className="h-8 min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400"></div>
                        <p className="ps-2 w-3/5">Kapasitas: {item.kapasitas} kPa / 5kPa
                            <br />Keadaan: {item.keadaan}</p>
                    </div>
                    {/* <button className="bg-amber-300" onClick={() => handleAddSensor(item.nama)}>tambah</button> */}
                </div>
            ))}
        </div>
    )
}

export default Monitoring;