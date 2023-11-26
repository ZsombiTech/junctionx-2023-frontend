import React from "react";

interface Props {
  isInformation: boolean;
  place: string;
  from: string;
  to: string;
}

export default function AppointmentNotification({
  isInformation,
  place,
  from,
  to,
}: Props) {
  return (
    <div className="w-full flex flex-col justify-center items-start bg-lighterGray rounded-lg shadow-[1px_1px_4px_4px_rgba(103,116,152,0.5)] mb-5">
      <p className="text-center w-full">(Sample appointment:)</p>
      <h1 className="text-2xl font-bold text-primary mt-1 ml-1 mr-1">
        Treatment appointment
      </h1>
      <p className="text-base font-bold text-black mt-2 ml-2">{place}</p>
      <p className="text-base font-bold text-black ml-2">From: {from}</p>
      <p className="text-base font-bold text-black ml-2">To: {to}</p>

      {isInformation ? (
        <></>
      ) : (
        <div className="w-full flex items-center mt-2">
          <div className="w-1/2 py-1 flex justify-center items-center bg-statusMedium rounded-bl-lg text-white font-bold cursor-pointer">
            Reschedule
          </div>
          <div className="w-1/2 py-1 flex justify-center items-center bg-statusUrgent rounded-br-lg text-white font-bold cursor-pointer">
            Cancel
          </div>
        </div>
      )}
    </div>
  );
}
