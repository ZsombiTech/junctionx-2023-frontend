import React from "react";
import { Link, useLocation } from "react-router-dom";
import HouseGrayIcon from "../assets/houseGray.svg";
import HouseGreenIcon from "../assets/houseGreen.svg";
import NotificationGrayIcon from "../assets/notificationGray.svg";
import NotificationGreenIcon from "../assets/notificationGreen.svg";

export default function BottomNavbar() {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 flex justify-around py-2 w-full items-center bg-lightBlue">
      <Link
        className="flex flex-col items-center justify-center"
        to="/appointments"
      >
        <img
          src={
            location.pathname === "/appointments"
              ? HouseGreenIcon
              : HouseGrayIcon
          }
          alt="House Icon"
          className="w-6"
        />
        <p
          className={`text-xs font-bold ${
            location.pathname === "/appointments"
              ? "text-primary"
              : "text-darkerGray"
          }`}
        >
          Appointments
        </p>
      </Link>
      <Link
        className="flex flex-col items-center justify-center"
        to="/notifications"
      >
        <img
          src={
            location.pathname === "/notifications"
              ? NotificationGreenIcon
              : NotificationGrayIcon
          }
          alt="Notification Icon"
          className="w-6"
        />
        <p
          className={`text-xs font-bold ${
            location.pathname === "/notifications"
              ? "text-primary"
              : "text-darkerGray"
          }`}
        >
          Notifications
        </p>
      </Link>
    </div>
  );
}
