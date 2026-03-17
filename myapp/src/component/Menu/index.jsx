import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const menuItems = [
  {
    name: "Idli",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/066/277/732/small_2x/three-small-bowls-of-curry-and-rice-on-a-white-plate-photo.jpg",
  },
  {
    name: "Dosa",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/059/003/524/small_2x/a-large-dosa-on-a-white-plate-photo.jpg",
  },
  {
    name: "Vada",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/015/933/677/small_2x/sambar-vada-or-medu-vadai-with-sambhar-and-chutney-popular-south-indian-snack-or-breakfast-free-photo.jpg",
  },
  {
    name: "Biryani",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/040/704/496/small_2x/ai-generated-royal-feast-master-the-art-of-chicken-biryani-at-home-generative-ai-photo.jpg",
  },
  {
    name: "Poori",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/024/318/875/small_2x/deep-fried-puri-luchi-photo.JPG",
  },
  {
    name: "Cakes",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/022/527/650/small_2x/birthday-cake-illustration-ai-generative-free-photo.jpg",
  },
  {
    name: "Tea",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/010/785/268/small_2x/hot-tea-in-white-teapot-and-cups-on-a-sieve-over-bright-gray-cement-background-closeup-copy-space-design-concept-photo.jpg",
  },
  {
    name: "Coffee",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/027/942/900/small_2x/savor-the-moment-exquisite-white-cappuccino-cup-for-a-luxurious-coffee-experience-generative-ai-photo.jpg",
  },
  {
    name: "Juice",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/003/738/819/small_2x/healthy-fruit-smoothies-free-photo.jpg",
  },
  {
    name: "Ice Cream",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/016/318/781/small_2x/homemade-strawberry-ice-cream-with-fresh-strawberries-photo.jpg",
  },
  {
    name: "Pizza",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/026/723/980/small_2x/foodgraphy-of-pizza-isolated-on-white-background-generative-ai-photo.jpg",
  },
];

function Menu() {
  const [translateX, setTranslateX] = useState(0);
  const navigate = useNavigate();

  const slideLeft = () => {
    setTranslateX((prev) => Math.min(prev + 155, 0));
  };

  const slideRight = () => {
    const maxTranslate = -(menuItems.length * 155 - window.innerWidth + 100);
    setTranslateX((prev) => Math.max(prev - 155, maxTranslate));
  };

  const handleItemClick = (item) => {
    navigate("/all-menu", {
      state: { category: item.name },
    });
  };

  return (
    <div>
      <div className="menu">
        <div className="whats-on-mind">
          What's on your mind <span className="question">?</span>
        </div>

        <div className="carousel-container">
          <button className="arrow left" onClick={slideLeft}>
            ←
          </button>

          <div
            className="carousel-track"
            style={{ transform: `translateX(${translateX}px)` }}
          >
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="menu-item"
                onClick={() => handleItemClick(item)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="images-items"
                />
                <span>{item.name}</span>
              </div>
            ))}
          </div>

          <button className="arrow right" onClick={slideRight}>
            →
          </button>
        </div>

        <div className="show-more-container">
          <button
            className="show-more-btn"
            onClick={() => navigate("/all-menu")}
          >
            Show More →
          </button>
        </div>
      </div>
    </div>
  );
}

export default Menu;
