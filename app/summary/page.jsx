"use client";

import { Title } from "../components/Title";
import { useNextRequest, useUserSettings } from "../context";
import { useRouter } from "next/navigation";
import { plans, addOns } from "../constants";
import RedirectComponent from "../components/Navigation";
import { PriceCalculate } from "../components/PriceCalculate";
import { FadeIn, FadeOut } from "../animation";

export default function Summary() {
  const { nextRequest, setNextRequest } = useNextRequest();
  const { userSettings, setUserSettings } = useUserSettings();
  const router = useRouter();

  const handlePlanIndex = (plan) => {
    const index = plans.findIndex((item) => item.name === plan);
    return index;
  };

  return (
    <>
      <FadeIn userSettings={userSettings}>
        <Title
          title="Finishing up"
          desc="Double-check everything looks OK before confirming."
        />
        <RedirectComponent
          nextRequest={nextRequest}
          setNextRequest={setNextRequest}
          href={"/finish"}
        />
        <PriceCalculate
          userSettings={userSettings}
          setUserSettings={setUserSettings}
        />
        <div className=" bg-Alabaster p-5 rounded-lg mt-8">
          <div className=" flex items-center justify-between mb-6">
            <div className=" flex flex-col w-max text-start items-start">
              <p className=" text-lg font-medium text-Marineblue">
                {userSettings.plan} ({userSettings.dataType})
              </p>
              <button
                className=" text-Coolgray underline hover:text-Purplishblue font-medium"
                onClick={() => router.push("/select-plan")}
              >
                Change
              </button>
            </div>
            <p className=" font-bold text-lg text-Marineblue">
              $
              {userSettings.dataType === "Monthly"
                ? `${plans[handlePlanIndex(userSettings.plan)].priceMonthly}/mo`
                : `${plans[handlePlanIndex(userSettings.plan)].priceYearly}/yr`}
            </p>
          </div>
          {userSettings.addOns.length > 0 && (
            <div className=" w-full h-[1px] bg-Lightgray"></div>
          )}
          <div className=" flex flex-col gap-4 pt-4">
            {userSettings.addOns
              .sort((a, b) => {
                const priceA =
                  userSettings.dataType === "Monthly"
                    ? addOns[a].priceMonthly
                    : addOns[a].priceYearly;
                const priceB =
                  userSettings.dataType === "Monthly"
                    ? addOns[b].priceMonthly
                    : addOns[b].priceYearly;
                return priceA - priceB;
              })
              .map((item, index) => (
                <div key={index} className=" flex justify-between">
                  <p className=" text-Coolgray">{addOns[item].name}</p>
                  <p className=" text-Marineblue font-medium">
                    $
                    {userSettings.dataType === "Monthly"
                      ? `${addOns[item].priceMonthly}/mo`
                      : `${addOns[item].priceYearly}/yr`}
                  </p>
                </div>
              ))}
          </div>
        </div>
        <div className=" flex justify-between items-center p-5">
          <p className=" text-Coolgray">
            Total(per {userSettings.dataType === "Monthly" ? "month" : "year"})
          </p>
          <p className=" text-xl font-bold text-Purplishblue">
            {userSettings.dataType === "Monthly"
              ? `+$${userSettings.price}/mo`
              : `+$${userSettings.price}/yr`}
          </p>
        </div>
      </FadeIn>
      <FadeOut userSettings={userSettings}>
        <div
          className={`flex flex-col text-center h-full p-5 lg:p-0 items-center justify-center duration-200 w-full ${
            userSettings.finished ? "" : "hidden"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            viewBox="0 0 80 80"
          >
            <g fill="none">
              <circle cx="40" cy="40" r="40" fill="#F9818E" />
              <path
                fill="#E96170"
                d="M48.464 79.167c.768-.15 1.53-.321 2.288-.515a40.04 40.04 0 0 0 3.794-1.266 40.043 40.043 0 0 0 3.657-1.63 40.046 40.046 0 0 0 12.463-9.898A40.063 40.063 0 0 0 78.3 51.89c.338-1.117.627-2.249.867-3.391L55.374 24.698a21.6 21.6 0 0 0-15.332-6.365 21.629 21.629 0 0 0-15.344 6.365c-8.486 8.489-8.486 22.205 0 30.694l23.766 23.775Z"
              />
              <path
                fill="#FFF"
                d="M40.003 18.333a21.58 21.58 0 0 1 15.31 6.351c8.471 8.471 8.471 22.158 0 30.63-8.47 8.47-22.156 8.47-30.627 0-8.47-8.472-8.47-22.159 0-30.63a21.594 21.594 0 0 1 15.317-6.35Zm9.865 15c-.316.028-.622.15-.872.344l-12.168 9.13-5.641-5.642c-1.224-1.275-3.63 1.132-2.356 2.356l6.663 6.663c.56.56 1.539.63 2.173.156l13.326-9.995c1.122-.816.43-2.993-.956-3.013a1.666 1.666 0 0 0-.17 0Z"
              />
            </g>
          </svg>
          <Title
            title="Thank you!"
            desc="Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com."
          />
        </div>
      </FadeOut>
    </>
  );
}
