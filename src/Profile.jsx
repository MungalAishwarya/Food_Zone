import React, { useState, useEffect } from "react";
import "./Profile.css";

// SVG Icons for Tabs
const IconDashboard = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" />
    <rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" />
  </svg>
);

const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

const IconOrders = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const IconAddress = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);

const IconWallet = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" /><line x1="12" y1="10" x2="12" y2="10" />
    <path d="M22 12h-4a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h4" />
  </svg>
);

const IconSettings = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

// SVG Food-Themed Cartoon Avatars
const avatars = [
  // Pizza Avatar
  () => (
    <svg viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="46" fill="#f7d070" />
      <path d="M50 4C75.4 4 96 24.6 96 50H50V4Z" fill="#ff6b6b" opacity="0.8" />
      {/* Pepperoni */}
      <circle cx="35" cy="30" r="6" fill="#d63031" />
      <circle cx="65" cy="25" r="7" fill="#d63031" />
      <circle cx="70" cy="65" r="5" fill="#d63031" />
      <circle cx="30" cy="60" r="8" fill="#d63031" />
      {/* Eyes */}
      <circle cx="42" cy="45" r="4" fill="#2d3436" />
      <circle cx="58" cy="45" r="4" fill="#2d3436" />
      {/* Smile */}
      <path d="M44 55 Q50 62 56 55" stroke="#2d3436" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Cheeks */}
      <circle cx="36" cy="50" r="3" fill="#ff8787" />
      <circle cx="64" cy="50" r="3" fill="#ff8787" />
    </svg>
  ),
  // Burger Avatar
  () => (
    <svg viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="46" fill="#ffeaa7" />
      {/* Bun top */}
      <path d="M20 45 C20 25, 80 25, 80 45 Z" fill="#e67e22" />
      {/* Cheese */}
      <path d="M18 45 L82 45 L78 52 L70 48 L62 54 L50 48 L38 54 L26 48 Z" fill="#f1c40f" />
      {/* Patty */}
      <rect x="18" y="52" width="64" height="10" rx="5" fill="#6d4c41" />
      {/* Lettuce */}
      <path d="M15 50 C25 50, 30 52, 40 50 C50 48, 60 52, 70 50 C80 48, 85 50, 85 50" stroke="#2ecc71" strokeWidth="4" fill="none" />
      {/* Bun Bottom */}
      <path d="M22 62 C22 75, 78 75, 78 62 Z" fill="#d35400" />
      {/* Eyes */}
      <circle cx="40" cy="36" r="3.5" fill="#2d3436" />
      <circle cx="60" cy="36" r="3.5" fill="#2d3436" />
      {/* Smile */}
      <path d="M45 42 Q50 46 55 42" stroke="#2d3436" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  ),
  // Cupcake Avatar
  () => (
    <svg viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="46" fill="#f8c291" />
      {/* Cup wrapper */}
      <path d="M30 55 L70 55 L64 80 L36 80 Z" fill="#9b59b6" />
      <line x1="40" y1="55" x2="43" y2="80" stroke="#8e44ad" strokeWidth="2" />
      <line x1="50" y1="55" x2="50" y2="80" stroke="#8e44ad" strokeWidth="2" />
      <line x1="60" y1="55" x2="57" y2="80" stroke="#8e44ad" strokeWidth="2" />
      {/* Frosting */}
      <path d="M25 55 C22 45, 38 40, 50 40 C62 40, 78 45, 75 55 Z" fill="#ff7675" />
      <path d="M32 45 C32 35, 68 35, 68 45 Z" fill="#ff7675" opacity="0.9" />
      <circle cx="50" cy="33" r="6" fill="#e74c3c" /> {/* Cherry */}
      {/* Sprinkles */}
      <rect x="36" y="48" width="5" height="2" rx="1" fill="#f1c40f" transform="rotate(15)" />
      <rect x="58" y="44" width="5" height="2" rx="1" fill="#3498db" transform="rotate(-30)" />
      <rect x="48" y="50" width="5" height="2" rx="1" fill="#2ecc71" transform="rotate(45)" />
      {/* Face on Wrapper */}
      <circle cx="44" cy="65" r="3" fill="#fff" />
      <circle cx="56" cy="65" r="3" fill="#fff" />
      <path d="M47 70 Q50 72 53 70" stroke="#fff" strokeWidth="2" fill="none" />
    </svg>
  ),
  // Ice Cream Avatar
  () => (
    <svg viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="46" fill="#81ecec" />
      {/* Cone */}
      <path d="M50 88 L34 50 L66 50 Z" fill="#e0a96d" />
      <path d="M38 50 L50 88 M44 50 L53 80 M56 50 L50 88 M62 50 L47 80" stroke="#c6955c" strokeWidth="1" />
      {/* Scoops */}
      <circle cx="50" cy="40" r="18" fill="#fab1a0" />
      <circle cx="40" cy="44" r="12" fill="#ffeaa7" />
      <circle cx="60" cy="44" r="12" fill="#55efc4" />
      {/* Cherry on Top */}
      <circle cx="50" cy="22" r="5" fill="#d63031" />
      {/* Eyes */}
      <circle cx="44" cy="38" r="2.5" fill="#2d3436" />
      <circle cx="56" cy="38" r="2.5" fill="#2d3436" />
      <path d="M47 43 Q50 46 53 43" stroke="#2d3436" strokeWidth="2" fill="none" />
    </svg>
  )
];

function Profile() {
  // 1. Theme Configuration
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("food_zone_theme") || "emerald";
  });

  // 2. Active Tab Configuration
  const [activeTab, setActiveTab] = useState("overview");

  // 3. User Info Persistence
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem("food_zone_profile_user");
    return saved ? JSON.parse(saved) : {
      name: "Aishwarya Mungal",
      email: "aishwarya.m@foodzone.com",
      phone: "+91 98765 43210",
      bio: "Food enthusiast. Love trying out spicy non-veg and authentic Indian desserts!",
      preference: "Both"
    };
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempUser, setTempUser] = useState({ ...userData });

  // 4. Avatar Index Configuration
  const [avatarIndex, setAvatarIndex] = useState(() => {
    const idx = localStorage.getItem("food_zone_avatar_index");
    return idx !== null ? parseInt(idx, 10) : 0;
  });
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  // 5. Addresses Persistence
  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem("food_zone_profile_addresses");
    return saved ? JSON.parse(saved) : [
      { id: 1, tag: "Home", text: "123, Green Valley Apartments, Sector 45, Gurgaon, HR - 122003" },
      { id: 2, tag: "Office", text: "Block C, 5th Floor, Cyber City Tech Park, Gurgaon, HR - 122002" }
    ];
  });

  const [addressForm, setAddressForm] = useState({ id: null, tag: "", text: "" });
  const [showAddressForm, setShowAddressForm] = useState(false);

  // 6. Wallet Balance Persistence
  const [walletBalance, setWalletBalance] = useState(() => {
    const saved = localStorage.getItem("food_zone_profile_wallet");
    return saved ? parseFloat(saved) : 345.50;
  });

  // 7. Toggle Settings State
  const [settingsToggles, setSettingsToggles] = useState(() => {
    const saved = localStorage.getItem("food_zone_profile_toggles");
    return saved ? JSON.parse(saved) : {
      emailReceipts: true,
      showNutrients: false,
      smsTracking: true
    };
  });

  // Save changes to LocalStorage on updates
  useEffect(() => {
    localStorage.setItem("food_zone_theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("food_zone_profile_user", JSON.stringify(userData));
  }, [userData]);

  useEffect(() => {
    localStorage.setItem("food_zone_avatar_index", avatarIndex.toString());
  }, [avatarIndex]);

  useEffect(() => {
    localStorage.setItem("food_zone_profile_addresses", JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    localStorage.setItem("food_zone_profile_wallet", walletBalance.toString());
  }, [walletBalance]);

  useEffect(() => {
    localStorage.setItem("food_zone_profile_toggles", JSON.stringify(settingsToggles));
  }, [settingsToggles]);

  // Handle Profile Form edits
  const handleProfileChange = (e) => {
    setTempUser({ ...tempUser, [e.target.name]: e.target.value });
  };

  const saveProfile = (e) => {
    e.preventDefault();
    setUserData({ ...tempUser });
    setIsEditing(false);
  };

  const cancelProfileEdit = () => {
    setTempUser({ ...userData });
    setIsEditing(false);
  };

  // Handle Add/Edit Address Form
  const saveAddress = (e) => {
    e.preventDefault();
    if (!addressForm.tag.trim() || !addressForm.text.trim()) return;

    if (addressForm.id) {
      // Edit
      setAddresses(addresses.map(addr => addr.id === addressForm.id ? addressForm : addr));
    } else {
      // Create
      setAddresses([...addresses, { ...addressForm, id: Date.now() }]);
    }
    setAddressForm({ id: null, tag: "", text: "" });
    setShowAddressForm(false);
  };

  const editAddress = (addr) => {
    setAddressForm(addr);
    setShowAddressForm(true);
  };

  const deleteAddress = (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      setAddresses(addresses.filter(addr => addr.id !== id));
    }
  };

  // Add money to wallet
  const addFunds = (amount) => {
    setWalletBalance(prev => prev + amount);
  };

  // Handle Toggle preference switches
  const handleToggleChange = (key) => {
    setSettingsToggles({ ...settingsToggles, [key]: !settingsToggles[key] });
  };

  const ActiveAvatarSVG = avatars[avatarIndex];

  return (
    <div className={`profile-wrapper theme-${theme}`}>
      <div className="profile-container">
        
        {/* SIDEBAR */}
        <aside className="profile-sidebar">
          {/* Avatar Area */}
          <div className="profile-avatar-container">
            <div className="profile-avatar-img">
              <ActiveAvatarSVG />
            </div>
            <button className="edit-avatar-btn" onClick={() => setShowAvatarModal(true)} title="Change Avatar">
              ✏️
            </button>
          </div>

          <h2 className="profile-user-name">{userData.name}</h2>
          <span className="profile-user-badge">Foodie Gold Pro</span>

          {/* Navigation Tabs */}
          <nav className="profile-menu">
            <button 
              className={`profile-menu-item ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              <IconDashboard /> Overview Dashboard
            </button>
            <button 
              className={`profile-menu-item ${activeTab === "personal-info" ? "active" : ""}`}
              onClick={() => setActiveTab("personal-info")}
            >
              <IconUser /> Personal Profile
            </button>
            <button 
              className={`profile-menu-item ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              <IconOrders /> Order History
            </button>
            <button 
              className={`profile-menu-item ${activeTab === "addresses" ? "active" : ""}`}
              onClick={() => setActiveTab("addresses")}
            >
              <IconAddress /> Delivery Addresses
            </button>
            <button 
              className={`profile-menu-item ${activeTab === "wallet" ? "active" : ""}`}
              onClick={() => setActiveTab("wallet")}
            >
              <IconWallet /> Wallet & Offers
            </button>
            <button 
              className={`profile-menu-item ${activeTab === "settings" ? "active" : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              <IconSettings /> Page Style Template
            </button>
          </nav>
        </aside>

        {/* DETAILS SECTION */}
        <main className="profile-content">
          
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === "overview" && (
            <div>
              <div className="tab-title">
                <span>Account Overview</span>
                <span style={{ fontSize: "14px", color: "var(--theme-primary)" }}>🔥 Spark Level Gold</span>
              </div>
              
              <div className="profile-stats-grid">
                <div className="stat-card">
                  <div className="stat-val">₹{walletBalance.toFixed(2)}</div>
                  <div className="stat-lbl">Wallet Cash</div>
                </div>
                <div className="stat-card">
                  <div className="stat-val">28</div>
                  <div className="stat-lbl">Total Orders</div>
                </div>
                <div className="stat-card">
                  <div className="stat-val">{addresses.length}</div>
                  <div className="stat-lbl">Addresses</div>
                </div>
                <div className="stat-card">
                  <div className="stat-val">3 Active</div>
                  <div className="stat-lbl">Discounts</div>
                </div>
              </div>

              <div style={{ background: "rgba(255,255,255,0.04)", padding: "25px", borderRadius: "16px", border: "1px solid var(--theme-border)" }}>
                <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>Welcome Back, {userData.name}!</h3>
                <p style={{ color: "var(--theme-text-muted)", fontSize: "15px", lineHeight: "1.6" }}>
                  {userData.bio || "No profile bio added yet. Tell us a bit about what you love to eat!"}
                </p>
                <div style={{ marginTop: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <span style={{ background: "rgba(var(--theme-primary-rgb), 0.1)", color: "var(--theme-primary)", border: "1px solid var(--theme-border)", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "700" }}>
                    🌱 Food Preference: {userData.preference}
                  </span>
                  <span style={{ background: "rgba(var(--theme-primary-rgb), 0.1)", color: "var(--theme-primary)", border: "1px solid var(--theme-border)", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "700" }}>
                    📞 Contact: {userData.phone}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PERSONAL PROFILE */}
          {activeTab === "personal-info" && (
            <div>
              <div className="tab-title">Personal Settings</div>
              <form onSubmit={saveProfile} className="info-section">
                <div className="info-row">
                  <div className="info-group">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={isEditing ? tempUser.name : userData.name} 
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      required
                    />
                  </div>
                  <div className="info-group">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={isEditing ? tempUser.email : userData.email} 
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      required
                    />
                  </div>
                </div>

                <div className="info-row">
                  <div className="info-group">
                    <label>Phone Number</label>
                    <input 
                      type="text" 
                      name="phone" 
                      value={isEditing ? tempUser.phone : userData.phone} 
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      required
                    />
                  </div>
                  <div className="info-group">
                    <label>Food Preference</label>
                    <select 
                      name="preference" 
                      value={isEditing ? tempUser.preference : userData.preference} 
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                    >
                      <option value="Veg">Vegetarian Only</option>
                      <option value="Non-Veg">Non-Vegetarian Only</option>
                      <option value="Both">Both Veg & Non-Veg</option>
                    </select>
                  </div>
                </div>

                <div className="info-group">
                  <label>Short Bio</label>
                  <textarea 
                    name="bio" 
                    value={isEditing ? tempUser.bio : userData.bio} 
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    placeholder="Describe your spicy levels or favorite cuisines..."
                  />
                </div>

                <div className="btn-group">
                  {isEditing ? (
                    <>
                      <button type="button" className="secondary-btn" onClick={cancelProfileEdit}>
                        Cancel
                      </button>
                      <button type="submit" className="primary-btn">
                        Save Changes
                      </button>
                    </>
                  ) : (
                    <button type="button" className="primary-btn" onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: ORDER HISTORY */}
          {activeTab === "orders" && (
            <div>
              <div className="tab-title">Recent Orders Log</div>
              <div className="orders-list">
                
                <div className="order-item-card">
                  <div className="order-main-details">
                    <span className="order-title">Paneer Butter Masala + Garlic Naan x2</span>
                    <div className="order-meta-info">
                      <span>Order #829283</span>
                      <span>Today, 02:40 PM</span>
                      <span className="order-badge-status status-transit">Preparing</span>
                    </div>
                  </div>
                  <div className="order-price">₹490.00</div>
                </div>

                <div className="order-item-card">
                  <div className="order-main-details">
                    <span className="order-title">Double Cheese Veg Pizza + Pepsi Can</span>
                    <div className="order-meta-info">
                      <span>Order #821034</span>
                      <span>Yesterday, 08:15 PM</span>
                      <span className="order-badge-status status-delivered">Delivered</span>
                    </div>
                  </div>
                  <div className="order-price">₹420.00</div>
                </div>

                <div className="order-item-card">
                  <div className="order-main-details">
                    <span className="order-title">Kheer Premium Bowl + Basundi Shake</span>
                    <div className="order-meta-info">
                      <span>Order #812984</span>
                      <span>03 July 2026, 04:30 PM</span>
                      <span className="order-badge-status status-delivered">Delivered</span>
                    </div>
                  </div>
                  <div className="order-price">₹280.00</div>
                </div>

                <div className="order-item-card">
                  <div className="order-main-details">
                    <span className="order-title">Crispy Paneer Sandwich + Kulfi Dessert</span>
                    <div className="order-meta-info">
                      <span>Order #804982</span>
                      <span>01 July 2026, 01:10 PM</span>
                      <span className="order-badge-status status-cancelled">Cancelled</span>
                    </div>
                  </div>
                  <div className="order-price">₹460.00</div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: DELIVERY ADDRESSES */}
          {activeTab === "addresses" && (
            <div>
              <div className="tab-title">
                <span>Manage Delivery Destinations</span>
                {!showAddressForm && (
                  <button className="primary-btn" style={{ padding: "8px 16px", fontSize: "13px" }} onClick={() => setShowAddressForm(true)}>
                    + Add New
                  </button>
                )}
              </div>

              {showAddressForm && (
                <form onSubmit={saveAddress} className="add-address-form-box">
                  <h3 style={{ fontSize: "16px", fontWeight: "700" }}>
                    {addressForm.id ? "Edit Address Details" : "Enter New Address Details"}
                  </h3>
                  <div className="info-group">
                    <label>Label / Tag</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Home, Office, Friend's House" 
                      value={addressForm.tag}
                      onChange={(e) => setAddressForm({ ...addressForm, tag: e.target.value })}
                      required
                    />
                  </div>
                  <div className="info-group">
                    <label>Complete Address</label>
                    <textarea 
                      placeholder="House number, Building, Area, Sector, Landmark, Pin code" 
                      value={addressForm.text}
                      onChange={(e) => setAddressForm({ ...addressForm, text: e.target.value })}
                      required
                    />
                  </div>
                  <div className="btn-group">
                    <button type="button" className="secondary-btn" onClick={() => {
                      setAddressForm({ id: null, tag: "", text: "" });
                      setShowAddressForm(false);
                    }}>
                      Cancel
                    </button>
                    <button type="submit" className="primary-btn">
                      Save Location
                    </button>
                  </div>
                </form>
              )}

              <div className="address-grid" style={{ marginTop: "20px" }}>
                {addresses.map((addr) => (
                  <div className="address-item-card" key={addr.id}>
                    <div>
                      <div className="address-tag">{addr.tag}</div>
                      <p className="address-body">{addr.text}</p>
                    </div>
                    <div className="address-actions">
                      <button className="address-action-btn address-btn-edit" onClick={() => editAddress(addr)}>
                        Edit Location
                      </button>
                      <button className="address-action-btn address-btn-delete" onClick={() => deleteAddress(addr.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: WALLET AND OFFERS */}
          {activeTab === "wallet" && (
            <div>
              <div className="tab-title">Food Zone Balance Wallet</div>
              
              <div className="wallet-box">
                <div className="wallet-details">
                  <span className="wallet-label">Available Balance</span>
                  <span className="wallet-amount">₹{walletBalance.toFixed(2)}</span>
                </div>
                <div className="wallet-action-row">
                  <button className="primary-btn" onClick={() => addFunds(200)}>+ Add ₹200</button>
                  <button className="primary-btn" onClick={() => addFunds(500)}>+ Add ₹500</button>
                </div>
              </div>

              <h3 className="coupon-section-title">Available Special Coupons</h3>
              <div className="coupons-grid">
                <div className="coupon-item-card">
                  <span className="coupon-header">₹100 Cash Discount</span>
                  <div className="coupon-code">WELCOME100</div>
                  <p className="coupon-desc">Get flat Rs 100 off on order total above Rs 499. Applicable on Veg and Non-Veg categories.</p>
                </div>
                <div className="coupon-item-card">
                  <span className="coupon-header">Free Sweet Kheer Dessert</span>
                  <div className="coupon-code">FREEKHEER</div>
                  <p className="coupon-desc">Free premium Basundi or Kheer bowl on orders above Rs 600. Grab your sweets now.</p>
                </div>
                <div className="coupon-item-card">
                  <span className="coupon-header">Super Saver 20% Off</span>
                  <div className="coupon-code">ZONE20</div>
                  <p className="coupon-desc">Get 20% discount on placing an order during happy hours (04:00 PM to 07:00 PM).</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: SETTINGS & TEMPLATES */}
          {activeTab === "settings" && (
            <div className="settings-section">
              <div className="tab-title">App Design & Preference Settings</div>

              {/* Theme selection template block */}
              <div className="settings-group">
                <h3>Select Profile Theme Template</h3>
                <div className="theme-selector-grid">
                  <button 
                    className={`theme-option-btn ${theme === "emerald" ? "active" : ""}`}
                    onClick={() => setTheme("emerald")}
                  >
                    <div className="theme-preview-dot dot-emerald"></div>
                    <span className="theme-option-name">Emerald Glass</span>
                  </button>

                  <button 
                    className={`theme-option-btn ${theme === "sunset" ? "active" : ""}`}
                    onClick={() => setTheme("sunset")}
                  >
                    <div className="theme-preview-dot dot-sunset"></div>
                    <span className="theme-option-name">Sunset Flare</span>
                  </button>

                  <button 
                    className={`theme-option-btn ${theme === "cyber" ? "active" : ""}`}
                    onClick={() => setTheme("cyber")}
                  >
                    <div className="theme-preview-dot dot-cyber"></div>
                    <span className="theme-option-name">Midnight Cyber</span>
                  </button>

                  <button 
                    className={`theme-option-btn ${theme === "sakura" ? "active" : ""}`}
                    onClick={() => setTheme("sakura")}
                  >
                    <div className="theme-preview-dot dot-sakura"></div>
                    <span className="theme-option-name">Sakura Pastel</span>
                  </button>
                </div>
              </div>

              {/* Toggles settings */}
              <div className="settings-group" style={{ marginTop: "20px" }}>
                <h3>Notification & Display Preferences</h3>
                
                <div className="setting-toggle-row">
                  <div className="toggle-info">
                    <span className="toggle-title">Email Receipts</span>
                    <span className="toggle-desc">Receive itemized PDF receipts directly at {userData.email}</span>
                  </div>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={settingsToggles.emailReceipts}
                      onChange={() => handleToggleChange("emailReceipts")}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="setting-toggle-row">
                  <div className="toggle-info">
                    <span className="toggle-title">SMS Order Tracking</span>
                    <span className="toggle-desc">Get instant updates on delivery status via SMS to {userData.phone}</span>
                  </div>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={settingsToggles.smsTracking}
                      onChange={() => handleToggleChange("smsTracking")}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="setting-toggle-row">
                  <div className="toggle-info">
                    <span className="toggle-title">Show Nutritional Information</span>
                    <span className="toggle-desc">Display calorie and macros count for food dishes in order logs</span>
                  </div>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={settingsToggles.showNutrients}
                      onChange={() => handleToggleChange("showNutrients")}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

              </div>

            </div>
          )}

        </main>
      </div>

      {/* AVATAR SELECTION MODAL */}
      {showAvatarModal && (
        <div className="modal-overlay" onClick={() => setShowAvatarModal(false)}>
          <div className="modal-content-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-title">
              <span>Choose Cartoon Avatar</span>
              <button className="modal-close-x" onClick={() => setShowAvatarModal(false)}>×</button>
            </div>
            
            <div className="avatar-selection-panel">
              {avatars.map((AvatarSVGComponent, index) => (
                <div 
                  key={index} 
                  className={`avatar-option-card ${avatarIndex === index ? "active" : ""}`}
                  onClick={() => {
                    setAvatarIndex(index);
                    setShowAvatarModal(false);
                  }}
                >
                  <AvatarSVGComponent />
                </div>
              ))}
            </div>

            <p style={{ fontSize: "13px", color: "var(--theme-text-muted)", textAlign: "center", lineHeight: "1.4" }}>
              Select a cartoon profile buddy representing your foodie personality!
            </p>
          </div>
        </div>
      )}

    </div>
  );
}

export default Profile;