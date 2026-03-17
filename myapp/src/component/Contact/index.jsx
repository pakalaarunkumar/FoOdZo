import React from "react";
import "./index.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Contact = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
       
        <div className="footer-section">
          <h2 className="footer-logo">FoodZo</h2>
          <p>
            Serving happiness with every bite. Fresh ingredients, authentic
            flavors, and unforgettable dining experiences.
          </p>
        </div>

        
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: support@foodzo.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Location: India</p>
        </div>

        
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <FaFacebookF />
            <FaInstagram />
            <FaTwitter />
            <FaYoutube />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} FoodZo. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Contact;
