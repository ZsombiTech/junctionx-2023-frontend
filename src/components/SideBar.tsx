import React, { useState } from "react";
import SideBarMenuItem from "./SideBarMenuItem";

export default function SideBar() {
  const [isOpened, setIsOpened] = useState(false);
  const isMobile = window.innerWidth <= 640;

  const data = [
    {
      name: "Matyas Nyilas",
      age: 17,
      type: "lung cancer",
      weight: 50,
      disablities: "none",
    },
    {
      name: "Matyas2 Nyilas",
      age: 17,
      type: "lung cancer",
      weight: 50,
      disablities: "none",
    },
    {
      name: "Matyas2 Nyilas",
      age: 17,
      type: "lung cancer",
      weight: 50,
      disablities: "none",
    },
    {
      name: "Matyas2 Nyilas",
      age: 17,
      type: "lung cancer",
      weight: 50,
      disablities: "none",
    },
    {
      name: "Matyas2 Nyilas",
      age: 17,
      type: "lung cancer",
      weight: 50,
      disablities: "none",
    },
    {
      name: "Matyas2 Nyilas",
      age: 17,
      type: "lung cancer",
      weight: 50,
      disablities: "none",
    },
  ];

  return !isMobile ? (
    <div className="fixed top-0 right-0 h-screen w-[20rem] flex flex-col bg-lightBlue">
      <h3 className="text-2xl text-black font-medium text-center mt-24">
        Unarranged patients
      </h3>

      <div className="h-px bg-black w-full mt-2"></div>

      <div className="h-full p-3 overflow-y-auto">
        {data.map((patient) => {
          return (
            <SideBarMenuItem
              name={patient.name}
              age={patient.age}
              type={patient.type}
              weight={patient.weight}
              disablities={patient.disablities}
            />
          );
        })}
      </div>
    </div>
  ) : isOpened ? (
    <div className="w-full h-screen bg-lightBlue flex flex-col justify-start z-30 p-3">
      <div className="flex items-start justify-end w-full">
        <button
          className="bg-black text-white py-1 px-3 rounded-md"
          onClick={() => setIsOpened(false)}
        >
          Close
        </button>
      </div>

      <h3 className="text-2xl text-black font-medium text-center mt-12">
        Unarranged patients
      </h3>

      <div className="h-px bg-black w-full mt-2"></div>

      <div className="h-full p-3 overflow-y-auto">
        {data.map((patient) => {
          return (
            <SideBarMenuItem
              name={patient.name}
              age={patient.age}
              type={patient.type}
              weight={patient.weight}
              disablities={patient.disablities}
            />
          );
        })}
      </div>
    </div>
  ) : (
    <button
      className="fixed top-0 right-0 bg-black text-white py-1 px-3 rounded-md m-3"
      onClick={() => setIsOpened(true)}
    >
      Open
    </button>
  );
}
