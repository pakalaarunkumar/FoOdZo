import React from "react";
import "./index.css";
const About = () => {
  const logos = [
    "https://static.vecteezy.com/system/resources/thumbnails/010/353/285/small_2x/colourful-google-logo-on-white-background-free-vector.jpg",
    "https://static.vecteezy.com/system/resources/thumbnails/002/534/753/small_2x/red-play-button-in-the-rounded-rectangle-icon-sign-isolated-on-white-background-illustration-vector.jpg",
    "https://static.vecteezy.com/system/resources/thumbnails/026/579/897/small_2x/x-twitter-social-media-logo-symbol-design-illustration-free-vector.jpg",
    "https://static.vecteezy.com/system/resources/thumbnails/020/336/052/small_2x/zomato-logo-zomato-icon-free-free-vector.jpg",
    "https://static.vecteezy.com/system/resources/thumbnails/034/853/748/small_2x/square-instagram-logo-isolated-on-white-background-free-photo.jpg",
    "https://static.vecteezy.com/system/resources/thumbnails/045/664/678/small_2x/icon-of-paper-plane-white-plane-on-a-blue-background-vector.jpg",
  ];
  return (
    <div className="about-main-container">
      <div className="about-container">
        <h1 className="about-title">About FoodZo</h1>
        <div className="part-About-card">
          <div className="image-About-card">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/066/358/321/small_2x/a-table-with-empty-glasses-and-silverware-on-it-photo.jpeg"
              alt="About"
              className="About-image"
            />
          </div>
          <div>
            <p className="about-text">
              Welcome to <span className="highlight">FoodZo</span>, where taste
              meets happiness! We believe that food is not just something you
              eat — it’s an experience. Our mission is to serve fresh,
              delicious, and high-quality meals that bring joy in every bite. At
              FoodZo, every dish is prepared with care using fresh ingredients
              and authentic flavors. We focus on quality, hygiene, and customer
              satisfaction to ensure you enjoy a delightful and memorable dining
              experience every time.
            </p>
          </div>
        </div>

        <div className="part-About-card">
          <div>
            <p className="about-text">
              At <span className="highlight">FoodZo</span>, our chefs are the
              heart and soul of our kitchen. With years of culinary experience
              and a deep passion for cooking, they bring creativity and
              authenticity to every dish they prepare. Each recipe is crafted
              with precision, using fresh ingredients and carefully selected
              spices to deliver rich and unforgettable flavors. Our chefs focus
              on maintaining the highest standards of hygiene and quality while
              adding their unique touch to every meal. Their dedication and love
              for food ensure that every plate served at FoodZo is not just
              delicious, but truly special.
            </p>
          </div>
          <div className="image-About-card">
            <img
              src="https://compass-group.co.in/wp-content/uploads/2024/07/food_service_img_1jpg.jpg"
              alt="About"
              className="About-image"
            />
          </div>
        </div>

        <div className="part-About-card">
          <div className="image-About-card">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/058/782/025/small_2x/happy-people-having-fun-eating-at-food-truck-restaurant-outdoor-in-the-city-focus-on-waiter-face-photo.jpg"
              alt="About"
              className="About-image"
            />
          </div>
          <div>
            <p className="about-text">
              At <span className="highlight">FoodZo</span>, serving our
              customers is just as important as preparing great food. Our team
              is dedicated to providing warm, friendly, and attentive service to
              ensure every guest feels valued and welcomed. From the moment you
              place your order to the time your meal reaches your table, we
              focus on speed, accuracy, and care. We believe that a pleasant
              dining experience is created not only by delicious flavors but
              also by respectful and professional service. Our commitment is to
              make every visit comfortable, enjoyable, and memorable for each
              and every customer.
            </p>
          </div>
        </div>

        <div className="part-About-card">
          <div>
            <p className="about-text">
              At <span className="highlight">FoodZo</span>, we ensure that your
              favorite meals reach you fresh and on time. Our delivery team
              works efficiently to maintain the quality, taste, and hygiene of
              every order from our kitchen to your doorstep. We use secure and
              safe packaging to preserve freshness and prevent spills during
              transit. Timely delivery and customer satisfaction are our top
              priorities, and we strive to make the ordering process smooth and
              hassle-free. With FoodZo, you can enjoy delicious food anytime,
              anywhere, without compromising on quality or service.
            </p>
          </div>
          <div className="image-About-card">
            <img
              src="https://media.istockphoto.com/id/1287632111/photo/weve-got-you-covered-during-lockdown.jpg?s=612x612&w=0&k=20&c=7tP1pfzLUEWHnDv-Sb8Gc_4NepfpUV5aG_Z4P_3DJ80="
              alt="About"
              className="About-image"
            />
          </div>
        </div>
      </div>
      <div className="carousel-About">
        <h1 className="header-coursel-About">
          {" "}
          <span className="highlight">You</span> can{" "}
          <span className="highlight">know</span> more{" "}
          <span className="highlight">in</span>
        </h1>
        <div className="track">
          {[...logos, ...logos].map((logo, index) => (
            <div className="card" key={index}>
              <img src={logo} alt="logo" className="company-logos" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
