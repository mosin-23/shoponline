import React from "react";
import "./Loader.css";
const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center mb-10 ml-5">
      <p className="text-center mb-10 items-center">Loading...</p>
      <div className="loader justify-center items-center">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
</div>
    </div>
  );
};

export default Loader;
