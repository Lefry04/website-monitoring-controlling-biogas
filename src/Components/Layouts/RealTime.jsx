import Monitoring from "../Fragments/CardsMonitoring";
import HorizontalBar from "../Elements/Bar_Tekanan_pH";
import HorizontalBarCairGas from "../Elements/Bar_Cairan";
import HorizontalBarGas from "../Elements/Bar_Gas";
import StatusSuhu from "../Elements/Status_Suhu";
import CircularBar from "../Elements/Bar_Aliran";
import BoxUtama from "../Fragments/BoxUtama";
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../../services/firebase";
import { meta } from "@eslint/js";

const RealTime = () => {

    // pengambilan data firebase realtime database
    const [sensor, setSensor] = useState(null);
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
    if (sensor?.tekanan?.delta_kPa < 3.3) {
        tekananStatus = "Tekanan Rendah";
        tekananKeadaan = "Sedikit Gas";
    } else if (sensor?.tekanan?.delta_kPa >= 3.3 && sensor?.tekanan?.delta_kPa < 6.6) {
        tekananStatus = "Tekanan Normal";
        tekananColor = "text-green-500";
        tekananKeadaan = "Ada Gas";
    } else {
        tekananStatus = "Tekanan Tinggi";
        tekananKeadaan = "Banyak Gas";
    }

    // sensor pH
    let pHStatus, pHColor, colpH = "bg-red-500", phKeadaan = "Tidak Optimal";
    if (sensor?.ph_sensor?.value > 6.5 && sensor?.ph_sensor?.value <= 8.5) {
        pHStatus = "Netral";
        pHColor = "text-green-500";
        colpH = "bg-green-500";
        phKeadaan = "Optimal";
    } else if (sensor?.ph_sensor?.value <= 6.5) {
        pHStatus = "Asam";
        pHColor = "text-red-500";
    } else {
        pHStatus = "Basa";
        pHColor = "text-red-500";
    }

    // sensor jarak
    // let jarakPrev = sensor?.ultrasonik?.jarak;
    // let jarakMax = 19; // dalam cm
    // let jarakNow = jarakMax - jarakPrev;


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
    if (sensor?.metana?.status === "No") {
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
                        <HorizontalBar value={sensor?.tekanan?.delta_kPa} max={10} satuan="kPa" col1="bg-red-500" col2="bg-green-400" col3="bg-red-500" />
                    </Monitoring.Bar>
                    <Monitoring.Desc labelcol={tekananColor} label={tekananStatus} labelnilai="Tekanan" nilai={sensor?.tekanan?.delta_kPa} satuan="kPa" kapasitas={10} keadaan={tekananKeadaan

                    } />
                </Monitoring>

                <Monitoring sensor="Tingkat Keasaman (pH)">
                    <Monitoring.Bar>
                        <HorizontalBar value={11} max={14} col1={colpH} col2={colpH} col3={colpH} />
                    </Monitoring.Bar>
                    <Monitoring.Desc labelcol={pHColor} label={pHStatus} labelnilai="Nilai pH" nilai={sensor?.ph_sensor?.value} keadaan="Tidak Optimal" />
                </Monitoring>

                <Monitoring sensor="Cairan Subtrat">
                    <Monitoring.Bar>
                        <HorizontalBarCairGas value={sensor?.ultrasonik?.jarak} max={19} satuan="%" />
                    </Monitoring.Bar>
                    <Monitoring.Desc labelcol="" label="Level Cairan Rendah" labelnilai="Status Cairan" nilai="Rendah" keadaan="Perlu diisi" />
                </Monitoring>

                <Monitoring sensor="Suhu dan Kelembapan">
                    <Monitoring.Bar>
                        <StatusSuhu temp={sensor?.suhu?.temp} hum={sensor?.suhu?.hum} />
                    </Monitoring.Bar>
                    <Monitoring.Desc labelcol={suhuColor} label={suhuStatus} />
                </Monitoring>

                <Monitoring sensor="Gas Metana">
                    <Monitoring.Bar>
                        <HorizontalBarGas terdeteksi={terdeteksi} />
                    </Monitoring.Bar>
                    <Monitoring.Desc labelcol={metanaColor} label={metanaStatus} labelnilai="Status" nilai="Aman" keadaan={metanaKeadaan} />
                </Monitoring>

                <Monitoring sensor="Aliran Gas">
                    <Monitoring.Bar>
                        <CircularBar value={sensor?.aliran?.flow_Lmin} satuan="%"/>
                    </Monitoring.Bar>
                    <Monitoring.Desc labelcol="" label="Aliran Lemah" />
                </Monitoring>

            </div>
        </BoxUtama>
    )
}

export default RealTime;