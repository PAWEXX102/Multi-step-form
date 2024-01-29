"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useNextRequest, useUserSettings } from "../context";
import { FadeIn } from "../animation";


export const ActionButton = () => {
  const { nextRequest, setNextRequest } = useNextRequest();
  const { userSettings, setUserSettings } = useUserSettings();
  const pathname = usePathname();
  const router = useRouter();

  const handleGoBack = () => {
    if (nextRequest == true) {
      router.back();
      setNextRequest(false);
    } else router.back();
  };

  const handleNextStep = () => {
    if (pathname == "/summary") {
      setUserSettings({
        ...userSettings,
        finished: true,
      });
    } else {
      setNextRequest(true);
    }
  };

  return (
    <FadeIn userSettings={userSettings}>
      <div
        className={` absolute bottom-0 lg:flex hidden bg-White p-4 lg:p-0 lg:bg-opacity-0 w-full duration-200 justify-between ${
          pathname === "/" ? "flex-row-reverse" : ""
        }`}
      >
        <button
          className={` text-Coolgray hover:text-Marineblue duration-200 font-medium  px-7 py-[11px] text-[15px] rounded-md w-max ${
            pathname == "/" ? "hidden" : ""
          }`}
          onClick={handleGoBack}
        >
          Go Back
        </button>
        <button
          className={` bg-Marineblue hover:bg-Purplishblue duration-200 text-White px-7 py-[11px] text-[15px] rounded-md w-max ${
            pathname == "/summary" ? " bg-Purplishblue hover:bg-Pastelblue" : ""
          }`}
          onClick={() => handleNextStep()}
        >
          {pathname == "/summary" ? "Confirm" : "Next Step"}
        </button>
      </div>
    </FadeIn>
  );
};
