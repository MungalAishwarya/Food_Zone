import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Veg from "./Veg";
import Non_Veg from "./Non_Veg";
import Milk_Items from "./Milk_Items";
import Cart from "./Cart";
import Profile from "./Profile";
import Login from "./Login";
import Registration from "./Registration";
import { useState } from "react";

function App() {
  const [cartItems, setCartItems] = useState([]);

  // Add to Cart
  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  // Remove from Cart
  const removeFromCart = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
  };

  return (
    <>
      <nav style={{ display: "flex", gap: "20px", padding: "10px" }}>
        <Link to="/">Home</Link>
        <Link to="/veg">Veg</Link>
        <Link to="/nonveg">NonVeg</Link>
        <Link to="/milkitems">MilkItems</Link>
        <Link to="/cart">Cart ({cartItems.length})</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/veg" element={<Veg addToCart={addToCart} />} />
        <Route path="/nonveg" element={<Non_Veg addToCart={addToCart} />} />
        <Route path="/milkitems" element={<Milk_Items addToCart={addToCart} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;