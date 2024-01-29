
import { useEffect } from "react";
import { plans, addOns } from "../constants";

export const PriceCalculate = ({
  userSettings,
  setUserSettings,
}: {
  userSettings: any;
  setUserSettings: any;
}) => {
  const handlePlanIndex = (plan: String) => {
    const index = plans.findIndex((item) => item.name === plan);
    return index;
  };

  useEffect(() => {
    let total = 0;

    total +=
      userSettings.dataType === "Monthly"
        ? plans[handlePlanIndex(userSettings.plan)].priceMonthly
        : plans[handlePlanIndex(userSettings.plan)].priceYearly;

    if (userSettings.addOns) {
      userSettings.addOns.forEach((item: string) => {
        total +=
          userSettings.dataType === "Monthly"
            ? (addOns[item as keyof typeof addOns] as { priceMonthly: number })
                .priceMonthly
            : (addOns[item as keyof typeof addOns] as { priceYearly: number })
                .priceYearly;
      });
    }

    setUserSettings((prevSettings: {}) => ({ ...prevSettings, price: total }));
  }, [userSettings.addOns, userSettings.dataType, userSettings.plan]);
};
