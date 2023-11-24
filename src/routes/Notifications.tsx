import React from "react";
import BottomNavbar from "../components/BottomNavbar";
import NotificationComponent from "../components/Notification";

export default function Notifications() {
  return (
    <>
      <h2 className="text-3xl text-black m-3 font-bold mt-5">Notifications</h2>
      <div className="w-full h-[1px] bg-black mt-2"></div>
      <div className="flex justify-center items-center w-full pt-5">
        <div className="h-[80vh] overflow-y-auto noscrollbar pt-3 px-3">
          <NotificationComponent
            date="Dec. 23, Monday, 10:30AM"
            title="New appointment"
          />
        </div>
      </div>
      <BottomNavbar />
    </>
  );
}
