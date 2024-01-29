"use client";

import { stages } from "../constants";
import { usePathname } from "next/navigation";

export const NavBar = () => {
  const pathname = usePathname();
  return (
    <div
      className=" bg-no-repeat bg-center justify-center  flex lg:flex-col gap-5 lg:w-[275px] w-full lg:justify-start h-[20rem]  lg:h-[570px] lg:pl-[30px] lg:pt-[40px] pt-5"
      style={{
        backgroundImage: "url(/bg-sidebar-desktop.svg)",
        backgroundPosition: "bottom",
        backgroundSize: "100% auto",
      }}
    >
      {stages.map((stage, index) => (
        <div key={index} className=" z-10 flex gap-3 w-auto">
          <div
            className={` text-center font-bold duration-200 h-max border-[1px] rounded-full px-[20px] py-[12px] ${
              pathname === stage.path
                ? " bg-Lightblue border-Lightblue text-Marineblue"
                : "text-White"
            }`}
          >
            {index + 1}
          </div>
          <div className=" lg:flex hidden text-White flex-col text-[16px]">
            <p className=" text-Coolgray">STEP {index + 1}</p>
            <p className=" font-medium">{stage.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
