const HorizontalBar = ({ terdeteksi = false }) => {

    const col = terdeteksi ? "bg-red-500" : "bg-blue-300";

    return (
        <div className="w-full px-4 flex flex-col gap-2 mb-6">
            <div className="relative w-9/10 h-3 rounded-full overflow-hidden self-center">
                <div
                    className={`absolute top-0 left-0 h-full w-1/2 transition-all duration-500 ${terdeteksi ? "bg-green-200" : "bg-green-500"
                        }`}
                ></div>

                <div
                    className={`absolute top-0 right-0 h-full w-1/2 transition-all duration-500 ${terdeteksi ? "bg-red-500" : "bg-red-200"
                        }`}
                ></div>
            </div>
        </div>
    );
};
export default HorizontalBar;
