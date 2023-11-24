import React, { useState } from "react";
import ArrowLeft from "../assets/arrowLeft.svg";
import ArrowRight from "../assets/arrowRight.svg";

const calendars = [
  {
    days: [
      {
        name: "MON",
        number: 20,
      },
      {
        name: "TUE",
        number: 21,
      },
      {
        name: "WED",
        number: 22,
      },
      {
        name: "THU",
        number: 23,
      },
      {
        name: "FRI",
        number: 24,
      },
      {
        name: "SAT",
        number: 25,
      },
      {
        name: "SUN",
        number: 26,
      },
    ],
    events: [
      "1 AM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: ["qdqd"],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      "2 AM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      "3 AM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      "4 AM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      "5 AM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      "6 AM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      "7 AM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: ["qdq222d"],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: ["efcc"],
      },
      {
        events: [],
      },
      "8 AM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      "9 AM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      "10 AM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      "11 AM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      "12 PM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      "13 PM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      "14 PM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      "15 PM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      "16 PM",
      {
        events: ["qdqd"],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      "17 PM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      "18 PM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      "19 PM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      "20 PM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      "21 PM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      "22 PM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      "23 PM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
    ],
  },
  {
    days: [
      {
        name: "MON",
        number: 27,
      },
      {
        name: "TUE",
        number: 28,
      },
      {
        name: "WED",
        number: 29,
      },
      {
        name: "THU",
        number: 30,
      },
      {
        name: "FRI",
        number: 31,
      },
      {
        name: "SAT",
        number: 1,
      },
      {
        name: "SUN",
        number: 2,
      },
    ],
    events: [
      "1 AM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      "2 AM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      "3 AM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      "4 AM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      "5 AM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      "6 AM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      "7 AM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      "8 AM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      "9 AM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      "10 AM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      "11 AM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      "12 PM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      "13 PM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      "14 PM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      "15 PM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      "16 PM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      "17 PM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      "18 PM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      "19 PM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      "20 PM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      "21 PM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      "22 PM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      "23 PM",
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
      {
        events: [],
      },
    ],
  },
];

export default function Calendar() {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [selectedDevice, setSelectedDevice] = useState("LINAC #2 - VitalBeam");

  return (
    <div className="absolute left-0 bottom-0 w-full">
      <div className="flex items-center gap-6 m-3">
        <div className="flex">
          <div
            className="flex p-2 items-center justify-center bg-lighterGray border-r-[1px] border-darkerGray rounded-l-xl shadow-[1px_1px_3px_3px_rgba(103,116,152,0.3)] cursor-pointer"
            onClick={() => {
              setCurrentWeek(currentWeek === 0 ? currentWeek : currentWeek - 1);
            }}
          >
            <img src={ArrowLeft} alt="Arrow Left" className="w-3" />
          </div>
          <div
            className="flex p-2 items-center justify-center bg-lighterGray border-l-[1px] border-darkerGray rounded-r-xl shadow-[1px_1px_3px_3px_rgba(103,116,152,0.3)] cursor-pointer"
            onClick={() => {
              setCurrentWeek(
                currentWeek === calendars.length - 1
                  ? currentWeek
                  : currentWeek + 1
              );
            }}
          >
            <img src={ArrowRight} alt="Arrow Left" className="w-3" />
          </div>
        </div>
        <div className="relative">
          <select
            className="appearance-none py-1 bg-lighterGray shadow-[1px_1px_3px_3px_rgba(103,116,152,0.3)] rounded-full px-8 text-light-gray focus:outline-none cursor-pointer"
            value={selectedDevice}
            onChange={(e) => {
              setSelectedDevice(e.target.value);
            }}
          >
            <option value="LINAC #2 - VitalBeam">LINAC #2 - VitalBeam</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-1 pointer-events-none">
            <svg
              className="w-6 h-6 fill-current text-black"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-4/5 grid grid-cols-15 bg-lightBlue h-[55vh] lg:h-[60vh] 2xl:h-[70vh] overflow-y-auto py-3 noscrollbar">
        <div className="flex justify-center items-center col-span-1 mb-3"></div>
        {calendars[currentWeek].days.map((item, index) => (
          <div
            className="flex justify-center items-center col-span-2 mb-3"
            key={index}
          >
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-xl text-center">{item.name}</h2>
              <h1 className="text-4xl text-center font-bold">{item.number}</h1>
            </div>
          </div>
        ))}

        {calendars[currentWeek].events.map((item, index) => {
          let borderClass = "";
          if (
            typeof item === "string" &&
            (item.includes("AM") || item.includes("PM"))
          ) {
            return (
              <p
                className="flex justify-center items-center text-xs translate-y-[40%]"
                key={index}
              >
                {item as string}
              </p>
            );
          }

          if (index < 8 && (index - 1) % 8 === 0) {
            borderClass += "border-b-[1px] border-r-[1px] border-black";
          } else if (index === 7) {
            borderClass += "border-b-[1px] border-l-[1px] border-black";
          } else if (index < 8) {
            borderClass +=
              "border-b-[1px] border-r-[1px] border-l-[1px] border-black";
          } else if ((index - 1) % 8 === 0) {
            borderClass +=
              "border-b-[1px] border-t-[1px] border-r-[1px] border-black";
          } else {
            borderClass += "border-[1px] border-black";
          }

          return (
            <div
              className={`flex justify-start items-center h-7 lg:h-5 2xl:h-10 col-span-2 ${borderClass}`}
              key={index}
            >
              {(
                item as {
                  events: string[];
                }
              ).events.map((event, index) => (
                <div className="w-1/2 h-full bg-primary" key={index}>
                  <p className="text-xs text-center text-white">{event}</p>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
