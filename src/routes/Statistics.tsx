import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import { getStatisticsApi } from "../api";
import { Chart } from "react-google-charts";

export default function Statistics() {
  const [loading, setLoading] = useState(true);
  const [pieChartData, setPieChartData] = useState<any[]>([]);

  useEffect(() => {
    const asyncFunc = async () => {
      const statisticsRequest = await getStatisticsApi();

      if (statisticsRequest.status === 200) {
        const rawData = statisticsRequest.data;

        const pieChartData = [
          ["Device", "Usage"],
          ["TrueBeam#1", rawData[0]["1"]],
          ["TrueBeam#2", rawData[0]["2"]],
          ["VitalBeam#1", rawData[0]["3"]],
          ["VitalBeam#2", rawData[0]["4"]],
          ["Unique#1", rawData[0]["4"]],
        ];

        setPieChartData(pieChartData);
      }

      setLoading(false);
    };

    asyncFunc();
  }, []);

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
      duration: 1500,
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

  const handleRefresh = async () => {
    setLoading(true);

    const statisticsRequest = await getStatisticsApi();

    if (statisticsRequest.status === 200) {
      const rawData = statisticsRequest.data;

      const pieChartData = [
        ["Device", "Usage"],
        ["TrueBeam#1", rawData[0]["1"]],
        ["TrueBeam#2", rawData[0]["2"]],
        ["VitalBeam#1", rawData[0]["3"]],
        ["VitalBeam#2", rawData[0]["4"]],
        ["Unique#1", rawData[0]["4"]],
      ];

      setPieChartData(pieChartData);
    }

    setLoading(false);
  };

  return (
    <>
      {loading && <Loading />}
      <Navbar />
      <div className="w-full lg:w-4/5 p-3 flex flex-col justify-center items-center">
        <div className="w-full flex justify-between items-center mt-4">
          <h1 className="text-center text-2xl font-bold text-black">
            Check out our statistics
          </h1>
          <button
            className="h-10 py-1 px-12 rounded-md bg-primary font-bold text-white focus:outline-none placeholder-white hover:text-primary hover:bg-white border-primary hover:border-2"
            onClick={handleRefresh}
          >
            Refresh
          </button>
        </div>
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
              data={pieChartData}
              options={{
                is3D: true,
              }}
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
