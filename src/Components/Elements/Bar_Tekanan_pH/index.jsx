const HorizontalBar = ({ value, max, satuan = "", col1, col2, col3 }) => {

  const percentage = (value / max) * 100;

  return (
    <div className="w-full px-4 flex flex-col gap-2">
      <div className="relative w-9/10 h-3 rounded-full overflow-visible bg-gray-200 self-center">
        <div className="relative w-full h-full bg-gray-200 rounded-full overflow-hidden">
          <div className={`absolute top-0 left-0 h-full w-1/3 ${col1}`}></div>
          <div className={`absolute top-0 left-1/3 h-full w-1/3 ${col2}`}></div>
          <div className={`absolute top-0 left-2/3 h-full w-1/3 ${col3}`}></div>
        </div>

        <div
          className="absolute top-0 h-full border-r-7 border-black rounded transition-all duration-500"
          style={{
            left: `${percentage}%`,
            top: `-8px`,
            height: `calc(100% + 16px)`
          }}
        ></div>
      </div>
      <div className="flex flex-row justify-between font-light text-xs">
        <p>0 {satuan}</p>
        <p>{max} {satuan}</p>
      </div>
    </div>
  );
};
export default HorizontalBar;
