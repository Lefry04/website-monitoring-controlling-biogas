const CardsMonitoring = (props) => {

    const { sensor, children } = props;

    return (
        <div className="w-full h-full bg-white rounded-2xl p-6 font-bold text-base flex flex-col gap-3 relative">
            <h1>{sensor}</h1>
            {children}
        </div>
    )
}

const Bar = (props) => {
    const { children } = props;
    return (
        <div className="w-full flex items-center justify-center mt-6">
            {children}
        </div>
    )
}

const Desc = (props) => {
    const { labelcol, label, labelnilai, nilai, satuan = "", kapasitas, keadaan } = props;

    return (
        <div>
            <h1 className={`text-center ${labelcol}`}>{label}</h1>
            {labelnilai ? (
                <div className="flex flex-1 font-light text-xs mt-7">
                    <p className="pe-2 w-3/5">{labelnilai}: {nilai} {satuan}
                        <br />Status Sensor: Aktif</p>
                    <div
                        className="h-8 min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400"></div>
                    <p className="ps-2 w-3/5">{kapasitas && (
                        <>
                            Kapasitas: {nilai} kPa / {kapasitas}kPa
                            <br />
                        </>
                    )}
                        Keadaan: {keadaan}</p>
                </div>
            ) : (
                <></>
            )
            }
        </div>
    )
}

CardsMonitoring.Bar = Bar;
CardsMonitoring.Desc = Desc;

export default CardsMonitoring;