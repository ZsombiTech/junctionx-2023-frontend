import React, { useEffect, useState } from "react";
import ArrowLeft from "../assets/arrowLeft.svg";
import ArrowRight from "../assets/arrowRight.svg";
import CalendarDay from "./CalendarDay";
import {
  allDevices,
  calendarDataConverter,
  monthsNames,
} from "../config/calendarDataConverter";
import { getFullCalendarApi } from "../api";
import { StatusCodes } from "http-status-codes";
import Loading from "./Loading";

export default function Calendar() {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [selectedDevice, setSelectedDevice] = useState(allDevices[0].name);
  const [calendars, setCalendars] = useState(null);
  const [loading, setLoading] = useState(true);

  const monthName =
    calendars &&
    calendars[selectedDevice] &&
    calendars[selectedDevice][currentWeek] &&
    (calendars[selectedDevice][currentWeek] as any).months
      ? (calendars[selectedDevice][currentWeek] as any).days[0].number >
        (calendars[selectedDevice][currentWeek] as any).days[
          (calendars[selectedDevice][currentWeek] as any).days.length - 1
        ].number
        ? `${
            monthsNames[
              (calendars[selectedDevice][currentWeek] as any).months - 2
            ]
          }-${
            monthsNames[
              (calendars[selectedDevice][currentWeek] as any).months - 1
            ]
          }`
        : monthsNames[
            (calendars[selectedDevice][currentWeek] as any).months - 1
          ]
      : 0;

  useEffect(() => {
    const asyncFunction = async () => {
      const calendarRequest = await getFullCalendarApi();

      setLoading(false);

      if (calendarRequest.status === StatusCodes.OK) {
        const calendarData = calendarRequest.data;
        const calendarDataConverted = calendarDataConverter(calendarData);
        setCalendars(calendarDataConverted);
      }
    };

    asyncFunction();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <div className="absolute left-0 bottom-0 w-full">
        <div className="flex items-center gap-6 m-3">
          <div className="flex">
            <div
              className="flex p-2 items-center justify-center bg-lighterGray border-r-[1px] border-darkerGray rounded-l-xl shadow-[1px_1px_3px_3px_rgba(103,116,152,0.3)] cursor-pointer"
              onClick={() => {
                setCurrentWeek(
                  currentWeek === 0 ? currentWeek : currentWeek - 1
                );
              }}
            >
              <img src={ArrowLeft} alt="Arrow Left" className="w-3" />
            </div>
            <div
              className="flex p-2 items-center justify-center bg-lighterGray border-l-[1px] border-darkerGray rounded-r-xl shadow-[1px_1px_3px_3px_rgba(103,116,152,0.3)] cursor-pointer"
              onClick={() => {
                setCurrentWeek(
                  /* @ts-ignore */
                  currentWeek === calendars[selectedDevice].length - 1
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
              {allDevices.map((item, index) => (
                <option value={item.name} key={index}>
                  {item.name}
                </option>
              ))}
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

          <h2 className="font-bold text-2xl">{monthName}</h2>
        </div>
        <div className="w-full lg:w-4/5 grid grid-cols-15 bg-lightBlue h-[55vh] lg:h-[60vh] 2xl:h-[70vh] overflow-y-auto py-3 noscrollbar">
          <div className="flex justify-center items-center col-span-1 mb-3"></div>
          {/* @ts-ignore */}
          {calendars &&
            calendars[selectedDevice] &&
            calendars[selectedDevice][currentWeek] &&
            (calendars[selectedDevice][currentWeek] as any).days.map(
              (item: any, index: number) => (
                <div
                  className="flex justify-center items-center col-span-2 mb-3"
                  key={index}
                >
                  <div className="flex flex-col items-center justify-center">
                    <h2 className="text-xl text-center">{item.name}</h2>
                    <h1 className="text-4xl text-center font-bold">
                      {item.number}
                    </h1>
                  </div>
                </div>
              )
            )}
          {/* @ts-ignore */}
          {calendars &&
            calendars[selectedDevice] &&
            calendars[selectedDevice][currentWeek] &&
            (calendars[selectedDevice][currentWeek] as any).events.map(
              (item: any, index: number) => {
                return <CalendarDay item={item} index={index} key={index} />;
              }
            )}
        </div>
      </div>
    </>
  );
}
