import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ItemsDetail.css";

const ItemsDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.item;

  const [cart, setCart] = useState({});
  const [popupItem, setPopupItem] = useState(null);

  if (!item) {
    return (
      <div className="no-item">
        <h2>No item selected</h2>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  const goBack = () => navigate(-1);

  const increaseQty = (variant) => {
    setCart((prev) => ({
      ...prev,
      [variant.name]: (prev[variant.name] || 0) + 1,
    }));

    //  Get existing cart items
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    const existingItem = cartItems.find((item) => item.name === variant.name);

    if (existingItem) {
      existingItem.qty += 1;
    } else {
      cartItems.push({
        name: variant.name,
        price: variant.price,
        image: variant.image || item.image,
        qty: 1,
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    //  Update cart count
    const current = Number(localStorage.getItem("cartCount")) || 0;
    localStorage.setItem("cartCount", current + 1);

    window.dispatchEvent(new Event("cartUpdated"));

    setPopupItem(variant);

    setTimeout(() => {
      setPopupItem(null);
    }, 3500);
  };

  const decreaseQty = (name) => {
    setCart((prev) => {
      const newQty = (prev[name] || 0) - 1;

      const current = Number(localStorage.getItem("cartCount")) || 0;
      localStorage.setItem("cartCount", Math.max(current - 1, 0));
      window.dispatchEvent(new Event("cartUpdated"));

      if (newQty <= 0) {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      }

      return { ...prev, [name]: newQty };
    });
  };

  return (
    <div className="variants-card-container">
      <button onClick={goBack} className="back-btn">
        ⬅ Back
      </button>

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
              <img src={popupItem.image || item.image} alt={popupItem.name} />
              <div>
                <h4 className="product-name-pop">{popupItem.name}</h4>
                <p className="product-price-pop">₹{popupItem.price}</p>
              </div>
            </div>

            <button className="go-cart-btn" onClick={() => navigate("/cart")}>
              Go to Cart ➜
            </button>
          </div>
        </div>
      )}

      <h2 className="variant-title">{item.name} Variants</h2>

      <div className="variants-grid">
        {item.variants.map((variant, index) => {
          const qty = cart[variant.name] || 0;

          return (
            <div key={index} className="variant-card">
              <img
                src={variant.image || item.image}
                alt={variant.name}
                className="variant-image"
              />

              <h4 className="variant-name">{variant.name}</h4>
              <p className="price-variant">₹{variant.price}</p>

              {qty === 0 ? (
                <button
                  className="add-btn"
                  onClick={() => increaseQty(variant)}
                >
                  ADD
                </button>
              ) : (
                <div className="quantity-box">
                  <button onClick={() => decreaseQty(variant.name)}>-</button>
                  <span className="add-numbers">{qty}</span>
                  <button onClick={() => increaseQty(variant)}>+</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ItemsDetails;
