import React, { useState } from "react";
import SideBarMenuItem from "./SideBarMenuItem";

export default function SideBar() {
  const [isOpened, setIsOpened] = useState(false);
  const isMobile = window.innerWidth <= 640;

  const data = [
    {
      title: "Transport",
      name: "Matyas Nyilas",
      age: 17,
      type: "lung cancer",
      weight: 50,
      disablities: "none",
    },
    {
      title: "Transport",
      name: "Matyas2 Nyilas",
      age: 17,
      type: "lung cancer",
      weight: 50,
      disablities: "none",
    },
    {
      title: "Transport",
      name: "Matyas2 Nyilas",
      age: 17,
      type: "lung cancer",
      weight: 50,
      disablities: "none",
    },
    {
      title: "Transport",
      name: "Matyas2 Nyilas",
      age: 17,
      type: "lung cancer",
      weight: 50,
      disablities: "none",
    },
    {
      title: "Transport",
      name: "Matyas2 Nyilas",
      age: 17,
      type: "lung cancer",
      weight: 50,
      disablities: "none",
    },
    {
      title: "Transport",
      name: "Matyas2 Nyilas",
      age: 17,
      type: "lung cancer",
      weight: 50,
      disablities: "none",
    },
  ];

  return !isMobile ? (
    <div className="fixed top-0 right-0 h-screen w-[20vw] flex flex-col bg-lightBlue border-l-[1px] border-primary">
      <h3 className="text-2xl text-darkerGray font-medium text-center mt-5">
        UPCOMING
      </h3>

      <div className="h-px bg-darkerGray w-full mt-[12px]"></div>

      <div className="h-full p-3 overflow-y-auto noscrollbar">
        {data.map((patient, index) => {
          return (
            <SideBarMenuItem
              title={patient.title}
              name={patient.name}
              age={patient.age}
              type={patient.type}
              weight={patient.weight}
              disablities={patient.disablities}
              key={index}
            />
          );
        })}
      </div>
    </div>
  ) : isOpened ? (
    <div className="fixed w-[100vw] h-[100vh] bg-lightBlue flex flex-col justify-start z-30 p-3">
      <div className="flex items-start justify-end w-full">
        <button
          className="bg-black text-white py-1 px-3 rounded-md"
          onClick={() => setIsOpened(false)}
        >
          Close
        </button>
      </div>

      <h3 className="text-2xl text-darkerGray font-medium text-center mt-5">
        UPCOMING
      </h3>

      <div className="h-px bg-black w-full mt-1"></div>

      <div className="h-full p-3 overflow-y-auto">
        {data.map((patient, index) => {
          return (
            <SideBarMenuItem
              title={patient.title}
              name={patient.name}
              age={patient.age}
              type={patient.type}
              weight={patient.weight}
              disablities={patient.disablities}
              key={index}
            />
          );
        })}
      </div>
    </div>
  ) : (
    <button
      className="fixed top-3/5 right-0 bg-black text-white py-1 px-3 rounded-md m-3 mr-1"
      onClick={() => setIsOpened(true)}
    >
      Open
    </button>
  );
}
