import React from "react";
import CalendarEvent from "./CalendarEvent";

interface Props {
  item: any;
  selectedDeviceParent: string;
  index: number;
}

export default function CalendarDay({
  item,
  selectedDeviceParent,
  index,
}: Props) {
  let borderClass = "";
  if (
    typeof item === "string" &&
    (item.includes("AM") || item.includes("PM"))
  ) {
    return (
      <p className="flex justify-center items-center text-xs translate-y-[40%]">
        {item as string}
      </p>
    );
  }

  if (index < 8 && (index - 1) % 8 === 0) {
    borderClass += "border-b-[1px] border-r-[1px] border-black";
  } else if (index === 7) {
    borderClass += "border-b-[1px] border-l-[1px] border-black";
  } else if (index < 8) {
    borderClass += "border-b-[1px] border-r-[1px] border-l-[1px] border-black";
  } else if ((index - 1) % 8 === 0) {
    borderClass += "border-b-[1px] border-t-[1px] border-r-[1px] border-black";
  } else {
    borderClass += "border-[1px] border-black";
  }

  return (
    <div
      className={`flex relative justify-start items-center h-8 lg:h-5 2xl:h-10 col-span-2 ${borderClass}`}
    >
      {(
        item as {
          events: {
            name: string;
            startingMinute: number;
            endingMinute: number;
            color: string;
            start_hour: number;
            appointment_id: number;
          }[];
        }
      ).events.map((event, index) => (
        <CalendarEvent
          event={event}
          key={index}
          selectedDeviceParent={selectedDeviceParent}
        />
      ))}
    </div>
  );
}
