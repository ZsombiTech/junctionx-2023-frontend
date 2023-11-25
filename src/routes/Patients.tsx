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

  console.log(allPatients);

  return (
    <>
      {loading && <Loading />}
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-[78%] m-3">
        {allPatients.map((patient: any, index: number) => (
          <PatientComponent
            firstName={patient.first_name}
            lastName={patient.last_name}
            age={Math.floor(Math.random() * 60) + 20}
            type="Cancer"
            weight={Math.floor(Math.random() * 70) + 50}
            disabilities="None"
            key={index}
          />
        ))}
      </div>
      <SideBar />
    </>
  );
}
