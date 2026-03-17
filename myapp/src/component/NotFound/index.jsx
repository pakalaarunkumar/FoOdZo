import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <img
        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/v1677828825/portal/m/seo_error_cat.png"
        alt="404 Not Found"
        className="error-image"
      />

      <h1 className="header-notFound">Oops! Page Not Found</h1>
      <p className="page-p">The page you are looking for doesn't exist.</p>

      <button onClick={() => navigate("/")}>Go Back Home</button>
    </div>
  );
};

export default NotFound;
