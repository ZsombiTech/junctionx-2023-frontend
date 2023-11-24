import React from "react";
import BottomNavbar from "../components/BottomNavbar";
import AppointmentNotification from "../components/AppointmentNotification";

export default function Appointments() {
  return (
    <>
      <div className="flex justify-center items-center w-full pt-5">
        <div className="h-[30vh] overflow-y-auto noscrollbar pt-3 px-3">
          <AppointmentNotification
            isInformation={false}
            place="St. Janos - room 420"
            from="Dec. 23, Monday, 10:30AM"
            to="Dec. 24, Tuesday, 10:30AM"
          />
        </div>
      </div>

      <h2 className="text-2xl text-black ml-3 font-bold">Your appointments</h2>
      <div className="w-full h-[1px] bg-black mt-2"></div>
      <div className="flex justify-center items-center w-full pt-5">
        <div className="h-[50vh] overflow-y-auto noscrollbar pt-3 px-3">
          <AppointmentNotification
            isInformation={true}
            place="St. Janos - room 420"
            from="Dec. 23, Monday, 10:30AM"
            to="Dec. 24, Tuesday, 10:30AM"
          />
        </div>
      </div>
      <BottomNavbar />
    </>
  );
}
