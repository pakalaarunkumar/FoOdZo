import React from "react";
import "./index.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <img
        src="https://cdn.pixabay.com/animation/2022/10/11/03/16/03-16-39-160_512.gif"
        alt="loading"
        className="loader-gif"
      />
    </div>
  );
};

export default Loader;
