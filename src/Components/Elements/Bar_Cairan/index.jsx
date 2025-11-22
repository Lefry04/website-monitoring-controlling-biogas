const HorizontalBar = ({ value, max }) => {
  const percentage = (value / max) * 100;
  return (
    <div className="w-full px-4 flex flex-col gap-2 mb-6">
      <div className="relative w-9/10 h-3 rounded-full overflow-visible self-center">

        <div
          className="absolute top-0 left-0 h-full transition-all duration-500 bg-blue-300 overflow-hidden rounded-l-full"
          style={{
            width: `${percentage}%`
          }}
        ></div>

         <div
          className="absolute top-0 right-0 h-full transition-all duration-500 overflow-hidden border-blue-300 border-2 rounded-r-full"
          style={{
            width: `${100 - percentage}%`
          }}
        ></div>

        <div
          className="absolute top-0 h-full border-r-7 border-blue-500 rounded transition-all duration-500"
          style={{
            left: `${percentage}%`,
            top: `-8px`,
            height: `calc(100% + 16px)`
          }}
        ></div>
        
      </div>
    </div>
  );
};
export default HorizontalBar;
