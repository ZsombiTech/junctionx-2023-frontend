import React, { useEffect, useState } from "react";
import PatientComponent from "../components/PatientComponent";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import Loading from "../components/Loading";
import { getAllAccountsApi, getDemandForUserApi } from "../api";
import { StatusCodes } from "http-status-codes";

export default function Patients() {
  const [loading, setLoading] = useState(true);
  const [allPatients, setAllPatients] = useState([]);

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
          };
        });

        setAllPatients(allPatients);
      }

      setLoading(false);
    };

    asyncFunc();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-11/12 lg:w-[78%] m-3">
        {allPatients.map((patient: any, index: number) => (
          <PatientComponent
            firstName={patient.first_name}
            lastName={patient.last_name}
            age={Math.floor(Math.random() * 60) + 20}
            type={
              patient && patient.demand && patient.demand.cancer_type
                ? patient.demand.cancer_type.region
                : "None"
            }
            weight={Math.floor(Math.random() * 70) + 50}
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
