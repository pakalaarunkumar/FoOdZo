import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Menu from "../Menu";
import About from "../About";
import Contact from "../Contact";
import Navbar from "../Navbar";
import "./index.css";
const Home = () => {
  const images = [
    "https://static.vecteezy.com/system/resources/thumbnails/040/704/496/small_2x/ai-generated-royal-feast-master-the-art-of-chicken-biryani-at-home-generative-ai-photo.jpg",
    "https://static.vecteezy.com/system/resources/thumbnails/073/527/753/small_2x/traditional-south-indian-breakfast-spread-featuring-dosa-idli-vada-and-chutney-with-hot-coffee-photo.jpeg",
    "https://static.vecteezy.com/system/resources/thumbnails/040/174/640/small_2x/ai-generated-attractive-food-images-photo.jpg",
    "https://static.vecteezy.com/system/resources/thumbnails/072/201/710/small_2x/bengali-thali-a-vibrant-and-aromatic-indian-feast-free-photo.jpg",
    "https://static.vecteezy.com/system/resources/thumbnails/071/612/582/small_2x/indian-sweets-on-a-tray-with-candles-photo.jpg",
    "https://static.vecteezy.com/system/resources/thumbnails/029/555/182/small_2x/fast-food-on-the-table-generative-ai-photo.jpg",
    "https://static.vecteezy.com/system/resources/thumbnails/071/807/966/small_2x/a-beautifully-arranged-table-showcases-a-variety-of-traditional-festive-dishes-for-chinese-new-year-colorful-decorations-and-intricate-tableware-enhance-the-joyful-ambiance-of-the-celebration-photo.jpeg",
    "https://static.vecteezy.com/system/resources/thumbnails/070/067/788/small_2x/close-up-of-assorted-ice-cream-scoops-free-photo.jpg",
    "https://static.vecteezy.com/system/resources/thumbnails/072/542/693/small_2x/a-variety-of-different-types-of-food-in-bowls-free-photo.jpeg",
  ];

  // carousel; part Logic
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // <Scrolling part with animation>

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        const section = document.getElementById(location.state.scrollTo);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }

        navigate(".", { replace: true });
      }, 100);
    }
  }, [location, navigate]);

  return (
    <div className="home-container">
      <Navbar />
      <div className="carousel">
        <img src={images[current]} alt="food" className="carousel-image" />

        <button
          className="prev"
          onClick={() =>
            setCurrent(current === 0 ? images.length - 1 : current - 1)
          }
        >
          ❮
        </button>

        <button
          className="next"
          onClick={() => setCurrent((current + 1) % images.length)}
        >
          ❯
        </button>
      </div>
      <div className="welcome-card">
        <div className="card-matter">
          <h1 className="card-heading">Delicious Food, Delivered To You</h1>
          <p className="card-description">
            Experience the best food from the comfort of your home. Order now
            and enjoy a delightful meal!
          </p>
          <button
            className="order-now-btn"
            onClick={() => navigate("/all-menu")}
          >
            Order Now
          </button>
        </div>
        <div className="card-image">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjExzJqOrbCWb21vXWE_uEmjlBNQ9lGRhAgA&s"
            alt="Delicious Food"
            className="food-image"
          />
        </div>
      </div>
      <div id="menu-section">
        <Menu />
      </div>

      <div id="about-section">
        <About />
      </div>

      <div id="contact-section">
        <Contact />
      </div>
    </div>
  );
};

export default Home;
