import Monitoring from "../Fragments/CardsMonitoring";
import HorizontalBar from "../Elements/Bar_Tekanan_pH";
import HorizontalBarpH from "../Elements/Bar_pH";
import HorizontalBarCairGas from "../Elements/Bar_Cairan";
import HorizontalBarGas from "../Elements/Bar_Gas";
import StatusSuhu from "../Elements/Status_Suhu";
import CircularBar from "../Elements/Bar_Aliran";
import BoxUtama from "../Fragments/BoxUtama";
import GrafikSensor from "../Elements/Grafik_Sensor";
import PopUp from "../Elements/Grafik_PopUp";
import useSensorHistory from "../../hooks/useSensorHistory";
import { useEffect, useState } from "react";
import { ref, onValue, set } from "firebase/database";
import { db } from "../../services/firebase";

const RealTime = () => {

    // pengambilan data firebase realtime database
    const [sensor, setSensor] = useState(null);

    const dataHistory = useSensorHistory();

    const [openPH, setOpenPH] = useState(false);
    const [openTekanan, setOpenTekanan] = useState(false);
    const [openSuhu, setOpenSuhu] = useState(false);

    useEffect(() => {
        const sensorRef = ref(db, '/');
        const unsubscribe = onValue(sensorRef, (snapshot) => {
            const data = snapshot.val();
            setSensor(data);
        });

        return () => unsubscribe();
    }, []);

    // sensor tekanan
    let tekananStatus, tekananColor = "text-red-500", tekananKeadaan;
    if (sensor?.pressure_IDE?.biogas_pressure_kpa < 3.3) {
        tekananStatus = "Tekanan Rendah";
        tekananKeadaan = "Sedikit Gas";
    } else if (sensor?.pressure_IDE?.biogas_pressure_kpa >= 3.3 && sensor?.pressure_IDE?.biogas_pressure_kpa < 6.6) {
        tekananStatus = "Tekanan Normal";
        tekananColor = "text-green-500";
        tekananKeadaan = "Ada Gas";
    } else {
        tekananStatus = "Tekanan Tinggi";
        tekananKeadaan = "Banyak Gas";
    }

    // sensor pH
    let pHStatus, pHStatus2, pHColor, pHColor2, colpH = "bg-red-500", colpH2 = "bg-red-500";
    let ph = sensor?.ph_sensor_IDE?.value?.toFixed(1) ?? '-';
    let ph2 = sensor?.ph_sensor_IDE_2?.value?.toFixed(1) ?? '-';
    if (ph > 6.5 && ph <= 8.5) {
        pHStatus = "Netral";
        pHColor = "text-green-500";
        colpH = "bg-green-500";
    } else if (ph <= 6.5) {
        pHStatus = "Asam";
        pHColor = "text-red-500";
    } else {
        pHStatus = "Basa";
        pHColor = "text-red-500";
    }

    if (ph2 > 6.5 && ph2 <= 8.5) {
        pHStatus2 = "Netral";
        pHColor2 = "text-green-500";
        colpH2 = "bg-green-500";
    } else if (ph2 <= 6.5) {
        pHStatus2 = "Asam";
        pHColor2 = "text-red-500";
    } else {
        pHStatus2 = "Basa";
        pHColor2 = "text-red-500";
    }

    // sensor suhu
    let suhuStatus, suhuColor;
    if ((sensor?.suhu?.temp >= 25 && sensor?.suhu?.temp <= 40) && (sensor?.suhu?.hum >= 40 && sensor?.suhu?.hum <= 80)) {
        suhuStatus = "Normal";
        suhuColor = "text-blue-500";
    } else {
        suhuStatus = "Tidak Optimal";
        suhuColor = "text-red-500";
    }

    // sensor gas metana
    let terdeteksi, metanaStatus, metanaColor, metanaKeadaan;
    if (sensor?.methane_IDE?.status === 0) {
        terdeteksi = false;
        metanaStatus = "Tidak Terdeteksi";
        metanaColor = "text-green-500";
        metanaKeadaan = "Aman";
    } else {
        terdeteksi = true;
        metanaStatus = "Terdeteksi";
        metanaColor = "text-red-500";
        metanaKeadaan = "Gas Bocor";
    }

    const aktif = true;

    return (
        <BoxUtama>
            <div className='grid grid-cols-2 gap-5 w-full h-full items-stretch auto-rows-fr'>

                <Monitoring sensor="Tekanan Gas">
                    <Monitoring.Bar>
                        <HorizontalBar value={sensor?.pressure_IDE?.biogas_pressure_kpa} max={10} satuan="kPa" col1="bg-red-500" col2="bg-green-400" col3="bg-red-500" />
                    </Monitoring.Bar>
                    <Monitoring.Desc labelcol={tekananColor} label={tekananStatus} labelnilai="Tekanan" nilai={sensor?.pressure_IDE?.biogas_pressure_kpa} satuan="kPa" kapasitas={10} keadaan={tekananKeadaan} />
                    <button
                        onClick={() => setOpenTekanan(true)}
                        className="text-sm text-green-900 underline absolute right-7 top-7"
                    >
                        Riwayat (grafik)
                    </button>
                </Monitoring>

                <PopUp
                    open={openTekanan}
                    onClose={() => setOpenTekanan(false)}
                    title="Grafik Tekanan Gas"
                >
                    <GrafikSensor
                        data={dataHistory}
                        yDomain={[0, 10]}
                        yLabel="Nilai Tekanan (kPa)"
                        lines={[
                            { key: "pressure_kpa", label: "tekanan gas", color: "#000000" },
                        ]}
                        full
                    />
                </PopUp>

                <Monitoring sensor="Tingkat Keasaman (pH)">
                    <Monitoring.Bar>
                        <HorizontalBarpH bot={ph} top={ph2} max={14} col1={colpH} col2={colpH} col3={colpH} col21={colpH2} col22={colpH2} col23={colpH2} tex_top={pHColor2} tex_bot={pHColor} statustop={pHStatus2} statusbot={pHStatus} />
                    </Monitoring.Bar>
                    <Monitoring.Desc />
                    <button
                        onClick={() => setOpenPH(true)}
                        className="text-sm text-green-900 underline absolute right-7 top-7"
                    >
                        Riwayat (grafik)
                    </button>
                </Monitoring>

                <PopUp
                    open={openPH}
                    onClose={() => setOpenPH(false)}
                    title="Grafik pH Biogas"
                >
                    <GrafikSensor
                        data={dataHistory}
                        yDomain={[0, 14]}
                        yLabel="Nilai pH"
                        lines={[
                            { key: "ph_bottom", label: "pH Atas", color: "#3769c3" },
                            { key: "ph_top", label: "pH Bawah", color: "#9fc2ff" },
                        ]}
                        full
                    />
                </PopUp>


                <Monitoring sensor="Cairan Subtrat">
                    <Monitoring.Bar>
                        <HorizontalBarCairGas value={36.5 - sensor?.ultrasonic_IDE?.distance_cm} max={19} satuan="%" />
                    </Monitoring.Bar>
                    <Monitoring.Desc labelcol="" label="Level Cairan Rendah" labelnilai="Status Cairan" nilai="Rendah" keadaan="Perlu diisi" />
                </Monitoring>

                <Monitoring sensor="Suhu dan Kelembapan">
                    <Monitoring.Bar>
                        <StatusSuhu temp_ex={sensor?.temp_external_IDE?.temperature_c} top={sensor?.temp_internal_IDE?.up_c} bot={sensor?.temp_internal_IDE?.down_c} />
                    </Monitoring.Bar>
                    <Monitoring.Desc labelcol={suhuColor} label={suhuStatus} />
                    <button
                        onClick={() => setOpenSuhu(true)}
                        className="text-sm text-green-900 underline absolute right-7 top-7"
                    >
                        Riwayat (grafik)
                    </button>
                </Monitoring>

                <PopUp
                    open={openSuhu}
                    onClose={() => setOpenSuhu(false)}
                    title="Grafik Suhu"
                >
                    <GrafikSensor
                        data={dataHistory}
                        yDomain={[26, 30]}
                        yLabel="Nilai Suhu (°C)"
                        lines={[
                            { key: "external_c", label: "Suhu Eksternal", color: "#0f532c" },
                            { key: "internal_up_c", label: "Suhu Internal Atas", color: "#3769c3" },
                            { key: "internal_down_c", label: "Suhu Internal Bawah", color: "#9fc2ff" },
                        ]}
                        full
                    />
                </PopUp>

                <Monitoring sensor="Gas Metana">
                    <Monitoring.Bar>
                        <HorizontalBarGas terdeteksi={terdeteksi} ch4={sensor?.methane_IDE?.percent_adjusted} co2={sensor?.carbondioxide_IDE?.co2_relative_percent} />
                    </Monitoring.Bar>
                </Monitoring>

                <Monitoring sensor="Aliran Gas">
                    <Monitoring.Bar>
                        <CircularBar value={sensor?.aliran?.flow_Lmin} satuan="%" />
                    </Monitoring.Bar>
                    <Monitoring.Desc labelcol="" label="Aliran Lemah" />
                </Monitoring>

            </div>
        </BoxUtama>
    )
}

export default RealTime;