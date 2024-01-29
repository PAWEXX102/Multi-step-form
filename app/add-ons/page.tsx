"use client";

import { Title } from "../components/Title";
import { addOns } from "../constants";
import RedirectComponent from "../components/Navigation";

import { useNextRequest, useUserSettings } from "../context";

interface UserSettings {
  dataType: string;
  plan: string;
  addOns: number[];
}

export default function AddOne() {
  const { userSettings, setUserSettings } = useUserSettings();
  const { nextRequest, setNextRequest } = useNextRequest();

  const handleOns = (index: number) => {
    if (userSettings?.addOns?.includes(index)) {
      setUserSettings((prevSettings: UserSettings) => ({
        ...prevSettings,
        addOns: prevSettings.addOns.filter((item) => item !== index),
      }));
    } else {
      setUserSettings((prevSettings: UserSettings) => ({
        ...prevSettings,
        addOns: [...prevSettings.addOns, index],
      }));
    }
  };

  return (
    <main>
      <Title
        title={"Pick add-ons"}
        desc={"Add-ons help enhance your gaming experience."}
      />
      <RedirectComponent
        nextRequest={nextRequest}
        setNextRequest={setNextRequest}
        href={"/summary"}
      />
      <div className=" flex flex-col gap-5 mt-12">
        {addOns.map((addOn, index) => (
          <button
            key={index}
            className={`border-[1px] flex relative items-center text-start w-full rounded-lg hover:border-Purplishblue border-Lightgray duration-200 py-4 pl-4 gap-4 ${
              userSettings?.addOns?.includes(index) &&
              "border-Purplishblue bg-Magnolia"
            }`}
            onClick={() => {
              handleOns(index);
            }}
          >
            <div
              className={` w-5 h-5 border-[1px] border-Lightgray duration-200 justify-center flex items-center rounded-md ${
                userSettings?.addOns?.includes(index)
                  ? " bg-Purplishblue border-Purplishblue"
                  : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={` w-3 h-3 ${
                  userSettings?.addOns?.includes(index) ? "block" : "hidden"
                }`}
                viewBox="0 0 448 512"
              >
                <path
                  fill="#ffffff"
                  d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                />
              </svg>
            </div>
            <div className=" flex flex-col">
              <h1 className=" text-Marineblue font-bold lg:text-lg">
                {addOn.name}
              </h1>
              <p className=" lg:text-base md:text-sm text-xs text-Coolgray">{addOn.describtion}</p>
            </div>
            <p className=" absolute lg:right-5 lg:bottom-8 bottom-7 right-4 lg:text-base text-sm text-Purplishblue">
              +$
              {userSettings?.dataType === "Monthly"
                ? `${addOn.priceMonthly}/mo`
                : `${addOn.priceYearly}/yr`}
            </p>
          </button>
        ))}
      </div>
    </main>
  );
}
