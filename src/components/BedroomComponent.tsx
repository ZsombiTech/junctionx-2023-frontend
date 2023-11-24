import React, { useState } from "react";

interface Props {
  number: number;
  bedNumber?: number;
  deviceName?: string;
  isDevice: boolean;
}

export default function BedroomComponent({
  number,
  bedNumber,
  deviceName,
  isDevice,
}: Props) {
  const [clickedContextMenu, setClickedContextMenu] = useState(false);
  const [e, setE] = useState<React.MouseEvent<HTMLDivElement, MouseEvent>>();

  const handleDeleteRoom = () => {
    setClickedContextMenu(false);
    setE(undefined);
  };

  return (
    <div
      className="flex items-center justify-between p-3 w-11/12 bg-lighterGray rounded-lg shadow-[1px_1px_4px_4px_rgba(103,116,152,0.5)] mb-3"
      onContextMenu={(e) => {
        e.preventDefault();
        if (clickedContextMenu) {
          setE(undefined);
          setClickedContextMenu(false);
          return;
        }
        setE(e);
        setClickedContextMenu(true);
      }}
    >
      <h1 className="text-4xl text-black font-bold">{number}</h1>
      <h1 className="text-3xl text-black font-medium">
        {isDevice ? deviceName : `${bedNumber} beds`}
      </h1>

      {clickedContextMenu ? (
        <button
          className="fixed px-3 py-1 border-[1px] border-primary rounded-lg bg-white"
          style={{
            top: e!.clientY,
            left: e!.clientX,
          }}
          onClick={handleDeleteRoom}
        >
          Remove room
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
