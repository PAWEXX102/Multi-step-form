"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const RedirectComponent = ({ nextRequest, setNextRequest, href }: { href:string, nextRequest: boolean, setNextRequest: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const router = useRouter();

  useEffect(() => {
    if (nextRequest) {
      router.push(href);
      setNextRequest(false);
    }
  }, [nextRequest]);

  return null;
};

export default RedirectComponent;
