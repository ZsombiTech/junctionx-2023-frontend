import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import { deleteLogsApi, getLogsApi } from "../api";
import { toast } from "react-toastify";

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

  const handleClearData = async () => {
    setLoading(true);

    const deleteRequest = await deleteLogsApi();

    if (deleteRequest.status === 200) {
      toast.success("Successfully deleted logs", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      setLogsData([]);
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
            Past events
          </h1>
          <button
            className="h-10 py-1 px-12 rounded-md bg-primary font-bold text-white focus:outline-none placeholder-white hover:text-primary hover:bg-white border-primary hover:border-2"
            onClick={handleClearData}
          >
            Clear data
          </button>
        </div>
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

          {logsData.length === 0 && (
            <h1 className="text-black text-center text-xl font-bold mt-5">
              No logs found
            </h1>
          )}
        </div>
      </div>
      <SideBar />
    </>
  );
}
