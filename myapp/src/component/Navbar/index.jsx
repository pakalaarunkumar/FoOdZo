import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "./index.css";

const Navbar = () => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const [cartCount, setCartCount] = useState(
    Number(localStorage.getItem("cartCount")) || 0,
  );

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn"),
  );

  const [username, setUsername] = useState(
    localStorage.getItem("username") || "User",
  );

  const scrollToSection = (sectionId) => {
    navigate("/", { state: { scrollTo: sectionId } });
  };

  useEffect(() => {
    const updateCart = () => {
      setCartCount(Number(localStorage.getItem("cartCount")) || 0);
    };

    const updateLogin = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn"));
      setUsername(localStorage.getItem("username") || "User");
    };

    window.addEventListener("cartUpdated", updateCart);
    window.addEventListener("loginStatusChanged", updateLogin);

    return () => {
      window.removeEventListener("cartUpdated", updateCart);
      window.removeEventListener("loginStatusChanged", updateLogin);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");

    window.dispatchEvent(new Event("loginStatusChanged"));

    navigate("/login");
  };

  return (
    <div className="main-container">
      <nav className="nav-container">
        {/* Logo */}
        <div className="logo-section" onClick={() => navigate("/")}>
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/077/659/754/small_2x/food-logo-illustration-design-suitable-for-logos-and-design-elements-free-vector.jpg"
            alt="FoOdZo"
            className="logo"
          />
          <h1 className="logo-name">FoOdZo</h1>
        </div>

        {/* Hamburger */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>

        {/* Menu */}
        <ul className={`nav-items ${menuOpen ? "active" : ""}`}>
          <li
            className="nav-item"
            onClick={() => scrollToSection("home-section")}
          >
            Home
          </li>

          <li
            className="nav-item"
            onClick={() => scrollToSection("menu-section")}
          >
            Menu
          </li>

          <li
            className="nav-item"
            onClick={() => scrollToSection("about-section")}
          >
            About Us
          </li>

          <li
            className="nav-item"
            onClick={() => scrollToSection("contact-section")}
          >
            Contact Us
          </li>

          {/* Cart */}
          <div className="cart-icon" onClick={() => navigate("/cart")}>
            <FaShoppingCart size={22} />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </div>

          {/* User */}
          {isLoggedIn ? (
            <>
              <button className="login-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <button className="login-btn" onClick={() => navigate("/login")}>
              Login
            </button>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
