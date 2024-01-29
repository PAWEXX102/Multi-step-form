"use client";

import Image from "next/image";
import { plans } from "../constants";
import { Title } from "../components/Title";
import RedirectComponent from "../components/Navigation";

import { useNextRequest, useUserSettings } from "../context";

export default function SelectPlan() {
  const { userSettings, setUserSettings } = useUserSettings();
  const { nextRequest, setNextRequest } = useNextRequest();

  const handleDataType = () => {
    setUserSettings((prevSettings: typeof userSettings) => ({
      ...prevSettings,
      dataType: prevSettings.dataType === "Monthly" ? "Yearly" : "Monthly",
    }));
  };

  return (
    <main>
      <Title
        title={"Select your plan"}
        desc={"You have the option of monthly or yearly billing."}
      />
      <RedirectComponent
        nextRequest={nextRequest}
        setNextRequest={setNextRequest}
        href={"/add-ons"}
      />
      <div className=" flex lg:flex-row flex-col gap-5 mt-12">
        {plans.map((plan, index) => (
          <button
            key={index}
            className={`border-[1px] rounded-md hover:border-Purplishblue w-full border-Lightgray duration-200 lg:items-start flex text-left lg:flex-col py-4 pl-4 lg:w-[9rem] gap-4 lg:gap-12 ${
              userSettings.plan == plan.name
                ? "border-Purplishblue bg-Magnolia"
                : ""
            } ${
              userSettings.dataType === "Monthly"
                ? "items-center"
                : "items-start"
            }`}
            onClick={() =>
              setUserSettings((prevSettings: typeof userSettings) => ({
                ...prevSettings,
                plan: plan.name,
              }))
            }
          >
            <Image src={plan.image} alt="" width={40} height={40} />
            <div className=" flex flex-col">
              <h1 className=" text-Marineblue font-bold text-lg">
                {plan.name}
              </h1>
              <p className=" text-Coolgray">
                $
                {userSettings.dataType == "Monthly"
                  ? plan.priceMonthly
                  : plan.priceYearly}
                /mo
              </p>
              {userSettings.dataType == "Yearly" && (
                <p className=" text-Marineblue font-medium pt-2 text-sm">
                  {plan.monthsFree} months free
                </p>
              )}
            </div>
          </button>
        ))}
      </div>
      <div className="flex items-center mt-6 bg-Alabaster rounded-md py-3 font-medium relative justify-center gap-5">
        <p
          className={
            userSettings.dataType == "Monthly"
              ? "text-Marineblue"
              : "text-Coolgray"
          }
        >
          Monthly
        </p>
        <input
          type="checkbox"
          id="toggle"
          className="absolute toggle"
          onChange={handleDataType}
        />
        <label htmlFor="toggle"></label>
        <p
          className={
            userSettings.dataType == "Yearly"
              ? "text-Marineblue"
              : " text-Coolgray"
          }
        >
          Yearly
        </p>
      </div>
    </main>
  );
}
