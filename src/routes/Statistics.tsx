import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import { getLogsApi } from "../api";
import { Chart } from "react-google-charts";

export default function Statistics() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const asyncFunc = async () => {
      const statisticsRequest = await getLogsApi();

      if (statisticsRequest.status === 200) {
      }

      setLoading(false);
    };

    asyncFunc();
  }, []);

  const data = [
    ["Task", "Hours per Day"],
    ["TrueBeam#1", 11],
    ["TrueBeam#2", 2],
    ["VitalBeam#1", 2],
    ["VitalBeam#2", 2],
    ["Unique#1", 7],
  ];

  const options = {
    is3D: true,
  };

  const data2 = [
    [
      "Device",
      "TrueBeam#1",
      "TrueBeam#2",
      "VitalBeam#1",
      "VitalBeam#2",
      "Unique#1",
    ],
    [1, 37.8, 80.8, 41.8, 30.9, 20.5],
    [2, 30.9, 69.5, 32.4, 21.4, 10.5],
    [3, 25.4, 57, 25.7, 19.4, 8.4],
    [4, 11.7, 18.8, 10.5, 7, 6.5],
    [5, 11.9, 17.6, 10.4, 8.5, 6.2],
    [6, 8.8, 13.6, 7.7, 6.6, 4.8],
    [7, 7.6, 12.3, 9.6, 4.8, 4.2],
    [8, 12.3, 29.2, 10.6, 5.6, 3.6],
    [9, 16.9, 42.9, 14.8, 8.5, 4.6],
  ];

  const options2 = {
    chart: {
      title: "Devices usage",
    },
  };

  const data3 = [
    ["Age", "Weight"],
    [8, 12],
    [4, 5.5],
    [11, 14],
    [4, 5],
    [3, 3.5],
    [6.5, 7],
  ];

  const options3 = {
    title: "Age vs. Weight comparison",
    hAxis: { title: "Age", minValue: 0, maxValue: 15 },
    vAxis: { title: "Weight", minValue: 0, maxValue: 15 },
    legend: "none",
    animation: {
      startup: true,
      easing: "linear",
      duration: 4000,
    },
    enableInteractivity: false,
  };

  const data4 = [
    ["Device", "Usage", { role: "style" }],
    ["TrueBeam#1", 8.94, "#b87333"], // RGB value
    ["TrueBeam#2", 10.49, "silver"], // English color name
    ["VitalBeam#1", 19.3, "gold"],
    ["VitalBeam#2", 21.45, "color: #e5e4e2"], // CSS-style declaration
    ["Unique#1", 21.45, "color: #e5e4e2"], // CSS-style declaration
  ];

  return (
    <>
      {loading && <Loading />}
      <Navbar />
      <div className="w-full lg:w-4/5 p-3 flex flex-col justify-center items-center">
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mt-4 gap-3">
          <div className="w-[85%] flex flex-row justify-center items-center border-2 border-black rounded-lg p-2">
            <Chart
              chartType="ScatterChart"
              width="100%"
              height="400px"
              data={data3}
              options={options3}
            />
          </div>
          <div className="w-[85%] flex flex-row justify-center items-center border-2 border-black rounded-lg p-2">
            <Chart
              chartType="PieChart"
              data={data}
              options={options}
              width={"100%"}
              height={"400px"}
            />
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mt-4 gap-3">
          <div className="w-[85%] flex flex-row justify-center items-center border-2 border-black rounded-lg p-2">
            <Chart
              chartType="ColumnChart"
              width="100%"
              height="400px"
              data={data4}
            />
          </div>
          <div className="w-[85%] flex flex-row justify-center items-center border-2 border-black rounded-lg p-2">
            <Chart
              chartType="Line"
              width="100%"
              height="400px"
              data={data2}
              options={options2}
            />
          </div>
        </div>
      </div>
      <SideBar />
    </>
  );
}
