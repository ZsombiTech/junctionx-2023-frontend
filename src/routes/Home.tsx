import React from "react";
import SideBar from "../components/SideBar";
import Calendar from "../components/Calendar";
import BannerContainer from "../components/BannerContainer";
import Navbar from "../components/Navbar";

export default function Home() {
  const data = [
    { name: "LINAC #2", device: "TrueBeam", status: "reserved (40 mins left)" },
    { name: "LINAC #2", device: "TrueBeam", status: "reserved (40 mins left)" },
    { name: "LINAC #2", device: "TrueBeam", status: "reserved (40 mins left)" },
    { name: "LINAC #2", device: "TrueBeam", status: "reserved (40 mins left)" },
    { name: "LINAC #2", device: "TrueBeam", status: "reserved (40 mins left)" },
  ];

  return (
    <>
      <Navbar />
      <div className="flex items-center gap-5 mt-2 2xl:mt-5 w-full lg:w-4/5 overflow-y-scroll p-2 noscrollbar">
        {data.map((item, index) => (
          <BannerContainer
            name={item.name}
            device={item.device}
            status={item.status}
            key={index}
          />
        ))}
      </div>
      <Calendar />
      <SideBar />
    </>
  );
}
