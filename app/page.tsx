"use client";

import React, { useState, useEffect, useRef } from "react";
import { useNextRequest, useUserSettings } from "./context";
import { useRouter } from "next/navigation";
import { Title } from "./components/Title";

export default function Home() {
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPhoneNumber, setErrorPhoneNumber] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { nextRequest, setNextRequest } = useNextRequest();
  const { userSettings, setUserSettings } = useUserSettings();

  const FormCheck = () => {
    let isValid = true;

    if (
      emailRef.current?.value === "" ||
      !emailRef.current?.value.includes("@")
    ) {
      setErrorEmail(true);
      isValid = false;
    }
    if (nameRef.current?.value === "") {
      setErrorName(true);
      isValid = false;
    }
    if (phoneNumberRef.current?.value === "") {
      setErrorPhoneNumber(true);
      isValid = false;
    }

    return isValid;
  };

  useEffect(() => {
    if (nextRequest) {
      if (FormCheck()) {
        router.push("/select-plan");
        setNextRequest(false);
      }
      setNextRequest(false);
    }
  }, [nextRequest]);

  return (
    <main>
      <Title
        title={"Personal info"}
        desc={"Please provide your name, email adress, and phone number."}
      />
      <form action="" className=" flex flex-col gap-6 mt-10">
        <div className=" flex flex-col">
          <div className=" flex justify-between">
            <label htmlFor="name" className=" text-Marineblue font-medium">
              Name
            </label>
            {errorName && (
              <p className=" text-Strawberryred font-bold text-sm">
                This field is required
              </p>
            )}
          </div>
          <input
            type="text"
            id="name"
            ref={nameRef}
            value={userSettings.name}
            placeholder="e.g. Stephen King"
            className={` border-[1px] font-medium text-Marineblue bg-White p-2 pl-3 text-[15px] border-Lightgray rounded-md mt-1 ${
              errorName && `border-Strawberryred`
            }`}
            onFocus={() => setErrorName(false)}
            onBlur={() => {
              if (nameRef.current?.value === "") {
                setErrorName(true);
              }
            }}
            onChange={(e) => {
              setUserSettings((prevSettings: typeof userSettings) => ({
                ...prevSettings,
                name: e.target.value,
              }));
            }}
          />
        </div>
        <div className=" flex flex-col">
          <div className=" flex justify-between">
            <label htmlFor="email" className=" text-Marineblue font-medium">
              Email
            </label>
            {errorEmail && (
              <p className=" text-Strawberryred font-bold text-sm">
                This field is required
              </p>
            )}
          </div>
          <input
            type="email"
            id="email"
            ref={emailRef}
            value={userSettings.email}
            placeholder="e.g. stephenking@lorem.com"
            className={`border-[1px] font-medium text-Marineblue bg-White p-2 pl-3 text-[15px] border-Lightgray rounded-md mt-1 ${
              errorEmail ? `border-Strawberryred` : ""
            }`}
            onFocus={() => setErrorEmail(false)}
            onBlur={() => {
              if (emailRef.current?.value === "") {
                setErrorEmail(true);
              }
            }}
            onChange={(e) => {
              setUserSettings((prevSettings: typeof userSettings) => ({
                ...prevSettings,
                email: e.target.value,
              }));
            }}
          />
        </div>
        <div className=" flex flex-col">
          <div className=" flex justify-between">
            <label
              htmlFor="phoneNumber"
              className=" text-Marineblue font-medium"
            >
              Phone Number
            </label>
            {errorPhoneNumber && (
              <p className=" text-Strawberryred font-bold text-sm">
                This field is required
              </p>
            )}
          </div>
          <input
            type="tel"
            id="phoneNumber"
            ref={phoneNumberRef}
            value={userSettings.phoneNumber}
            placeholder="e.g.+1 234 567 890"
            className={`border-[1px] font-medium text-Marineblue bg-White p-2 pl-3 text-[15px] border-Lightgray rounded-md mt-1 ${
              errorPhoneNumber ? `border-Strawberryred` : ""
            }`}
            onFocus={() => setErrorPhoneNumber(false)}
            onBlur={() => {
              if (phoneNumberRef.current?.value === "") {
                setErrorPhoneNumber(true);
              }
            }}
            onChange={(e) => {
              const re = /^[0-9\b]+$/;
              if (e.target.value === "" || re.test(e.target.value)) {
                setUserSettings((prevSettings: typeof userSettings) => ({
                  ...prevSettings,
                  phoneNumber: e.target.value,
                }));
              }
            }}
          />
        </div>
      </form>
    </main>
  );
}
