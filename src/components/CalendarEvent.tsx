import React from "react";

interface Props {
  event: {
    name: string;
    startingMinute: number;
    endingMinute: number;
    fillOutColor: string;
  };
}

export default function CalendarEvent({ event }: Props) {
  return (
    <div
      className="absolute h-full"
      style={{
        width: `${((event.endingMinute - event.startingMinute) / 60) * 100}%`,
        left: `${(event.startingMinute / 60) * 100}%`,
        backgroundColor: event.fillOutColor ?? "#028090",
      }}
    >
      <p className="text-white text-xs">{event.name}</p>
    </div>
  );
}
