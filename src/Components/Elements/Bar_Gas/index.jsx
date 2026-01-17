const HorizontalBar = ({ terdeteksi = false, ch4, co2 }) => {

    const col = terdeteksi ? "bg-red-500" : "bg-blue-300";
    const statusText = terdeteksi ? "Gas Bocor" : "Tidak Bocor";
    // ch4 = ch4.toFixed(2);

    return (
        <div className="w-full px-4 flex font-extralight flex-row justify-between mb-6 mt-3">
            <div className="text-2xl flex flex-col items-center gap-1">
                <p>{ch4} % CH<span className="text-xs">4</span></p>
                <p>{co2} % CO<span className="text-xs">2</span></p>
                <p className="text-base font-bold text-green-500">Optimal Level</p>
            </div>
            <div
                className="h-8 min-h-[6em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400"></div>
            <div className="w-2/5 flex flex-col justify-end items-center">
                <div className="relative w-full h-3 rounded-full overflow-hidden self-center">
                    <div
                        className={`absolute top-0 left-0 h-full w-1/2 transition-all duration-500 ${terdeteksi ? "bg-green-200" : "bg-green-500"
                            }`}
                    ></div>

                    <div
                        className={`absolute top-0 right-0 h-full w-1/2 transition-all duration-500 ${terdeteksi ? "bg-red-500" : "bg-red-200"
                            }`}
                    ></div>
                </div>
                <p className="text-base font-bold mt-7 text-green-500">{statusText}</p>
            </div>
        </div>
    );
};
export default HorizontalBar;
