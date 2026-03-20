import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      
      {/* Animated Heading */}
      <h1 className="main-heading">
        Welcome to <span>Food Zone</span>
      </h1>

      {/* Tagline */}
      <p className="tagline">
        Experience the Taste of Fresh & Delicious Food
      </p>

      {/* About Section */}
      <div className="about-section">
        <h2>About Us</h2>
        <p>
          Food Zone is a multi-cuisine hotel offering a variety of Veg and
          Non-Veg dishes prepared with fresh ingredients and authentic spices.
          We serve delicious meals in a clean and comfortable environment.
        </p>
      </div>

      {/* Specialities */}
      <div className="special-section">
        <h2>Our Specialities</h2>
        <ul>
          <li>🍗 Delicious Non-Veg Dishes</li>
          <li>🥗 Fresh & Healthy Veg Items</li>
          
        </ul>
      </div>

    </div>
  );
}

export default Home;
