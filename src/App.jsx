import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Veg from "./Veg";
import Non_Veg from "./Non_Veg";
import Milk_Items from "./Milk_Items";
import Cart from "./Cart";
import Profile from "./Profile";
import Login from "./Login";
import Registration from "./Registration";
import { useSelector } from "react-redux";
import "./Cart.css";

function App() {
  const cart = useSelector((state) => state.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <nav className="navbar">
        <Link className="nav-item" to="/">Home</Link>
        <Link className="nav-item" to="/veg">Veg</Link>
        <Link className="nav-item" to="/nonveg">NonVeg</Link>
        <Link className="nav-item" to="/milkitems">MilkItems</Link>
        <Link className="nav-item cart-badge" to="/cart">Cart ({totalItems})</Link>
        <Link className="nav-item" to="/profile">Profile</Link>
        <Link className="nav-item" to="/login">Login</Link>
        <Link className="nav-item" to="/register">Register</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/veg" element={<Veg />} />
        <Route path="/nonveg" element={<Non_Veg />} />
        <Route path="/milkitems" element={<Milk_Items />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;