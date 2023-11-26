import React, { Fragment, useState } from "react";
import ArrowRightGreen from "../assets/arrowRightGreen.svg";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import AddIconGreen from "../assets/addIconGreen.svg";
import ArrowRight from "../assets/arrowRight.svg";
import BedroomComponent from "../components/BedroomComponent";
import { Dialog, Transition } from "@headlessui/react";

export default function Settings() {
  const [openAddFloorModal, setOpenAddFloorModal] = useState(false);
  const [newFloorName, setNewFloorName] = useState("");
  const [selectedFloor, setSelectedFloor] = useState(0);
  const [clickedContextMenu, setClickedContextMenu] = useState(false);
  const [e, setE] = useState<React.MouseEvent<HTMLDivElement, MouseEvent>>();
  const [selectedAdd, setSelectedAdd] = useState<number>(0);
  const [bedRoomNumber, setBedRoomNumber] = useState<number>(0);
  const [bedRoomBedNumber, setBedRoomBedNumber] = useState<number>(0);
  const [treatmentRoomNumber, setTreatmentRoomNumber] = useState<number>(0);
  const [treatmentRoomDeviceName, setTreatmentRoomDeviceName] =
    useState<string>("");

  const [floors, setFloors] = useState<any[]>(
    JSON.parse(localStorage.getItem("floors") || "[]")
  );

  const handleDeleteFloor = () => {
    floors.splice(selectedFloor, 1);
    setClickedContextMenu(false);
    setE(undefined);
  };

  return (
    <>
      <Transition appear show={openAddFloorModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setOpenAddFloorModal(false);
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg text-center font-medium"
                  >
                    {selectedAdd === 0
                      ? "Add new floor"
                      : selectedAdd === 1
                      ? "Add new bedroom"
                      : "Add new treatment room"}
                  </Dialog.Title>
                  <div className="mt-2 flex flex-col items-center">
                    {selectedAdd === 0 ? (
                      <input
                        type="text"
                        placeholder="Floor Name"
                        className="w-72 h-10 mt-6 p-2 rounded-md bg-white text-primary focus:outline-none placeholder-white placeholder:text-sm border-2 border-primary placeholder-primary"
                        value={newFloorName}
                        onChange={(e) => setNewFloorName(e.target.value)}
                      />
                    ) : selectedAdd === 1 ? (
                      <>
                        <span className="mt-6">Bedroom number:</span>
                        <input
                          type="number"
                          placeholder="Bedroom number"
                          className="w-72 h-10 p-2 rounded-md bg-white text-primary focus:outline-none placeholder-white placeholder:text-sm border-2 border-primary placeholder-primary"
                          value={bedRoomNumber}
                          onChange={(e) =>
                            setBedRoomNumber(parseInt(e.target.value))
                          }
                        />
                        <span className="mt-6">Bed number:</span>
                        <input
                          type="number"
                          placeholder="Bed number"
                          className="w-72 h-10 p-2 rounded-md bg-white text-primary focus:outline-none placeholder-white placeholder:text-sm border-2 border-primary placeholder-primary"
                          value={bedRoomBedNumber}
                          onChange={(e) =>
                            setBedRoomBedNumber(parseInt(e.target.value))
                          }
                        />
                      </>
                    ) : (
                      <>
                        <span className="mt-6">Treatment room number:</span>
                        <input
                          type="number"
                          placeholder="Treatment room number"
                          className="w-72 h-10 p-2 rounded-md bg-white text-primary focus:outline-none placeholder-white placeholder:text-sm border-2 border-primary placeholder-primary"
                          value={treatmentRoomNumber}
                          onChange={(e) =>
                            setTreatmentRoomNumber(parseInt(e.target.value))
                          }
                        />
                        <span className="mt-6">Device name:</span>
                        <input
                          type="text"
                          placeholder="Device name"
                          className="w-72 h-10 p-2 rounded-md bg-white text-primary focus:outline-none placeholder-white placeholder:text-sm border-2 border-primary placeholder-primary"
                          value={treatmentRoomDeviceName}
                          onChange={(e) =>
                            setTreatmentRoomDeviceName(e.target.value)
                          }
                        />
                      </>
                    )}
                  </div>

                  <div className="mt-4 flex justify-center items-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-white hover:text-primary hover:border-2 hover:border-primary focus:outline-none"
                      onClick={() => {
                        if (selectedAdd === 0) {
                          setFloors([
                            ...floors,
                            {
                              name: newFloorName,
                              bedrooms: [],
                              treatmentRooms: [],
                            },
                          ]);
                        } else if (selectedAdd === 1) {
                          floors[selectedFloor].bedrooms.push({
                            number: bedRoomNumber,
                            bedNumber: bedRoomBedNumber,
                          });
                          setFloors([...floors]);
                        } else {
                          floors[selectedFloor].treatmentRooms.push({
                            number: treatmentRoomNumber,
                            deviceName: treatmentRoomDeviceName,
                          });
                          setFloors([...floors]);
                        }

                        localStorage.setItem("floors", JSON.stringify(floors));
                        setOpenAddFloorModal(false);
                      }}
                    >
                      Add floor
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Navbar />
      <div className="flex items-center w-4/5">
        <div className="w-1/4 h-[5rem] flex items-end justify-between bg-lightBlue p-2 border-r-[1px] border-b-[1px] border-darkerGray">
          <p></p>
          <h2 className="text-2xl text-darkerGray font-medium">Floors</h2>
          <img
            src={AddIconGreen}
            alt="Add Icon"
            className="w-5 ml-2 cursor-pointer"
            onClick={() => {
              setSelectedAdd(0);
              setOpenAddFloorModal(true);
            }}
          />
        </div>
        <div className="w-1/4 h-[5rem] flex items-end justify-between p-2 border-r-[1px] border-b-[1px] border-darkerGray">
          <p></p>
          <h2 className="text-2xl text-black font-medium">Bedrooms</h2>
          <img
            src={AddIconGreen}
            alt="Add Icon"
            className="w-5 ml-2 cursor-pointer"
            onClick={() => {
              setSelectedAdd(1);
              setOpenAddFloorModal(true);
            }}
          />
        </div>
        <div className="w-1/4 h-[5rem] flex items-end justify-between p-2 border-r-[1px] border-b-[1px] border-darkerGray">
          <p></p>
          <h2 className="text-2xl text-black font-medium">Treatment rooms</h2>
          <img
            src={AddIconGreen}
            alt="Add Icon"
            className="w-5 ml-2 cursor-pointer"
            onClick={() => {
              setSelectedAdd(2);
              setOpenAddFloorModal(true);
            }}
          />
        </div>
        <div className="w-1/4 h-[5rem] flex items-end justify-between p-2 border-r-[1px] border-b-[1px] border-darkerGray"></div>
      </div>
      <div className="flex items-center w-4/5">
        <div className="w-1/4 h-[88vh] flex flex-col gap-5 items-center justify-start bg-lightBlue p-2 border-r-[1px] border-b-[1px] border-darkerGray pt-5">
          {floors.map((floor, index) => (
            <div
              className="flex items-center w-full justify-between cursor-pointer"
              onClick={() => setSelectedFloor(index)}
              onContextMenu={(e) => {
                e.preventDefault();
                if (clickedContextMenu) {
                  setE(undefined);
                  setClickedContextMenu(false);
                  return;
                }
                setE(e);
                setClickedContextMenu(true);
              }}
              key={index}
            >
              <h2
                className={`text-3xl ${
                  selectedFloor === index ? "text-primary" : "text-black"
                } font-medium`}
              >
                {floor.name}
              </h2>
              <img
                src={selectedFloor === index ? ArrowRightGreen : ArrowRight}
                alt="Arrow Right"
                className="w-5"
              />

              {clickedContextMenu ? (
                <button
                  className="fixed px-3 py-1 border-[1px] border-primary rounded-lg bg-white"
                  style={{
                    top: e!.clientY,
                    left: e!.clientX,
                  }}
                  onClick={handleDeleteFloor}
                >
                  Remove room
                </button>
              ) : (
                <></>
              )}
            </div>
          ))}

          {floors.length === 0 ? (
            <h1 className="text-2xl text-black font-medium mt-5">
              No floors available
            </h1>
          ) : (
            <></>
          )}
        </div>
        <div className="w-1/4 h-[88vh] flex flex-col items-center justify-start p-2 border-r-[1px] border-b-[1px] border-darkerGray overflow-y-auto noscroll pt-5">
          {floors &&
            floors[selectedFloor] &&
            floors[selectedFloor].bedrooms.map(
              (bedroom: any, index: number) => (
                <BedroomComponent
                  number={bedroom.number}
                  bedNumber={bedroom.bedNumber}
                  isDevice={false}
                  key={index}
                />
              )
            )}

          {floors &&
          floors[selectedFloor] &&
          floors[selectedFloor].bedrooms.length === 0 ? (
            <h1 className="text-2xl text-black font-medium mt-5">
              No rooms available
            </h1>
          ) : (
            <></>
          )}
        </div>
        <div className="w-1/4 h-[88vh] flex flex-col items-center justify-start p-2 border-r-[1px] border-b-[1px] border-darkerGray pt-5">
          {floors &&
            floors[selectedFloor] &&
            floors[selectedFloor].treatmentRooms.map(
              (treatmentRoom: any, index: number) => (
                <BedroomComponent
                  number={treatmentRoom.number}
                  deviceName={treatmentRoom.deviceName}
                  isDevice={true}
                  key={index}
                />
              )
            )}

          {floors &&
          floors[selectedFloor] &&
          floors[selectedFloor].treatmentRooms.length === 0 ? (
            <h1 className="text-2xl text-black font-medium mt-5">
              No rooms available
            </h1>
          ) : (
            <></>
          )}
        </div>
        <div className="w-1/4 h-[88vh] flex items-end justify-between p-2 border-r-[1px] border-b-[1px] border-darkerGray"></div>
      </div>
      <SideBar />
    </>
  );
}
