import React, { Fragment, useState } from "react";
import CancelIcon from "../assets/cancelIcon.svg";
import { Dialog, Transition } from "@headlessui/react";
import Loading from "./Loading";
import { getAppointmentApi } from "../api";
import { allDevices } from "../config/calendarDataConverter";

interface Props {
  event: {
    name: string;
    startingMinute: number;
    endingMinute: number;
    fillOutColor: string;
    start_hour: number;
    appointment_id: number;
  };
}

export default function CalendarEvent({ event }: Props) {
  const [openCalendarEventModal, setOpenCalendarEventModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [cancerType, setCancerType] = useState("");
  const [averageTreatmentDuration, setAverageTreatmentDuration] = useState(0);
  const [numberOfFractions, setNumberOfFractions] = useState(0);
  const [isInPatient, setIsInPatient] = useState(false);

  const [newDate, setNewDate] = useState("2023-11-25");
  const [newStartingTime, setNewStartingTime] = useState("00:00");
  const [selectedDevice, setSelectedDevice] = useState(allDevices[0].name);

  const handleOpenDetails = async () => {
    setLoading(true);

    const appointmentDetailsRequest = await getAppointmentApi(
      event.appointment_id
    );

    if (appointmentDetailsRequest.status === 200) {
      console.log(appointmentDetailsRequest.data);
      setClientName(
        appointmentDetailsRequest.data.demand.patient.first_name +
          " " +
          appointmentDetailsRequest.data.demand.patient.last_name
      );
      setClientEmail(appointmentDetailsRequest.data.demand.patient.email);
      setCancerType(appointmentDetailsRequest.data.demand.cancer_type.region);
      setAverageTreatmentDuration(
        appointmentDetailsRequest.demand.cancer_type.avg_duration
      );
      setNumberOfFractions(appointmentDetailsRequest.demand.fractions);
      setIsInPatient(appointmentDetailsRequest.demand.is_inpatient);
    }

    setLoading(false);
    setOpenCalendarEventModal(true);
  };

  const handleSave = async () => {};

  return (
    <>
      {loading && <Loading />}
      <Transition appear show={openCalendarEventModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setOpenCalendarEventModal(false);
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full h-[30rem] max-w-2xl transform overflow-hidden rounded-2xl bg-lightBlue p-6 text-left shadow-xl transition-all">
                  <img
                    src={CancelIcon}
                    alt="cancel icon"
                    className="absolute top-2 right-2 cursor-pointer"
                    onClick={() => setOpenCalendarEventModal(false)}
                  />
                  <div className="flex items-center justify-center w-full flex-col">
                    <h2 className="text-center text-3xl text-black font-bold mb-4">
                      Reschedule appointment
                    </h2>
                    <div className="flex items-center justify-around w-full mt-5">
                      <div className="border-2 border-black rounded-lg p-3 pt-1">
                        <h2 className="text-base text-center text-darkerGray mb-3">
                          Current appointment details
                        </h2>
                        <p className="text-black text-lg">
                          <span className="font-bold">Appointment Name:</span>{" "}
                          {event.name}{" "}
                        </p>
                        <p className="text-black text-lg">
                          <span className="font-bold">
                            Current starting time:
                          </span>{" "}
                          {event.start_hour}:{event.startingMinute}
                        </p>
                        <p className="text-black text-lg">
                          <span className="font-bold">
                            Current ending time:
                          </span>{" "}
                          {event.start_hour}:{event.endingMinute}
                        </p>
                      </div>
                      <div className="border-2 border-black rounded-lg p-3 pt-1">
                        <h2 className="text-base text-center text-darkerGray mb-3">
                          Client information
                        </h2>
                        <p className="text-black text-lg">
                          <span className="font-bold">Full Name:</span>{" "}
                          {clientName}
                        </p>
                        <p className="text-black text-lg">
                          <span className="font-bold">Email:</span>{" "}
                          {clientEmail}
                        </p>
                        <p className="text-black text-lg">
                          <span className="font-bold">Cancer Type:</span>{" "}
                          {cancerType}
                        </p>
                        <p className="text-black text-lg">
                          <span className="font-bold">
                            Average Treatment Duration:
                          </span>{" "}
                          {averageTreatmentDuration}
                        </p>
                        <p className="text-black text-lg">
                          <span className="font-bold">Number of fractions</span>{" "}
                          {numberOfFractions}
                        </p>
                        <p className="text-black text-lg">
                          <span className="font-bold">Is inpatient</span>{" "}
                          {isInPatient}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-around w-full mt-5">
                      <div className="flex items-center gap-2">
                        <p className="text-black text-lg">
                          <span className="font-bold">New date:</span>
                        </p>
                        <input
                          type="time"
                          className="border-2 border-black rounded-lg p-1"
                          value={newDate}
                          onChange={(e) => setNewDate(e.target.value)}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-black text-lg">
                          <span className="font-bold">New starting time:</span>
                        </p>
                        <input
                          type="time"
                          className="border-2 border-black rounded-lg p-1"
                          value={newStartingTime}
                          onChange={(e) => setNewStartingTime(e.target.value)}
                        />
                      </div>

                      <div className="relative">
                        <select
                          className="appearance-none py-1 bg-lighterGray shadow-[1px_1px_3px_3px_rgba(103,116,152,0.3)] rounded-full px-8 text-light-gray focus:outline-none cursor-pointer"
                          value={selectedDevice}
                          onChange={(e) => {
                            setSelectedDevice(e.target.value);
                          }}
                        >
                          {allDevices.map((item, index) => (
                            <option value={item.name} key={index}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-1 pointer-events-none">
                          <svg
                            className="w-6 h-6 fill-current text-black"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center items-center mt-5">
                      <button
                        className="w-1/2 h-10 mt-6 p-2 rounded-md bg-primary font-bold text-white focus:outline-none placeholder-white hover:text-primary hover:bg-white"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <div
        className="absolute h-full border-x-[1px] border-black flex justify-center items-center hover:transform hover:scale-110 transition-all cursor-pointer"
        style={{
          width: `${((event.endingMinute - event.startingMinute) / 60) * 100}%`,
          left: `${(event.startingMinute / 60) * 100}%`,
          backgroundColor: event.fillOutColor ?? "#028090",
        }}
        onClick={handleOpenDetails}
      >
        <p className="text-white text-[6px] text-center">{event.name}</p>
      </div>
    </>
  );
}
