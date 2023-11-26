import React, { useEffect, useState } from "react";
import SideBarMenuItem from "./SideBarMenuItem";
import { getUpcomingApi } from "../api";
import { StatusCodes } from "http-status-codes";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import CancelIcon from "../assets/cancelIcon.svg";
import { setSelectedDevice } from "../redux/reducers/appReducer";

export default function SideBar() {
  const selectedDeviceRedux = useAppSelector(
    (state) => state.app.selectedDevice
  );
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [allUpcomingEvents, setAllUpcomingEvents] = useState<any[]>([]);
  const [isOpened, setIsOpened] = useState(false);
  const isMobile = window.innerWidth <= 640;

  useEffect(() => {
    const asyncFunction = async () => {
      setIsLoading(true);

      const allUpcomingEventsRequest = await getUpcomingApi();

      if (allUpcomingEventsRequest.status === StatusCodes.OK) {
        setAllUpcomingEvents(allUpcomingEventsRequest.data);
      }

      setIsLoading(false);
    };

    asyncFunction();
  }, []);

  return !isMobile ? (
    <div className="fixed top-0 right-0 h-screen w-[20vw] flex flex-col bg-lightBlue border-l-[1px] border-primary">
      <h3 className="text-2xl text-darkerGray font-medium text-center mt-5">
        UPCOMING
      </h3>
      {selectedDeviceRedux !== "" && (
        <div className="flex items-center justify-center gap-2">
          <p className="text-lg text-darkerGray font-medium text-center mt-2">
            Filter by {selectedDeviceRedux}
          </p>
          <img
            src={CancelIcon}
            alt="Cancel"
            className="w-5 -mb-2.5 cursor-pointer hover:transform hover:scale-150 transition-all duration-300"
            onClick={() => {
              dispatch(setSelectedDevice(""));
            }}
          />
        </div>
      )}

      <div className="h-px bg-darkerGray w-full mt-[12px]"></div>
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="h-full p-3 overflow-y-auto noscrollbar">
          {selectedDeviceRedux !== ""
            ? allUpcomingEvents
                .filter(
                  (patient) =>
                    `${patient.resource.type}#${patient.resource.id}` ===
                    selectedDeviceRedux
                )
                .map((patient, index) => {
                  return (
                    <SideBarMenuItem
                      id={patient.id}
                      title={"Therapy"}
                      name={
                        patient.demand.patient.first_name +
                        " " +
                        patient.demand.patient.last_name
                      }
                      device_name={`${patient.resource.type}#${patient.resource.id}`}
                      age={Math.floor(Math.random() * 60) + 20}
                      type={patient.demand.cancer_type.region}
                      weight={Math.floor(Math.random() * 70) + 50}
                      end_time={patient.start}
                      key={index}
                    />
                  );
                })
            : allUpcomingEvents.map((patient, index) => {
                return (
                  <SideBarMenuItem
                    id={patient.id}
                    title={"Therapy"}
                    name={
                      patient.demand.patient.first_name +
                      " " +
                      patient.demand.patient.last_name
                    }
                    device_name={`${patient.resource.type}#${patient.resource.id}`}
                    age={Math.floor(Math.random() * 60) + 20}
                    type={patient.demand.cancer_type.region}
                    weight={Math.floor(Math.random() * 70) + 50}
                    end_time={patient.start}
                    key={index}
                  />
                );
              })}
        </div>
      )}
    </div>
  ) : isOpened ? (
    <div className="fixed w-[100vw] h-[100vh] bg-lightBlue flex flex-col justify-start z-30 p-3">
      <div className="flex items-start justify-end w-full">
        <button
          className="bg-black text-white py-1 px-3 rounded-md"
          onClick={() => setIsOpened(false)}
        >
          Close
        </button>
      </div>

      <h3 className="text-2xl text-darkerGray font-medium text-center mt-5">
        UPCOMING
      </h3>

      <div className="h-px bg-black w-full mt-1"></div>

      <div className="h-full p-3 overflow-y-auto">
        {selectedDeviceRedux !== ""
          ? allUpcomingEvents
              .filter(
                (patient) =>
                  `${patient.resource.type}#${patient.resource.id}` ===
                  selectedDeviceRedux
              )
              .map((patient, index) => {
                return (
                  <SideBarMenuItem
                    id={patient.id}
                    title={"Therapy"}
                    name={
                      patient.demand.patient.first_name +
                      " " +
                      patient.demand.patient.last_name
                    }
                    device_name={`${patient.resource.type}#${patient.resource.id}`}
                    age={Math.floor(Math.random() * 60) + 20}
                    type={patient.demand.cancer_type.region}
                    weight={Math.floor(Math.random() * 70) + 50}
                    end_time={patient.start}
                    key={index}
                  />
                );
              })
          : allUpcomingEvents.map((patient, index) => {
              return (
                <SideBarMenuItem
                  id={patient.id}
                  title={"Therapy"}
                  name={
                    patient.demand.patient.first_name +
                    " " +
                    patient.demand.patient.last_name
                  }
                  device_name={`${patient.resource.type}#${patient.resource.id}`}
                  age={Math.floor(Math.random() * 60) + 20}
                  type={patient.demand.cancer_type.region}
                  weight={Math.floor(Math.random() * 70) + 50}
                  end_time={patient.start}
                  key={index}
                />
              );
            })}
      </div>
    </div>
  ) : (
    <button
      className="fixed top-3/5 right-0 bg-black text-white py-1 px-3 rounded-md m-3 mr-1"
      onClick={() => setIsOpened(true)}
    >
      Open
    </button>
  );
}
