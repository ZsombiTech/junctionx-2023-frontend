import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { setSelectedEventId } from "../redux/reducers/appReducer";

interface Props {
  id: number;
  title: string;
  name: string;
  device_name: string;
  age: number;
  type: string;
  weight: number;
  end_time: string;
}

export default function SideBarMenuItem({
  id,
  title,
  name,
  device_name,
  age,
  type,
  weight,
  end_time,
}: Props) {
  const dispatch = useAppDispatch();
  const [remainingTimeMinuteSecond, setRemainingTimeMinuteSecond] =
    useState("00:00");
  const remainingLabel =
    parseInt(remainingTimeMinuteSecond.split(":")[0]) < 10
      ? "Within 10 minutes"
      : parseInt(remainingTimeMinuteSecond.split(":")[0]) < 30
      ? "Within half an hour"
      : "Within a day";

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const endTime = new Date(end_time);
      const remainingTime = endTime.getTime() - now.getTime();

      const remainingTimeMinute = Math.floor(remainingTime / 60000);
      const remainingTimeSecond = Math.floor((remainingTime % 60000) / 1000);

      setRemainingTimeMinuteSecond(
        `${
          remainingTimeMinute < 10
            ? "0" + remainingTimeMinute
            : remainingTimeMinute
        }:${
          remainingTimeSecond < 10
            ? "0" + remainingTimeSecond
            : remainingTimeSecond
        }`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [end_time]);

  return (
    <div
      className="flex justify-between bg-lightGray rounded-lg pl-3 h-[10rem] mb-4 shadow-[1px_1px_4px_4px_rgba(2,128,144,0.2)] cursor-pointer hover:transform hover:scale-105 transition-all duration-300"
      onMouseEnter={() => {
        dispatch(setSelectedEventId(`${id}-${device_name}`));
      }}
      onMouseLeave={() => {
        dispatch(setSelectedEventId(""));
      }}
    >
      <div className="flex flex-col gap-1 my-2">
        <h1 className="font-bold text-lg text-primary">
          {title} - {device_name}
        </h1>
        <h2 className="font-bold text-lg">{name}</h2>

        <div className="flex flex-col">
          <p className="font-medium text-sm">Type: {type}</p>
          <p className="font-medium text-sm">Weight: {weight}</p>
          <p className="font-medium text-sm -mt-2">
            Remaining time:{" "}
            <span className="font-bold text-lg">
              {remainingTimeMinuteSecond}
            </span>
          </p>
        </div>
      </div>

      <div
        className={`h-full ${
          remainingLabel === "Within 10 minutes"
            ? "bg-statusUrgent"
            : remainingLabel === "Within half an hour"
            ? "bg-statusMedium"
            : "bg-statusGood"
        }
        w-8 rounded-r-lg flex items-center justify-center`}
      >
        <span className="text-white rotate-90 whitespace-nowrap">
          {remainingLabel}
        </span>
      </div>
    </div>
  );
}
