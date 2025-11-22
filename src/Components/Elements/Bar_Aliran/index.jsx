import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const CircularBar = ({ value, isActive }) => {

    const pathColor = isActive ? '#DA1E28' : '#A8A8A8';
    const trailColor = isActive ? '#FFD7D9' : '#E0E0E0';

    return (
        <div className="h-25 px-4 flex flex-col gap-2 relative">
            <CircularProgressbar
                value={100}
                maxValue={100}
                text={``}
                strokeWidth={10}
                styles={buildStyles({
                    pathColor,
                    trailColor
                })}
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center font-semibold text-xs">
                <p className={isActive ? "text-red-500" : "text-gray-500"}>{value}</p>
                <p className={isActive ? "text-red-500" : "text-gray-500"}>m³/h</p>
            </div>
        </div>
    );
};
export default CircularBar;
