const HorizontalBar = ({  max, satuan = "", col1, col2, col3, col21, col22, col23, tex_top, tex_bot, top, bot, statustop, statusbot }) => {

    const pertop = (top / max) * 100;

    const perbot = (bot / max) * 100;

    return (
        <div className="w-full px-4 flex flex-col justify-between gap-16">
            <div className="relative w-9/10 h-3 rounded-full overflow-visible bg-gray-200 self-center">
                <div className="relative w-full h-full bg-gray-200 rounded-full overflow-hidden">
                    <div className={`absolute top-0 left-0 h-full w-1/3 ${col21}`}></div>
                    <div className={`absolute top-0 left-1/3 h-full w-1/3 ${col22}`}></div>
                    <div className={`absolute top-0 left-2/3 h-full w-1/3 ${col23}`}></div>
                </div>

                <div
                    className="absolute top-0 h-full border-r-7 border-black rounded transition-all duration-500"
                    style={{
                        left: `${pertop}%`,
                        top: `-8px`,
                        height: `calc(100% + 16px)`
                    }}
                ></div>
                <p className="text-base font-light text-center mt-3">Top : {top} <b className={`${tex_top} font-bold`}>({statustop})</b></p>

            </div>
            {/* <div
                className="h-8 min-h-[6em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400"></div>
 */}
            <div className="relative w-9/10 h-3 rounded-full overflow-visible bg-gray-200 self-center">
                <div className="relative w-full h-full bg-gray-200 rounded-full overflow-hidden">
                    <div className={`absolute top-0 left-0 h-full w-1/3 ${col1}`}></div>
                    <div className={`absolute top-0 left-1/3 h-full w-1/3 ${col2}`}></div>
                    <div className={`absolute top-0 left-2/3 h-full w-1/3 ${col3}`}></div>
                </div>

                <div
                    className="absolute top-0 h-full border-r-7 border-black rounded transition-all duration-500"
                    style={{
                        left: `${perbot}%`,
                        top: `-8px`,
                        height: `calc(100% + 16px)`
                    }}
                ></div>
                <p className="text-base font-light text-center mt-3">Bottom : {bot} <b className={`${tex_bot} font-bold`}>({statusbot})</b></p>

            </div>
        </div>
    );
};
export default HorizontalBar;
