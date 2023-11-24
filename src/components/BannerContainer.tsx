import React from "react";

interface Props {
  name: string;
  device: string;
  status: string;
}

export default function BannerContainer({ name, device, status }: Props) {
  return (
    <div className="flex flex-col justify-center items-center bg-lightBlue rounded-lg w-[10rem] shrink-0 p-3 shadow-[1px_1px_4px_4px_rgba(2,128,144,1)]">
      <h1 className="text-2xl font-bold uppercase text-black">{name}</h1>
      <h3 className="text-xl font-bold text-primary">{device}</h3>

      <p className="text-lg font-bold text-black text-center">
        Status: {status}
      </p>
    </div>
  );
}
