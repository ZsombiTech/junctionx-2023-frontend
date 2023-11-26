import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import { getStatisticsApi } from "../api";
import { Chart } from "react-google-charts";

export default function Statistics() {
  const [loading, setLoading] = useState(true);
  const [pieChartData, setPieChartData] = useState<any[]>([]);
  const [columnChartData, setColumnChartData] = useState<any[]>([]);
  const [lineChartData, setLineChartData] = useState<any[]>([]);
  const [pointChartData, setPointChartData] = useState<any[]>([]);

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

        const columnChartData = [["Cancer", "Cancer Type", { role: "style" }]];

        const lineChartData: any[] = [
          [
            "Device",
            "TrueBeam#1",
            "TrueBeam#2",
            "VitalBeam#1",
            "VitalBeam#2",
            "Unique#1",
          ],
        ];

        const pointChartData = [["Average events", "Days"]];

        Object.keys(rawData[3]).forEach((key) => {
          columnChartData.push([key, rawData[3][key], "#3366cc"]);
        });

        Object.keys(rawData[1]).forEach((key) => {
          pointChartData.push([key, rawData[1][key]]);
        });

        for (let i = 0; i < 5; i++) {
          const temp = [i + 1];
          Object.values(rawData[2]).forEach((item: any) => {
            temp.push(item * (i + 1));
          });

          lineChartData.push(temp);
        }

        setPieChartData(pieChartData);
        setColumnChartData(columnChartData);
        setLineChartData(lineChartData);
        setPointChartData(pointChartData);
      }

      setLoading(false);
    };

    asyncFunc();
  }, []);

  const options3 = {
    title: "Average events per day",
    hAxis: { title: "Average events", minValue: 0, maxValue: 5 },
    vAxis: { title: "Days", minValue: 0, maxValue: 5 },
    legend: "none",
    animation: {
      startup: true,
      easing: "linear",
      duration: 1500,
    },
    enableInteractivity: false,
  };

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
              data={pointChartData}
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
              data={columnChartData}
            />
          </div>
          <div className="w-[85%] flex flex-row justify-center items-center border-2 border-black rounded-lg p-2">
            <Chart
              chartType="Line"
              width="100%"
              height="400px"
              data={lineChartData}
            />
          </div>
        </div>
      </div>
      <SideBar />
    </>
  );
}
