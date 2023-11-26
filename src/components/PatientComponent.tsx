import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import AppointmentNotification from "./AppointmentNotification";
import CancelIcon from "../assets/cancelIcon.svg";
import { deleteAccountApi } from "../api";
import { toast } from "react-toastify";

interface Props {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  type: string;
  weight: number;
  machine_options: string;
}

export default function PatientComponent({
  id,
  firstName,
  lastName,
  age,
  type,
  weight,
  machine_options,
}: Props) {
  const [openProfileDetailsModal, setOpenProfileDetailsModal] = useState(false);

  const handleDeleteUser = async () => {
    const deleteRequest = await deleteAccountApi(id);

    if (deleteRequest.status === 200) {
      toast.success("Successfully deleted user", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      window.location.reload();
    } else {
      toast.error("Error deleting user", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }

    setOpenProfileDetailsModal(false);
  };

  return (
    <>
      <Transition appear show={openProfileDetailsModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setOpenProfileDetailsModal(false);
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
                <Dialog.Panel className="w-full h-[50rem] lg:h-[30rem] max-w-2xl transform overflow-hidden rounded-2xl bg-lightBlue p-2 lg:p-6 text-left shadow-xl transition-all">
                  <div className="flex flex-col lg:flex-row items-center gap-5 w-full h-full align-middle">
                    <img
                      src={CancelIcon}
                      alt="cancel icon"
                      className="absolute top-2 right-2 cursor-pointer"
                      onClick={() => setOpenProfileDetailsModal(false)}
                    />
                    <div className="w-full lg:w-1/2 h-full">
                      <h1 className="text-grayOne text-3xl font-bold">
                        {firstName}{" "}
                        <span className="uppercase">{lastName}</span>
                      </h1>
                      <p className="text-lg font-medium text-grayOne">
                        Age: {age}
                      </p>
                      <p className="text-lg font-medium text-grayOne">
                        Type: {type}
                      </p>
                      <p className="text-lg font-medium text-grayOne">
                        Weight: {weight}
                      </p>

                      <p className="text-lg font-medium text-grayOne mt-3">
                        Machines can be used:
                      </p>
                      <ul className="list-disc">
                        {machine_options.split(",").map((item, index) => (
                          <li
                            className="text-lg font-medium text-grayOne ml-12 whitespace-nowrap"
                            key={index}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>

                      <p className="text-lg font-medium text-grayOne mt-3">
                        Demand:
                      </p>
                      <ul className="list-disc">
                        <li className="text-lg font-medium text-grayOne ml-12 whitespace-nowrap">
                          20 mins treatment
                        </li>
                        <li className="text-lg font-medium text-grayOne ml-12 whitespace-nowrap">
                          2/month
                        </li>
                      </ul>
                    </div>
                    <div className="w-full lg:w-1/2 h-full">
                      <h1 className="text-grayOne text-3xl font-bold text-center">
                        Appointments
                      </h1>
                      <div className="flex justify-center items-center w-full pt-5">
                        <div className="h-[40vh] overflow-y-auto noscrollbar pt-3 px-3">
                          <AppointmentNotification
                            isInformation={false}
                            place="St. Janos - room 420"
                            from="Dec. 23, Monday, 10:30AM"
                            to="Dec. 24, Tuesday, 10:30AM"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-center -mt-10">
                    <button
                      className="h-10 py-1 px-16 rounded-md bg-statusUrgent font-bold text-white focus:outline-none placeholder-white hover:text-statusUrgent hover:bg-white border-statusUrgent hover:border-2"
                      onClick={handleDeleteUser}
                    >
                      Delete
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <div
        className="w-full p-2 flex flex-col justify-center items-start bg-lighterGray rounded-lg shadow-[1px_1px_4px_4px_rgba(255,63,63,0.5)] hover:transform hover:scale-105 transition-all cursor-pointer"
        onClick={() => setOpenProfileDetailsModal(true)}
      >
        <h1 className="text-grayOne text-2xl font-medium">
          {firstName} <span className="font-bold uppercase">{lastName}</span>
        </h1>
        <p className="text-xl font-medium text-grayOne">Age: {age}</p>
        <p className="text-xl font-medium text-grayOne">Type: {type}</p>
        <p className="text-xl font-medium text-grayOne">Weight: {weight}</p>
        <p className="text-xl font-medium text-grayOne">
          Machine options: {machine_options}
        </p>
      </div>
    </>
  );
}
