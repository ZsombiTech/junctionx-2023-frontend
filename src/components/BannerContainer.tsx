import React from "react";

interface Props {
  type: string;
  status: string;
  next_treatment: string;
  index: number;
}

export default function BannerContainer({
  type,
  status,
  next_treatment,
  index,
}: Props) {
  return (
    <div className="flex flex-col justify-center items-center bg-lightBlue rounded-lg w-[10rem] h-[9rem] shrink-0 p-2 shadow-[1px_1px_4px_4px_rgba(2,128,144,1)]">
      <h1 className="text-2xl font-bold uppercase text-black">
        LINAC #{index + 1}
      </h1>
      <h3 className="text-xl font-bold text-primary">{type}</h3>

      <p className="text-base font-bold text-black text-center">
        Status: <span className="text-sm">{status}</span>
      </p>
      <p className="text-base font-bold text-black text-center">
        Next treatment:{" "}
        <span className="text-sm">
          {new Date(next_treatment).toLocaleString()}
        </span>
      </p>
    </div>
  );
}
