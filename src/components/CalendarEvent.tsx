import React, { Fragment, useState } from "react";
import CancelIcon from "../assets/cancelIcon.svg";
import { Dialog, Transition } from "@headlessui/react";
import {
  deleteAppointmentApi,
  getAppointmentApi,
  patchAppointmentApi,
} from "../api";
import { allDevices } from "../config/calendarDataConverter";
import { useAppSelector } from "../redux/hooks";
import { toast } from "react-toastify";

interface Props {
  event: {
    name: string;
    startingMinute: number;
    endingMinute: number;
    color: string;
    start_hour: number;
    appointment_id: number;
  };
  selectedDeviceParent: string;
}

export default function CalendarEvent({ event, selectedDeviceParent }: Props) {
  const selectedEventIdRedux = useAppSelector(
    (state) => state.app.selectedEventId
  );
  const [openCalendarEventModal, setOpenCalendarEventModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [cancerType, setCancerType] = useState("");
  const [averageTreatmentDuration, setAverageTreatmentDuration] = useState(0);
  const [numberOfFractions, setNumberOfFractions] = useState(0);
  const [isInPatient, setIsInPatient] = useState(false);
  const [demandId, setDemandId] = useState(0);
  const [roomId, setRoomId] = useState(0);

  const [newDate, setNewDate] = useState("2023-11-26");
  const [newStartingTime, setNewStartingTime] = useState("00:00");
  const [newEndDate, setEndNewDate] = useState("2023-11-26");
  const [newEndTime, setNewEndTime] = useState("00:00");
  const [selectedDevice, setSelectedDevice] = useState(1);

  const handleOpenDetails = async () => {
    if (!event.appointment_id) {
      toast.error("You cannot open a machine", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      return;
    }

    setOpenCalendarEventModal(true);
    setLoading(true);

    const appointmentDetailsRequest = await getAppointmentApi(
      event.appointment_id
    );

    if (appointmentDetailsRequest.status === 200) {
      setClientName(
        appointmentDetailsRequest.data.demand.patient.first_name +
          " " +
          appointmentDetailsRequest.data.demand.patient.last_name
      );
      setClientEmail(appointmentDetailsRequest.data.demand.patient.email);
      setCancerType(appointmentDetailsRequest.data.demand.cancer_type.region);
      setAverageTreatmentDuration(
        appointmentDetailsRequest.data.demand.cancer_type.avg_duration
      );
      setNumberOfFractions(appointmentDetailsRequest.data.demand.fractions);
      setIsInPatient(appointmentDetailsRequest.data.demand.is_inpatient);
      setDemandId(appointmentDetailsRequest.data.demand.id);
      setRoomId(
        appointmentDetailsRequest.data.room
          ? appointmentDetailsRequest.data.room.id
          : null
      );
    }

    setLoading(false);
  };

  const handleSave = async () => {
    if (
      newStartingTime === "00:00" ||
      newDate === "2023-11-25" ||
      newEndDate === "2023-11-25" ||
      newEndTime === "00:00"
    ) {
      toast.error("Please select a valid date and time!", {
        position: toast.POSITION.BOTTOM_LEFT,
      });

      return;
    }

    setLoading(true);

    const rescheduleAppointmentRequest = await patchAppointmentApi(
      event.appointment_id,
      {
        start: `${newDate}T${newStartingTime}:20.895Z`,
        end: `${newEndDate}T${newEndTime}:20.895Z`,
        resource_id: selectedDevice,
        demand_id: demandId,
        room_id: roomId,
      }
    );

    if (rescheduleAppointmentRequest.status === 200) {
      toast.success("Appointment rescheduled successfully!", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } else {
      toast.error("Error rescheduling appointment!", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }

    setLoading(false);
    setOpenCalendarEventModal(false);
  };

  const handleDelete = async () => {
    setLoading(true);

    const rescheduleAppointmentRequest = await deleteAppointmentApi(
      event.appointment_id
    );

    if (rescheduleAppointmentRequest.status === 200) {
      toast.success("Appointment successfully deleted!", {
        position: toast.POSITION.BOTTOM_LEFT,
      });

      setLoading(false);
      setOpenCalendarEventModal(false);

      window.location.reload();
    } else {
      toast.error("Error deleting appointment!", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }

    setLoading(false);
    setOpenCalendarEventModal(false);
  };

  return (
    <>
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
                <Dialog.Panel className="w-full h-[35rem] max-w-2xl transform overflow-hidden rounded-2xl bg-lightBlue p-6 text-left shadow-xl transition-all">
                  <img
                    src={CancelIcon}
                    alt="cancel icon"
                    className="absolute top-2 right-2 cursor-pointer"
                    onClick={() => setOpenCalendarEventModal(false)}
                  />
                  <div className="flex items-center justify-center w-full flex-col">
                    <h2 className="text-center text-3xl text-black font-bold mb-4">
                      Edit appointment
                    </h2>
                    <div className="flex items-start justify-around w-full mt-5 gap-3">
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
                        {loading ? (
                          <p>Loading...</p>
                        ) : (
                          <>
                            <p className="text-black text-lg">
                              <span className="font-bold">Full Name:</span>{" "}
                              {clientName ? clientName : "N/A"}
                            </p>
                            <p className="text-black text-lg">
                              <span className="font-bold">Email:</span>{" "}
                              {clientEmail ? clientEmail : "N/A"}
                            </p>
                            <p className="text-black text-lg">
                              <span className="font-bold">Cancer Type:</span>{" "}
                              {cancerType ? cancerType : "N/A"}
                            </p>
                            <p className="text-black text-lg">
                              <span className="font-bold">
                                Average Treatment Duration:
                              </span>{" "}
                              {averageTreatmentDuration
                                ? averageTreatmentDuration
                                : "N/A"}
                            </p>
                            <p className="text-black text-lg">
                              <span className="font-bold">
                                Number of fractions:
                              </span>{" "}
                              {numberOfFractions ? numberOfFractions : "N/A"}
                            </p>
                            <p className="text-black text-lg">
                              <span className="font-bold">Is inpatient:</span>{" "}
                              {isInPatient ? "true" : "false"}
                            </p>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-around w-full mt-5">
                      <div className="flex items-center gap-1">
                        <p className="text-black text-sm">
                          <span className="font-bold">New start date:</span>
                        </p>
                        <input
                          type="date"
                          className="border-2 border-black rounded-lg p-1"
                          value={newDate}
                          onChange={(e) => setNewDate(e.target.value)}
                        />
                      </div>
                      <div className="flex items-center gap-1">
                        <p className="text-black text-sm">
                          <span className="font-bold">New start time:</span>
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
                            setSelectedDevice(parseInt(e.target.value));
                          }}
                        >
                          {allDevices.map((item, index) => (
                            <option value={index + 1} key={index}>
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
                    <div className="flex items-center justify-start w-full mt-5 ml-3 gap-3">
                      <div className="flex items-center gap-1">
                        <p className="text-black text-sm">
                          <span className="font-bold">New end date:</span>
                        </p>
                        <input
                          type="date"
                          className="border-2 border-black rounded-lg p-1"
                          value={newEndDate}
                          onChange={(e) => setEndNewDate(e.target.value)}
                        />
                      </div>
                      <div className="flex items-center gap-1">
                        <p className="text-black text-sm">
                          <span className="font-bold">New end time:</span>
                        </p>
                        <input
                          type="time"
                          className="border-2 border-black rounded-lg p-1"
                          value={newEndTime}
                          onChange={(e) => setNewEndTime(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="flex justify-center items-center gap-4 mt-5 w-full">
                      <button
                        className="w-1/2 h-10 mt-6 p-2 rounded-md bg-statusUrgent font-bold text-white focus:outline-none placeholder-white hover:text-statusUrgent hover:bg-white hover:border-2 border-statusUrgent"
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                      <button
                        className="w-1/2 h-10 mt-6 p-2 rounded-md bg-primary font-bold text-white focus:outline-none placeholder-white hover:text-primary hover:bg-white hover:border-2 border-primary"
                        onClick={handleSave}
                      >
                        Edit
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
          backgroundColor: event.color ?? "#028090",
          opacity:
            parseInt(selectedEventIdRedux.split("-")[0]) ===
              event.appointment_id ||
            selectedEventIdRedux === "" ||
            selectedEventIdRedux.split("-")[1] !== selectedDeviceParent
              ? 1
              : 0.3,
        }}
        onClick={handleOpenDetails}
      >
        <p className="text-white text-[6px] text-center">{event.name}</p>
      </div>
    </>
  );
}
