import pictemp from '../../../assets/sensor_suhu/temp.svg';
import cloud from '../../../assets/sensor_suhu/cloud.svg';
import pichum from '../../../assets/sensor_suhu/hum.svg';
import { useEffect, useState } from 'react';
import { getSensor } from '../../../services/sensor.service';

const StatusSuhu = (props) => {

    const { temp, hum } = props;

    // const [sensor, setSensor] = useState([]);

    // useEffect(() => {
    //     getSensor((data) => {
    //         setSensor(data);
    //     });
    // }, []);

    return (
        <div className="w-full px-4">
            {/* <h1>Aliran Gas</h1>
            <div className="w-full flex items-center justify-center overflow-hidden">
                <img src={pic} alt="" className="items-center" />
            </div>
            <h1 className="text-red-500 text-center">Aliran Gas Lemah</h1> */}
            {/* <h1>Suhu dan Kelembapan</h1>
            <div className="flex flex-1 font-light text-xs justify-center items-center gap-2">
                <img src={temp} className='h-full' />
                <h1 className='font-light text-2xl'>{sensor.temp}&deg;C</h1>
                <img src={cloud} className='h-full' />
                <div className="min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400"></div>
                <img src={hum} className='h-full' />
                <h1 className='font-light text-2xl'>{sensor.hum} %</h1>
            </div> */}
             <div className="flex flex-1 font-light text-xl justify-center items-center gap-2 mt-7 mb-3">
                <img src={pictemp} className='h-full' />
                <h1 className='font-light'>{temp}&deg;C</h1>
                <img src={cloud} className='h-full' />
                <div className="min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400"></div>
                <img src={pichum} className='h-full' />
                <h1 className='font-light'>{hum} %</h1>
            </div>
            {/* <h1 className="text-blue-300 text-center">Normal</h1> */}
        </div>
    )
}

export default StatusSuhu;