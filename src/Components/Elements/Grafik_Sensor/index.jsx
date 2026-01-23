// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import { useRef } from "react";

// const ITEM_WIDTH = 70;
// const DEFAULT_LIMIT = 12;

// const GrafikLineScrollable = ({
//   data = [],
//   lines = [],
//   full = false,
//   yDomain,
//   yLabel,
// }) => {
//   const scrollRef = useRef(null);

//   if (!data.length) {
//     return (
//       <div className="text-center text-gray-400">
//         Memuat data grafik...
//       </div>
//     );
//   }

//   // ======================
//   // 🔢 POTONG DATA (MODE CARD)
//   // ======================
//   const slicedData = full
//     ? data
//     : data.slice(-DEFAULT_LIMIT);

//   const dataWithIndex = slicedData.map((d, i) => ({
//     ...d,
//     idx: i,
//   }));

//   const total = dataWithIndex.length;

//   const Chart = (
//     <ResponsiveContainer width="100%" height="100%">
//       <LineChart
//         data={dataWithIndex}
//         margin={{ top: 10, right: 40, left: 20, bottom: 30 }}
//       >

//         {/* ⏱ JAM */}
//         <XAxis
//           xAxisId="time"
//           dataKey="idx"
//           type="number"
//           domain={[0, total - 1]}
//           tickFormatter={(i) =>
//             dataWithIndex[i]?.dateObj?.toLocaleTimeString("id-ID", {
//               hour: "2-digit",
//               minute: "2-digit",
//             })
//           }
//           interval={0}
//           height={35}
//           tick={{ fontSize: 10 }}
//           axisLine={false}
//           tickLine={false}
//         />

//         {/* 📅 TANGGAL */}
//         <XAxis
//           xAxisId="date"
//           dataKey="idx"
//           type="number"
//           orientation="bottom"
//           domain={[0, total - 1]}
//           tickFormatter={(i) =>
//             dataWithIndex[i]?.dateObj?.toLocaleDateString("id-ID", {
//               day: "2-digit",
//               month: "2-digit",
//               year: "numeric",
//             })
//           }
//           interval={0}
//           height={25}
//           tick={{ fontSize: 9, fontWeight: "bold" }}
//         />

//         <YAxis
//           domain={yDomain}
//           width={60}
//           label={{
//             value: yLabel,
//             angle: -90,
//             position: "outsideLeft",
//             dy: 30,
//           }}
//         />

//         <Tooltip
//           labelFormatter={(i) =>
//             dataWithIndex[i]?.dateObj?.toLocaleString("id-ID")
//           }
//         />

//         {lines.map((line, i) => (
//           <Line
//             key={i}
//             type="monotone"
//             dataKey={line.key}
//             stroke={line.color}
//             name={line.label}
//             strokeWidth={2}
//             dot={{ r: 3 }}
//             activeDot={{ r: 6 }}
//           />
//         ))}
//       </LineChart>
//     </ResponsiveContainer>
//   );

//   return full ? (
//     // 🔓 MODE POPUP (SCROLL)
//     <div ref={scrollRef} className="w-full overflow-x-auto">
//       <div
//         className="h-[60vh]"
//         style={{ minWidth: `${total * ITEM_WIDTH}px` }}
//       >
//         {Chart}
//       </div>
//     </div>
//   ) : (
//     // 🔒 MODE CARD
//     <div className="w-full h-[300px]">
//       {Chart}
//     </div>
//   );
// };

// export default GrafikLineScrollable;

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import { useRef, useEffect } from "react";

// const ITEM_WIDTH = 70;
// const DEFAULT_LIMIT = 12;

// const GrafikLineScrollable = ({
//   data = [],
//   lines = [],
//   full = false,
//   yDomain,
//   yLabel,
// }) => {
//   const scrollRef = useRef(null);

//   if (!data.length) {
//     return (
//       <div className="text-center text-gray-400">
//         Memuat data grafik...
//       </div>
//     );
//   }

//   // 🔢 POTONG DATA (MODE CARD)
//   const slicedData = full ? data : data.slice(-DEFAULT_LIMIT);

//   const dataWithIndex = slicedData.map((d, i) => ({
//     ...d,
//     idx: i,
//   }));

//   const total = dataWithIndex.length;
//   const chartWidth = total * ITEM_WIDTH;

//   // 🔥 AUTO SCROLL KE DATA TERBARU
//   useEffect(() => {
//     if (full && scrollRef.current) {
//       scrollRef.current.scrollLeft =
//         scrollRef.current.scrollWidth;
//     }
//   }, [total, full]);

//   // ======================
//   // 📊 CHART INTI
//   // ======================
//   const ChartContent = (
//     <LineChart
//       width={full ? chartWidth : undefined}
//       height={full ? 420 : undefined}
//       data={dataWithIndex}
//       margin={{ top: 10, right: 40, left: 20, bottom: 40 }}
//     >
//       {/* ⏱ JAM */}
//       <XAxis
//         dataKey="idx"
//         type="number"
//         domain={[0, total - 1]}
//         interval={0} // 🔥 tampilkan SEMUA
//         height={30}
//         tick={{ fontSize: 10 }}
//         tickFormatter={(i) =>
//           dataWithIndex[i]?.dateObj?.toLocaleTimeString("id-ID", {
//             hour: "2-digit",
//             minute: "2-digit",
//           })
//         }
//         axisLine={false}
//         tickLine={false}
//       />

//       {/* 📅 TANGGAL */}
//       <XAxis
//         xAxisId="date"
//         dataKey="idx"
//         type="number"
//         orientation="bottom"
//         domain={[0, total - 1]}
//         interval={0}
//         height={25}
//         tick={{ fontSize: 9, fontWeight: "bold" }}
//         tickFormatter={(i) =>
//           dataWithIndex[i]?.dateObj?.toLocaleDateString("id-ID", {
//             day: "2-digit",
//             month: "2-digit",
//             year: "numeric",
//           })
//         }
//       />

//       <YAxis
//         domain={yDomain}
//         width={60}
//         label={{
//           value: yLabel,
//           angle: -90,
//           position: "outsideLeft",
//           dy: 30,
//         }}
//       />

//       <Tooltip
//         labelFormatter={(i) =>
//           dataWithIndex[i]?.dateObj?.toLocaleString("id-ID")
//         }
//       />

//       {lines.map((line, i) => (
//         <Line
//           key={i}
//           type="monotone"
//           dataKey={line.key}
//           stroke={line.color}
//           name={line.label}
//           strokeWidth={2}
//           dot={{ r: 3 }}
//           activeDot={{ r: 6 }}
//         />
//       ))}
//     </LineChart>
//   );

//   return full ? (
//     // 🔓 MODE POPUP (SCROLL)
//     <div ref={scrollRef} className="w-full overflow-x-auto">
//       <div
//         className="h-[60vh]"
//         style={{ minWidth: chartWidth }}
//       >
//         {ChartContent}
//       </div>
//     </div>
//   ) : (
//     // 🔒 MODE CARD
//     <div className="w-full h-[300px]">
//       <ResponsiveContainer width="100%" height="100%">
//         {ChartContent}
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default GrafikLineScrollable;

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useEffect, useRef } from "react";

const ITEM_WIDTH = 80;
const DEFAULT_LIMIT = 12;

const GrafikLineScrollable = ({
  data = [],
  lines = [],
  full = false,
  yDomain,
  yLabel,
}) => {
  const scrollRef = useRef(null);

  if (!data.length) {
    return (
      <div className="text-center text-gray-400">
        Memuat data grafik...
      </div>
    );
  }

  // ======================
  // 🔢 DATA
  // ======================
  const slicedData = full ? data : data.slice(-DEFAULT_LIMIT);

  const dataWithIndex = slicedData.map((d, i) => ({
    ...d,
    idx: i,
  }));

  const total = dataWithIndex.length;
  const chartWidth = total * ITEM_WIDTH;

  // ======================
  // 👉 AUTO SCROLL KE DATA TERBARU
  // ======================
  useEffect(() => {
    if (full && scrollRef.current) {
      scrollRef.current.scrollLeft =
        scrollRef.current.scrollWidth;
    }
  }, [full, total]);

  // ======================
  // 📊 CHART
  // ======================
  const Chart = (
    <LineChart
      width={full ? chartWidth : undefined}
      height={full ? 420 : 300}
      data={dataWithIndex}
      margin={{ top: 20, right: 40, left: 30, bottom: 40 }}
    >
      {/* ⏰ JAM */}
      <XAxis
        xAxisId="time"
        dataKey="idx"
        type="number"
        domain={[0, total - 1]}
        ticks={dataWithIndex.map((_, i) => i)}
        interval={0}
        tickFormatter={(i) =>
          dataWithIndex[i]?.dateObj?.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          })
        }
        height={35}
        tick={{ fontSize: 10 }}
        axisLine={false}
        tickLine={false}
      />

      {/* 📅 TANGGAL */}
      <XAxis
        xAxisId="date"
        dataKey="idx"
        type="number"
        orientation="bottom"
        domain={[0, total - 1]}
        ticks={dataWithIndex.map((_, i) => i)}
        interval={0}
        tickFormatter={(i) =>
          dataWithIndex[i]?.dateObj?.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        }
        height={30}
        tick={{ fontSize: 9, fontWeight: "bold" }}
      />

      <YAxis
        domain={yDomain}
        width={60}
        label={{
          value: yLabel,
          angle: -90,
          position: "outsideLeft",
          dy: 40,
        }}
      />

      <Tooltip
        labelFormatter={(i) =>
          dataWithIndex[i]?.dateObj?.toLocaleString("id-ID")
        }
      />

      {lines.map((line, i) => (
        <Line
          key={i}
          type="monotone"
          dataKey={line.key}
          name={line.label}
          stroke={line.color}
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 6 }}
        />
      ))}
    </LineChart>
  );

  // ======================
  // 🔑 RETURN
  // ======================
  return full ? (
    <div ref={scrollRef} className="w-full overflow-x-auto">
      <div style={{ width: chartWidth }}>
        {Chart}
      </div>
    </div>
  ) : (
    <div className="w-full overflow-hidden">
      {Chart}
    </div>
  );
};

export default GrafikLineScrollable;
