const BackLanding = (props) => {

    const { children } = props;

    return (
        <div className="back-img w-screen h-screen flex flex-col items-center justify-center relative text-white gap-10 text-center">
            <h1 className="absolute top-[50px] left-[70px] font-bold text-2xl">SMARTBIOGAS</h1>
            {children}
        </div>
    )
}

export default BackLanding;