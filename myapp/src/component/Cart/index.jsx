import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Cart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || [],
  );

  const cartCount = Number(localStorage.getItem("cartCount")) || 0;

  // TOTAL AMOUNT CALCULATION
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );

  const updateStorage = (updated) => {
    setCartItems(updated);
    localStorage.setItem("cartItems", JSON.stringify(updated));

    const newCount = updated.reduce((sum, item) => sum + item.qty, 0);
    localStorage.setItem("cartCount", newCount);

    window.dispatchEvent(new Event("cartUpdated"));
  };

  const increaseQty = (name) => {
    const updated = cartItems.map((item) =>
      item.name === name ? { ...item, qty: item.qty + 1 } : item,
    );

    updateStorage(updated);
  };

  const decreaseQty = (name) => {
    const updated = cartItems
      .map((item) =>
        item.name === name ? { ...item, qty: item.qty - 1 } : item,
      )
      .filter((item) => item.qty > 0);

    updateStorage(updated);
  };

  const removeItem = (name) => {
    const updated = cartItems.filter((item) => item.name !== name);
    updateStorage(updated);
  };

  return (
    <div className="cart-container" style={{ padding: "100px" }}>
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="ouput-card">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/075/120/795/small_2x/empty-cart-icon-editable-vector.jpg"
            alt="empty-cart"
            className="empty-cart-img"
          />

          <h1 className="cart-heading">Your cart is empty</h1>

          <button
            onClick={() => navigate("/all-menu")}
            className="order-now-btn"
          >
            Go Back
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item-card">
                <div className="cart-left">
                  <div className="cart-img-wrapper">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-img"
                    />

                    <img
                      src={
                        item.type === "Veg"
                          ? "https://i.pinimg.com/736x/ab/92/d2/ab92d2c3ab8f2b5faab889ac8b40336f.jpg"
                          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj4BP87TQOklqmoK8hBdToAXcAmSqQYHvwrQ&s"
                      }
                      alt="type"
                      className="veg-nonveg-icon"
                    />
                  </div>

                  <div className="cart-quantity-box">
                    <button onClick={() => decreaseQty(item.name)}>-</button>
                    <span className="items-cart-cout">{item.qty}</span>
                    <button onClick={() => increaseQty(item.name)}>+</button>
                  </div>
                </div>

                <div className="cart-details">
                  <h3 className="cart-heading-items">{item.name}</h3>
                  <p className="price-for-cart">
                    Price: ₹{item.price * item.qty}
                  </p>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.name)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* TOTAL ITEMS */}
          <h3 className="card-total-header">Total Items: {cartCount}</h3>

          {/* TOTAL AMOUNT */}
          <h2 className="cart-total-price">
            <span className="total-amount-heading">Total Amount:</span> ₹
            {totalAmount}
          </h2>

          <button
            className="continue-shopping-btn"
            onClick={() => navigate("/all-menu")}
          >
            Continue Shopping
          </button>

          <div className="simalary-items-card">
            <h1 className="heading-simarly-card">similarly Items</h1>
            <div className="images-items">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/050/397/397/small_2x/a-plate-with-a-crepe-and-a-side-of-sauce-photo.jpeg"
                alt="images"
                onClick={() => navigate("/all-menu")}
                className="continue-images"
              />
              <img
                src="https://b.zmtcdn.com/data/dish_photos/a58/4cd5d665a111dc1395b889f8c91b7a58.jpg?output-format=webp"
                alt="images"
                onClick={() => navigate("/all-menu")}
                className="continue-images"
              />
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/040/704/496/small_2x/ai-generated-royal-feast-master-the-art-of-chicken-biryani-at-home-generative-ai-photo.jpg"
                alt="images"
                onClick={() => navigate("/all-menu")}
                className="continue-images"
              />
              <img
                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/FOOD_CATALOG/IMAGES/CMS/2024/10/21/e40f8f13-18c5-44f7-9bb6-23c436d4f0f7_7438d4b8-223f-4b11-ab98-b2210687e1a1.JPG"
                alt="images"
                onClick={() => navigate("/all-menu")}
                className="continue-images"
              />
              <img
                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/oylydfshnhk6tslpuiej"
                alt="images"
                onClick={() => navigate("/all-menu")}
                className="continue-images"
              />
              <img
                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/FOOD_CATALOG/IMAGES/CMS/2025/11/7/0d42cb15-444f-48a7-954f-862f010dede4_b5a7c398-d91c-4301-b9d8-1419eb737514.jpg"
                alt="images"
                onClick={() => navigate("/all-menu")}
                className="continue-images"
              />
              <img
                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/FOOD_CATALOG/IMAGES/CMS/2024/7/18/4df80725-fbff-4fa4-a0d9-be2b5bddd06f_d72e2fa4-74c2-4fcb-bd46-40081f112f61.JPG"
                alt="images"
                onClick={() => navigate("/all-menu")}
                className="continue-images"
              />

              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/072/185/334/small_2x/refreshing-glasses-of-cold-mango-juice-with-fresh-diced-mango-and-a-whole-fruit-on-a-white-table-photo.jpg"
                alt="images"
                onClick={() => navigate("/all-menu")}
                className="continue-images"
              />
              <img
                src="https://cdn.zeptonow.com/production/ik-seo/tr:w-470,ar-1200-1200,pr-true,f-auto,,q-40,dpr-2/cms/product_variant/5e4695df-05d0-4bc7-a3ff-4557b0fdd61b/Coca-Cola-Diet-Coke-Soft-Drink-Can-Low-Calorie-Fizzy.jpeg"
                alt="images"
                onClick={() => navigate("/all-menu")}
                className="continue-images"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
