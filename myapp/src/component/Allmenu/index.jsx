import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import Navbar from "../Navbar";
import "./index.css";

const categories = [
  "Tiffiny",
  "Biryani",
  "South_India",
  "Pizza",
  "Ice_Cream",
  "Chinese",
  "Drinks",
  "Snacks",
];

const Allmenu = () => {
  const navigate = useNavigate();

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("https://foodzo-ajf0.onrender.com/foods")
      .then((res) => res.json())
      .then((data) => setFoods(data))
      .catch((err) => console.log(err));
  }, []);

  const [iceFilter, setIceFilter] = useState("IceCream");
  const [drinkFilter, setDrinkFilter] = useState("Soft");

  const [selectedCategory, setSelectedCategory] = useState(() => {
    return localStorage.getItem("selectedCategory") || "Tiffiny";
  });

  const [popupItem, setPopupItem] = useState(null);

  const [foodFilter, setFoodFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("selectedCategory", selectedCategory);
  }, [selectedCategory]);

  const increaseQty = (food) => {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    const existingItem = cartItems.find((item) => item.name === food.name);

    if (existingItem) {
      existingItem.qty += 1;
    } else {
      cartItems.push({
        name: food.name,
        price: food.price,
        image: food.image,
        type: food.type,
        qty: 1,
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    const current = Number(localStorage.getItem("cartCount")) || 0;
    localStorage.setItem("cartCount", current + 1);

    window.dispatchEvent(new Event("cartUpdated"));

    setPopupItem(food);

    setTimeout(() => {
      setPopupItem(null);
    }, 3000);
  };

  const openMobileSidebar = () => {
    document.getElementById("mobile-sidebar").classList.add("mobile-open");
    document.querySelector(".mobile-overlay")?.classList.add("mobile-open");
  };

  const closeMobileSidebar = () => {
    document.getElementById("mobile-sidebar").classList.remove("mobile-open");
    document.querySelector(".mobile-overlay")?.classList.remove("mobile-open");
  };

  let filteredFood = foods.filter((food) => {
    if (foodFilter !== "all" && food.type !== foodFilter) return false;

    const name = food.name.toLowerCase();

    if (selectedCategory === "Tiffiny") {
      return [
        "idli",
        "dosa",
        "vada",
        "bonda",
        "upma",
        "poori",
        "chapathi",
      ].some((item) => name.includes(item));
    }

    if (selectedCategory === "Biryani") {
      return name.includes("biryani");
    }

    if (selectedCategory === "South_India") {
      return ["rice", "pulihora", "curd", "annam"].some((item) =>
        name.includes(item),
      );
    }

    if (selectedCategory === "Pizza") {
      return name.includes("pizza");
    }

    if (selectedCategory === "Chinese") {
      return ["noodles", "fried rice", "manchurian", "soup", "chicken 65"].some(
        (item) => name.includes(item),
      );
    }

    if (selectedCategory === "Snacks") {
      return ["burger", "fries", "momos", "sandwich", "puffs", "shawarma"].some(
        (item) => name.includes(item),
      );
    }

    return true;
  });

  if (selectedCategory === "Ice_Cream") {
    filteredFood = filteredFood.filter((item) => item.iceType === iceFilter);
  }

  if (selectedCategory === "Drinks") {
    filteredFood = filteredFood.filter(
      (item) => item.drinkType === drinkFilter,
    );
  }

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) navigate("/login");
  }, []);

  return (
    <div className="allmenu-page">
      <Navbar />

      <div className="menu-main-container">
        {/* ADD HERE 👇 */}
        <button className="mobile-toggle-btn" onClick={openMobileSidebar}>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </button>

        <div className="mobile-overlay" onClick={closeMobileSidebar}></div>
        {/* Sidebar */}

        <div className="sidebar" id="mobile-sidebar">
          <h3>Menu</h3>

          {categories.map((item, index) => (
            <div
              key={index}
              className={`sidebar-item ${
                selectedCategory === item ? "active" : ""
              }`}
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setSelectedCategory(item);
                  setLoading(false);
                }, 400);
                closeMobileSidebar();
              }}
            >
              {item.replace(/_/g, " ")}
            </div>
          ))}
        </div>

        <div className="food-container">
          {/* FILTER ROW */}
          <div className="filter-row">
            {/* Veg / NonVeg */}
            <div className="filter-buttons">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKgIiQUaGZk2I3ZnxNenHxFB_uWJ99tY4eOpCv75ZC8A&s"
                alt="all"
                className={`food-type-icon ${
                  foodFilter === "all" ? "active-filter" : ""
                }`}
                onClick={() => setFoodFilter("all")}
              />

              <img
                src="https://i.pinimg.com/736x/ab/92/d2/ab92d2c3ab8f2b5faab889ac8b40336f.jpg"
                alt="veg"
                className={`food-type-icon ${
                  foodFilter === "Veg" ? "active-filter" : ""
                }`}
                onClick={() => setFoodFilter("Veg")}
              />

              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj4BP87TQOklqmoK8hBdToAXcAmSqQYHvwrQ&s"
                alt="nonveg"
                className={`food-type-icon ${
                  foodFilter === "nonveg" ? "active-filter" : ""
                }`}
                onClick={() => setFoodFilter("nonveg")}
              />
            </div>

            {/* Ice Cream Filters */}
            {selectedCategory === "Ice_Cream" && (
              <div className="ice-filter-buttons">
                <button
                  className={iceFilter === "IceCream" ? "active-filter" : ""}
                  onClick={() => setIceFilter("IceCream")}
                >
                  Ice Creams
                </button>

                <button
                  className={iceFilter === "Dessert" ? "active-filter" : ""}
                  onClick={() => setIceFilter("Dessert")}
                >
                  Desserts
                </button>
              </div>
            )}

            {/* Drinks Filters */}
            {selectedCategory === "Drinks" && (
              <div className="ice-filter-buttons">
                <button
                  className={drinkFilter === "Soft" ? "active-drink" : ""}
                  onClick={() => setDrinkFilter("Soft")}
                >
                  Soft Drinks
                </button>

                <button
                  className={drinkFilter === "Milkshake" ? "active-drink" : ""}
                  onClick={() => setDrinkFilter("Milkshake")}
                >
                  Milkshakes
                </button>

                <button
                  className={drinkFilter === "Hot" ? "active-drink" : ""}
                  onClick={() => setDrinkFilter("Hot")}
                >
                  Hot Drinks
                </button>
              </div>
            )}
          </div>

          {/* Category Title */}
          <h2 className="selectedCategory-heading">
            {selectedCategory.replace(/_/g, " ")}
          </h2>

          {/* FOOD GRID */}
          <div className="food-grid">
            {loading ? (
              <div className="menu-loader">
                <BeatLoader color="#ff5200" size={15} />
              </div>
            ) : filteredFood.length === 0 ? (
              <div className="no-items">
                <img
                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/empty_menu.png"
                  alt="No Items"
                  className="no-items-img"
                />
                <p>No Items Available</p>
              </div>
            ) : (
              filteredFood.map((food, index) => (
                <div key={index} className="food-card">
                  <div className="food-card-content">
                    <h4 className="food-items-name">{food.name}</h4>
                    <p>₹{food.price}</p>
                    <div className="rating">
                      ⭐⭐⭐⭐☆{" "}
                      <span style={{ color: "white" }}>4.7 (553)</span>
                    </div>
                  </div>

                  <div className="food-card-image">
                    <img src={food.image} alt={food.name} />

                    <button
                      className="add-btn"
                      onClick={() => increaseQty(food)}
                    >
                      ADD
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* CART POPUP */}
      {popupItem && (
        <div className="cart-popup">
          <div className="popup-box">
            <div className="popup-header">
              <span className="added-text">✔ Added to Cart</span>
              <span className="close-btn" onClick={() => setPopupItem(null)}>
                ✕
              </span>
            </div>

            <div className="popup-body">
              <img
                src={popupItem.image}
                alt={popupItem.name}
                className="popup-food-image"
              />

              <div>
                <h4>{popupItem.name}</h4>
                <p>₹{popupItem.price}</p>
              </div>
            </div>

            <button className="go-cart-btn" onClick={() => navigate("/cart")}>
              Go to Cart ➜
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Allmenu;
