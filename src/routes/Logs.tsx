import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import { getLogsApi } from "../api";

export default function Logs() {
  const [loading, setLoading] = useState(true);
  const [logsData, setLogsData] = useState([]);

  useEffect(() => {
    const asyncFunc = async () => {
      const logsRequest = await getLogsApi();

      if (logsRequest.status === 200) {
        setLogsData(
          logsRequest.data.sort((a: any, b: any) => {
            return (
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
            );
          })
        );
      }

      setLoading(false);
    };

    asyncFunc();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <Navbar />
      <div className="w-full lg:w-4/5 p-3 flex flex-col justify-center items-center">
        <h1 className="text-center text-4xl font-bold text-black">
          Past events
        </h1>
        <div className="w-full h-[1px] bg-black mt-4"></div>
        <div className="w-full lgw-1/2 h-[70vh] overflow-y-auto noscrollbar mt-5">
          {logsData.map((log: any, index: number) => {
            return (
              <div
                className="flex flex-row justify-between items-center w-full h-16 bg-white border-b-2 border-black"
                key={index}
              >
                <h1 className="text-black text-xl font-bold">{log.text}</h1>
                <h1 className="text-black text-xl">
                  {new Date(log.timestamp).toLocaleString()}
                </h1>
              </div>
            );
          })}
        </div>
      </div>
      <SideBar />
    </>
  );
}
