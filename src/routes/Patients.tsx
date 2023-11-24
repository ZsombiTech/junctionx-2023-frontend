import React from "react";
import PatientComponent from "../components/PatientComponent";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";

export default function Patients() {
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-4 gap-8 w-[78%] m-3">
        <PatientComponent
          firstName="John"
          lastName="Doe"
          age={20}
          type="Cancer"
          weight={70}
          disabilities="None"
        />
        <PatientComponent
          firstName="John"
          lastName="Doe"
          age={20}
          type="Cancer"
          weight={70}
          disabilities="None"
        />
        <PatientComponent
          firstName="John"
          lastName="Doe"
          age={20}
          type="Cancer"
          weight={70}
          disabilities="None"
        />
        <PatientComponent
          firstName="John"
          lastName="Doe"
          age={20}
          type="Cancer"
          weight={70}
          disabilities="None"
        />
        <PatientComponent
          firstName="John"
          lastName="Doe"
          age={20}
          type="Cancer"
          weight={70}
          disabilities="None"
        />
        <PatientComponent
          firstName="John"
          lastName="Doe"
          age={20}
          type="Cancer"
          weight={70}
          disabilities="None"
        />
        <PatientComponent
          firstName="John"
          lastName="Doe"
          age={20}
          type="Cancer"
          weight={70}
          disabilities="None"
        />
      </div>
      <SideBar />
    </>
  );
}
