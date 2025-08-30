import { useEffect, useState } from "react";

const useIsTouchDevice = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const touch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0);
    setIsTouchDevice(touch);

    if (touch) {
      document.documentElement.classList.add("touch-device");
    } else {
      document.documentElement.classList.remove("touch-device");
    }
  }, []);

  return isTouchDevice;
};

export default useIsTouchDevice;
