import { useState, useEffect } from "react";
import "./Landing.css";
import "./Res.css";
import { LANDING } from "../Constants";

const Landing = () => {
  useEffect(() => {
    document.title = LANDING;
  }, []);

  return (
    <>
      <div
        className="alert alert-success"
        role="alert"
        style={{ width: "40%" }}
      >
        <b>Welcome to DineMaster!</b> Explore our diverse menu and enjoy a
        seamless dining experience.
      </div>
    </>
  );
};

export default Landing;
