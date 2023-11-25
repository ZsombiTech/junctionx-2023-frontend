import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import Calendar from "../components/Calendar";
import BannerContainer from "../components/BannerContainer";
import Navbar from "../components/Navbar";
import { getAllResourcesApi } from "../api";

interface BannerData {
  name: string;
  device: string;
  status: string;
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [bannerDatas, setBannerDatas] = useState<BannerData[]>([
    { name: "LINAC #2", device: "TrueBeam", status: "reserved (40 mins left)" },
    { name: "LINAC #2", device: "TrueBeam", status: "reserved (40 mins left)" },
    { name: "LINAC #2", device: "TrueBeam", status: "reserved (40 mins left)" },
    { name: "LINAC #2", device: "TrueBeam", status: "reserved (40 mins left)" },
    { name: "LINAC #2", device: "TrueBeam", status: "reserved (40 mins left)" },
  ]);

  useEffect(() => {
    const asyncFunction = async () => {
      const bannerDataRequest = await getAllResourcesApi();

      if (bannerDataRequest.status === 200) {
        setBannerDatas(bannerDataRequest.data);
      }

      setLoading(false);
    };

    asyncFunction();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex items-center gap-5 mt-2 2xl:mt-5 w-full lg:w-4/5 overflow-y-scroll p-2 noscrollbar">
        {loading ? (
          <div className="flex justify-center items-center w-full h-full">
            <h1 className="text-4xl font-bold text-black">Loading...</h1>
          </div>
        ) : (
          bannerDatas.map((item, index) => (
            <BannerContainer
              name={item.name}
              device={item.device}
              status={item.status}
              key={index}
            />
          ))
        )}
      </div>
      <Calendar />
      <SideBar />
    </>
  );
}
