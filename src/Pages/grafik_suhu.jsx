import { useEffect, useState } from "react";
import {
    LineChart, Line, XAxis, YAxis,
    CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { getTemperatureData } from "../Components/Elements/Grafik_suhu";

export default function GrafikTemperatur() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getTemperatureData().then(setData);
    }, []);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Line
                    type="monotone"
                    dataKey="external"
                    name="External (°C)"
                    stroke="#e74c3c"
                    strokeWidth={2}
                    dot={false}
                />

                <Line
                    type="monotone"
                    dataKey="up"
                    name="Internal Atas (°C)"
                    stroke="#3498db"
                    strokeWidth={2}
                    dot={false}
                />

                <Line
                    type="monotone"
                    dataKey="down"
                    name="Internal Bawah (°C)"
                    stroke="#2ecc71"
                    strokeWidth={2}
                    dot={false}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
