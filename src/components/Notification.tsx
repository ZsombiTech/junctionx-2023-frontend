import React from "react";

interface Props {
  date: string;
  title: string;
}

export default function NotificationComponent({ date, title }: Props) {
  return (
    <div className="w-[90vw] p-2 flex flex-col justify-center items-start bg-lighterGray rounded-lg shadow-[1px_1px_4px_4px_rgba(103,116,152,0.5)] mb-5">
      <p className="text-darkerGray text-base font-medium">{date}</p>
      <h1 className="text-2xl font-bold text-primary">{title}</h1>
    </div>
  );
}
