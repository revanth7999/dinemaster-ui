import { useEffect, useRef } from "react";
import { handleLogout } from "./utils/logout";

// const IDLE_TIMEOUT = 15 * 60 * 1000; // 15 minutes
const IDLE_TIMEOUT = 30 * 1000; // 30 seconds

export function useIdleLogout() {
  const timeoutRef = useRef(null);

  const resetTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      handleLogout(); // Auto-logout
    }, IDLE_TIMEOUT);
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer(); // Initial set

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      clearTimeout(timeoutRef.current);
    };
  }, []);
}
