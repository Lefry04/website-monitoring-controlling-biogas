import pictemp from '../../../assets/sensor_suhu/temp.svg';
import cloud from '../../../assets/sensor_suhu/cloud.svg';
import temp_bot from '../../../assets/sensor_suhu/temp_bot.svg';
import pichum from '../../../assets/sensor_suhu/hum.svg';
import { useEffect, useState } from 'react';
import { getSensor } from '../../../services/sensor.service';

const StatusSuhu = ({ temp_ex, top, bot }) => {

    // top = top.toFixed(1);
    // bot = bot.toFixed(1);

    const topValue = top?.toFixed(1) ?? '-';
    const botValue = bot?.toFixed(1) ?? '-';

    return (
        <div className="w-full px-4 h-full font-light flex text-base justify-between items-center mb-4">
            <div className='flex flex-col gap-3 items-center'>
                <h1>External</h1>
                <div className='flex items-center gap-1'>
                    <p>{temp_ex}&deg;C</p>
                    <img src={cloud} className='h-8' />
                </div>
            </div>
            <div
                className="h-8 min-h-[6em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400"></div>
            <div className='flex flex-col gap-3 items-center'>
                <h1>Top</h1>
                <div className='flex items-center gap-1'>
                    <p>{topValue}&deg;C</p>
                    <img src={pictemp} alt="" className='h-8' />
                </div>
            </div>
            <div className='flex flex-col gap-3 items-center'>
                <h1>Bottom</h1>
                <div className='flex items-center gap-1'>
                    <p>{botValue}&deg;C</p>
                    <img src={temp_bot} alt="" className='h-8' />
                </div>
            </div>

        </div>
    )
}

export default StatusSuhu;