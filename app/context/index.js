"use client";

import { createContext, useState, useContext } from "react";

export const NextRequestContext = createContext();
export const UserSettingsContext = createContext();

export const NextRequestProvider = ({ children }) => {
  const [nextRequest, setNextRequest] = useState(false);
  return (
    <NextRequestContext.Provider value={{ nextRequest, setNextRequest }}>
      {children}
    </NextRequestContext.Provider>
  );
};

export const UserSettingsProvider = ({ children }) => {
  const [userSettings, setUserSettings] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    plan: "Arcade",
    addOns: [],
    dataType: "Monthly",
    price: 0,
    finished: false,
  });
  return (
    <UserSettingsContext.Provider value={{ userSettings, setUserSettings }}>
      {children}
    </UserSettingsContext.Provider>
  );
};

export const useNextRequest = () => useContext(NextRequestContext);
export const useUserSettings = () => useContext(UserSettingsContext);

