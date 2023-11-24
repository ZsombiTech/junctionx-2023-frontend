import React from "react";

export default function Loading() {
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center absolute bg-lighterGray opacity-75 z-40 fixed top-0 left-0">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
}
