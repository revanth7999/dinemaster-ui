import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LANDING_PAGE, LOGIN_PAGE, TOKEN } from "./Constants";

export default function OAuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (token) {
        localStorage.setItem(TOKEN, token);
        navigate(LANDING_PAGE);
      } else {
        navigate(LOGIN_PAGE);
      }
    }, 300); // wait 300ms

    return () => clearTimeout(timeout);
  }, [navigate]);

  return <div>Logging you in...</div>;
}
