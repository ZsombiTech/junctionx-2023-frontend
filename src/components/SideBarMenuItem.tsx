import React from "react";

interface Props {
  name: string;
  age: number;
  type: string;
  weight: number;
  disablities: string;
}

export default function SideBarMenuItem({
  name,
  age,
  type,
  weight,
  disablities,
}: Props) {
  return (
    <div className="flex justify-between bg-lightGray border-[1px] border-primary rounded-lg pl-3 h-[10rem] mb-4">
      <div className="flex flex-col gap-2 my-2">
        <h2 className="font-bold text-lg">{name}</h2>

        <div className="flex flex-col">
          <p className="font-medium text-sm">Age: {age}</p>
          <p className="font-medium text-sm">Type: {type}</p>
          <p className="font-medium text-sm">Weight: {weight}</p>
          <p className="font-medium text-sm">Disablities: {disablities}</p>
        </div>
      </div>

      <div className="h-full bg-statusUrgent w-8 rounded-r-lg flex items-center justify-center">
        <span className="text-white rotate-90 whitespace-nowrap">
          Within 3 days
        </span>
      </div>
    </div>
  );
}
