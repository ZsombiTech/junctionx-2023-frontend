import React, { Fragment, useEffect, useState } from "react";
import PatientComponent from "../components/PatientComponent";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import Loading from "../components/Loading";
import {
  createNewDemandApi,
  getAllAccountsApi,
  getDemandForUserApi,
  registerApi,
} from "../api";
import { StatusCodes } from "http-status-codes";
import { Dialog, Transition } from "@headlessui/react";
import CancelIcon from "../assets/cancelIcon.svg";
import { toast } from "react-toastify";

export default function Patients() {
  const [loading, setLoading] = useState(true);
  const [addNewPatientModal, setAddNewPatientModal] = useState(false);
  const [allPatients, setAllPatients] = useState([]);
  const [newPatientFirstName, setNewPatientFirstName] = useState("");
  const [newPatientLastName, setNewPatientLastName] = useState("");
  const [newPatientAge, setNewPatientAge] = useState("");
  const [newPatientGender, setNewPatientGender] = useState("male");
  const [newPatientCancerType, setNewPatientCancerType] = useState("breast");
  const [newPatientDisabilities, setNewPatientDisabilities] = useState("");

  useEffect(() => {
    const asyncFunc = async () => {
      const patientsRequest = await getAllAccountsApi();
      const allDemandsRequest = await getDemandForUserApi();

      if (
        patientsRequest.status === StatusCodes.OK &&
        allDemandsRequest.status === StatusCodes.OK
      ) {
        const allPatients = patientsRequest.data.map((patient: any) => {
          const demand = allDemandsRequest.data.find(
            (demand: any) => demand.patient.id === patient.id
          );
          return {
            ...patient,
            demand: demand,
            weight: Math.floor(Math.random() * 70) + 50,
            age: Math.floor(Math.random() * 60) + 20,
          };
        });

        setAllPatients(allPatients);
      }

      setLoading(false);
    };

    asyncFunc();
  }, []);

  const handleAddNew = async () => {
    setLoading(true);

    const registerPatientRequest = await registerApi({
      email: newPatientFirstName + newPatientLastName + "@gmail.com",
      password: "",
      first_name: newPatientFirstName,
      last_name: newPatientLastName,
      gender: newPatientGender,
    });

    if (registerPatientRequest.status !== StatusCodes.OK) {
      toast.error("Error creating new account", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      setLoading(false);
      return;
    }

    const newDemandRequest = await createNewDemandApi({
      cancer_type: newPatientCancerType,
      patient_id: registerPatientRequest.data.account_id,
      fractions: 0,
      is_inpatient: true,
      weight: 0,
    });

    if (newDemandRequest.status !== StatusCodes.OK) {
      toast.error("Error creating new demand", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      setLoading(false);
      return;
    }

    const patientsRequest = await getAllAccountsApi();
    const allDemandsRequest = await getDemandForUserApi();

    if (
      patientsRequest.status === StatusCodes.OK &&
      allDemandsRequest.status === StatusCodes.OK
    ) {
      const allPatients = patientsRequest.data.map((patient: any) => {
        const demand = allDemandsRequest.data.find(
          (demand: any) => demand.patient.id === patient.id
        );
        return {
          ...patient,
          demand: demand,
          weight: Math.floor(Math.random() * 70) + 50,
          age: Math.floor(Math.random() * 60) + 20,
        };
      });

      setAllPatients(allPatients);
    }

    toast.success("Successfully added new patient", {
      position: toast.POSITION.BOTTOM_LEFT,
    });
    setLoading(false);
    setAddNewPatientModal(false);
  };

  return (
    <>
      {loading && <Loading />}
      <Transition appear show={addNewPatientModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setAddNewPatientModal(false);
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
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-lightBlue py-10 text-left align-middle shadow-xl transition-all flex flex-col lg:flex-row items-center gap-5">
                  <img
                    src={CancelIcon}
                    alt="cancel icon"
                    className="absolute top-2 right-2 cursor-pointer"
                    onClick={() => setAddNewPatientModal(false)}
                  />
                  <div className="flex items-center justify-center w-full flex-col">
                    <h2 className="text-center text-3xl text-black font-bold mb-4">
                      Add a new patient
                    </h2>
                    <input
                      type="text"
                      placeholder="First Name"
                      className="w-72 h-10 mt-5 p-2 rounded-md bg-lighterGray text-white focus:outline-none placeholder-white placeholder:text-sm shadow-[1px_1px_4px_4px_rgba(236,246,255,0.5)]"
                      value={newPatientFirstName}
                      onChange={(e) => setNewPatientFirstName(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="w-72 h-10 mt-3 p-2 rounded-md bg-lighterGray text-white focus:outline-none placeholder-white placeholder:text-sm shadow-[1px_1px_4px_4px_rgba(236,246,255,0.5)]"
                      value={newPatientLastName}
                      onChange={(e) => setNewPatientLastName(e.target.value)}
                    />
                    <div className="flex items-center justify-between w-72 gap-3">
                      <input
                        type="number"
                        placeholder="Age"
                        className="w-1/2 h-10 mt-3 p-2 rounded-md bg-lighterGray text-white focus:outline-none placeholder-white placeholder:text-sm shadow-[1px_1px_4px_4px_rgba(236,246,255,0.5)]"
                        value={newPatientAge}
                        onChange={(e) => setNewPatientAge(e.target.value)}
                      />
                      <div className="relative h-10 mt-3 w-1/2">
                        <select
                          className="w-full h-10 appearance-none py-1 bg-lighterGray px-2 text-white focus:outline-none cursor-pointer rounded-md"
                          value={newPatientGender}
                          onChange={(e) => {
                            setNewPatientGender(e.target.value);
                          }}
                        >
                          <option value={"male"}>Male</option>
                          <option value={"female"}>Female</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-1 pointer-events-none">
                          <svg
                            className="w-6 h-6 fill-current text-white"
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
                    <div className="flex items-center justify-between w-72 gap-3">
                      <div className="relative h-10 mt-3 w-1/2">
                        <select
                          className="w-full h-10 appearance-none py-1 bg-lighterGray px-2 text-white focus:outline-none cursor-pointer rounded-md"
                          value={newPatientCancerType}
                          onChange={(e) => {
                            setNewPatientCancerType(e.target.value);
                          }}
                        >
                          <option value={"craniospinal"}>Craniospinal</option>
                          <option value={"breast"}>Breast</option>
                          <option value={"breast special"}>
                            Breast special
                          </option>
                          <option value={"head & neck"}>Head & neck</option>
                          <option value={"abdomen"}>Abdomen</option>
                          <option value={"elvis"}>Pelvis</option>
                          <option value={"crane"}>Crane</option>
                          <option value={"lung"}>Lung</option>
                          <option value={"lung special"}>Lung special</option>
                          <option value={"whole Brain"}>Whole Brain</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-1 pointer-events-none">
                          <svg
                            className="w-6 h-6 fill-current text-white"
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
                      <div className="relative h-10 mt-3 w-1/2">
                        <select
                          className="w-full h-10 appearance-none py-1 bg-lighterGray px-2 text-white focus:outline-none cursor-pointer rounded-md"
                          value={newPatientDisabilities}
                          onChange={(e) => {
                            setNewPatientDisabilities(e.target.value);
                          }}
                        >
                          <option value={"wheelchair"}>Wheelchair</option>
                          <option value={"low breath capacity"}>
                            Low breath capacity
                          </option>
                          <option value={"mental disability"}>
                            Mental disability
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-72 mt-5">
                      <button
                        className="w-full h-10 mt-6 p-2 rounded-md bg-primary font-bold text-white focus:outline-none placeholder-white hover:text-primary hover:bg-white border-primary hover:border-2"
                        onClick={handleAddNew}
                      >
                        Save new patient
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Navbar />
      <div className="w-4/5 flex justify-between items-center mt-4 px-3 mb-5">
        <h1 className="text-center text-2xl font-bold text-black">
          Saved patients
        </h1>
        <button
          className="h-10 py-1 px-8 rounded-md bg-primary font-bold text-white focus:outline-none placeholder-white hover:text-primary hover:bg-white border-primary hover:border-2"
          onClick={() => setAddNewPatientModal(true)}
        >
          Add new patient
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-11/12 lg:w-[78%] m-3">
        {allPatients.map((patient: any, index: number) => (
          <PatientComponent
            id={patient.id}
            firstName={patient.first_name}
            lastName={patient.last_name}
            age={patient.age}
            type={
              patient && patient.demand && patient.demand.cancer_type
                ? patient.demand.cancer_type.region
                : "None"
            }
            weight={patient.weight}
            machine_options={
              patient &&
              patient.demand &&
              patient.demand.cancer_type.machine_options
                ? patient.demand.cancer_type.machine_options
                    .map((machine: any) => machine)
                    .join(", ")
                : ""
            }
            key={index}
          />
        ))}
      </div>
      <SideBar />
    </>
  );
}
