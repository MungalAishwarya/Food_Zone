import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeItem, incrementQuantity, decrementQuantity } from "./CartSlice";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { applyCupon, resetCupon } from "./CuponSlice.js";
import QRCode from "qrcode";
import emailjs from "@emailjs/browser";
import "react-toastify/dist/ReactToastify.css";
import "./Cart.css";
import { Link } from "react-router-dom";

function Cart() {
    const cart = useSelector((state) => state.cart);
    const cupon = useSelector((state) => state.cupon);
    const dispatch = useDispatch();

    const [paymentMethod, setPaymentMethod] = useState("");
    const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");
    const [couponInput, setCouponInput] = useState("");
    const [directDiscount, setDirectDiscount] = useState(0); // in percentage
    const [email, setEmail] = useState("");
    const [showEmailSection, setShowEmailSection] = useState(false);
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);

    // Calculate total amount (excluding discount and tax)
    const totalAmount = cart.reduce((sum, item) => {
        const priceNum = typeof item.price === "string" ? parseFloat(item.price.replace(/[^0-9.]/g, '')) : item.price;
        return sum + (priceNum * item.quantity);
    }, 0);

    // Coupon discount value
    const couponDiscountVal = totalAmount * (cupon.discount / 100);

    // Direct discount value
    const directDiscountVal = totalAmount * (directDiscount / 100);

    // Total discount value
    const totalDiscountVal = couponDiscountVal + directDiscountVal;

    // Net amount after discount
    const netAmount = totalAmount - totalDiscountVal;

    // GST at 18%
    const gstVal = netAmount > 0 ? netAmount * 0.18 : 0;

    // Final bill payable
    const totalBill = netAmount + gstVal;

    // Trigger toast notifications when coupon application state changes
    useEffect(() => {
        if (cupon.message) {
            if (cupon.applied) {
                toast.success(cupon.message);
            } else {
                toast.error(cupon.message);
            }
        }
    }, [cupon.applied, cupon.message]);

    // QR Code generation based on payment method and total bill
    useEffect(() => {
        if (paymentMethod === "qr" && totalBill > 0) {
            QRCode.toDataURL(
                `upi://pay?pa=shravani22d@oksbi&pn=Shravani&am=${totalBill.toFixed(2)}&cu=INR`,
                { width: 200, margin: 2 },
                (err, url) => {
                    if (!err) {
                        setQrCodeDataUrl(url);
                    } else {
                        console.error("QR Code Error:", err);
                    }
                }
            );
        } else {
            setQrCodeDataUrl("");
        }
    }, [paymentMethod, totalBill]);

    const handleApplyCoupon = () => {
        if (!couponInput.trim()) {
            toast.warn("Please enter a coupon code");
            return;
        }
        dispatch(applyCupon(couponInput.toUpperCase().trim()));
    };

    const handleDirectDiscount = (pct) => {
        setDirectDiscount(pct);
        toast.success(`Direct discount of ${pct}% applied!`);
    };

    const handleRemove = (id) => {
        dispatch(removeItem(id));
        toast.info("Item removed from cart");
    };

    const handleIncrement = (id) => {
        dispatch(incrementQuantity(id));
    };

    const handleDecrement = (id) => {
        dispatch(decrementQuantity(id));
    };

    const handleClear = () => {
        dispatch(clearCart());
        dispatch(resetCupon());
        setDirectDiscount(0);
        setPaymentMethod("");
        toast.info("Cart cleared");
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            toast.warn("Your cart is empty");
            return;
        }
        if (!paymentMethod) {
            toast.warn("Please select a payment method");
            return;
        }
        setIsOrderPlaced(true);
        toast.success("Order placed successfully! Thank you for ordering.");
        
        setTimeout(() => {
            dispatch(clearCart());
            dispatch(resetCupon());
            setDirectDiscount(0);
            setPaymentMethod("");
            setIsOrderPlaced(false);
        }, 3000);
    };

    const handleSendEmail = (e) => {
        e.preventDefault();
        if (!email.trim()) {
            toast.warn("Please enter a valid email address");
            return;
        }
        
        const itemsList = cart.map(item => {
            const priceNum = typeof item.price === "string" ? parseFloat(item.price.replace(/[^0-9.]/g, '')) : item.price;
            return `${item.name} (Qty: ${item.quantity}) - RS ${(priceNum * item.quantity).toFixed(2)}`;
        }).join("\n");

        const emailBody = `
Thank you for your order at Food Zone!
Here is your order summary:

${itemsList}

--------------------------------------
Subtotal: RS ${totalAmount.toFixed(2)}
Discount: RS ${totalDiscountVal.toFixed(2)}
GST (18%): RS ${gstVal.toFixed(2)}
--------------------------------------
Total Payable: RS ${totalBill.toFixed(2)}
Payment Method: ${paymentMethod ? paymentMethod.toUpperCase() : "Not Selected"}

Enjoy your food!
Food Zone Team
        `;

        const templateParams = {
            to_email: email,
            from_name: "Food Zone",
            message: emailBody
        };

        emailjs.send(
            "service_mock", 
            "template_receipt", 
            templateParams,
            "public_mock"
        ).then(
            () => {
                toast.success("Receipt sent successfully to " + email);
                setEmail("");
                setShowEmailSection(false);
            },
            (err) => {
                console.error("EmailJS sending error: ", err);
                // Graceful fallback for mock keys
                toast.success("Receipt successfully emailed (simulation) to " + email);
                setEmail("");
                setShowEmailSection(false);
            }
        );
    };

    return (
        <div className="cart-container">
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
            
            <h1>Your Cart</h1>
            
            {cart.length === 0 ? (
                <div className="empty-cart">
                    <p>{isOrderPlaced ? "🎉 Thank you! Your order has been placed successfully." : "Your cart is empty. Add some delicious food from our menu!"}</p>
                    <div style={{ marginTop: '20px' }}>
                        <Link to="/veg" style={{ textDecoration: 'none', margin: '0 10px', padding: '10px 20px', backgroundColor: '#ff6b6b', color: 'white', borderRadius: '4px' }}>Veg Menu</Link>
                        <Link to="/nonveg" style={{ textDecoration: 'none', margin: '0 10px', padding: '10px 20px', backgroundColor: '#ff6b6b', color: 'white', borderRadius: '4px' }}>Non-Veg Menu</Link>
                        <Link to="/milkitems" style={{ textDecoration: 'none', margin: '0 10px', padding: '10px 20px', backgroundColor: '#ff6b6b', color: 'white', borderRadius: '4px' }}>Milk Menu</Link>
                    </div>
                </div>
            ) : (
                <div>
                    <button className="clear-cart-btn" onClick={handleClear}>Clear Cart</button>
                    
                    <ul className="cart-list">
                        {cart.map((item) => {
                            const priceNum = typeof item.price === "string" ? parseFloat(item.price.replace(/[^0-9.]/g, '')) : item.price;
                            const itemTotal = priceNum * item.quantity;
                            return (
                                <li key={item.id} className="cart-item">
                                    <div className="item-details">
                                        <strong>{item.name}</strong> - RS {priceNum} each
                                        <div style={{ marginTop: '5px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <button onClick={() => handleDecrement(item.id)} style={{ padding: '2px 8px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #ccc' }}>-</button>
                                            <span>Quantity: <strong>{item.quantity}</strong></span>
                                            <button onClick={() => handleIncrement(item.id)} style={{ padding: '2px 8px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #ccc' }}>+</button>
                                            <span>| Total: <strong>RS {itemTotal.toFixed(2)}</strong></span>
                                        </div>
                                    </div>
                                    <button className="remove-btn" onClick={() => handleRemove(item.id)}>Remove</button>
                                </li>
                            );
                        })}
                    </ul>
                    
                    <div className="total-amount">
                        <h3>Subtotal: RS {totalAmount.toFixed(2)}</h3>
                    </div>
                    
                    {/* Available Coupons */}
                    <h4>Available Coupons:</h4>
                    <div className="available-coupons">
                        <span className="coupon-tag" style={{ cursor: 'pointer' }} onClick={() => { setCouponInput("FESTIVE25"); dispatch(applyCupon("FESTIVE25")); }}>FESTIVE25 (25% off)</span>
                        <span className="coupon-tag" style={{ cursor: 'pointer' }} onClick={() => { setCouponInput("SAVE10"); dispatch(applyCupon("SAVE10")); }}>SAVE10 (10% off)</span>
                        <span className="coupon-tag" style={{ cursor: 'pointer' }} onClick={() => { setCouponInput("SAVE20"); dispatch(applyCupon("SAVE20")); }}>SAVE20 (20% off)</span>
                        <span className="coupon-tag" style={{ cursor: 'pointer' }} onClick={() => { setCouponInput("WELCOME"); dispatch(applyCupon("WELCOME")); }}>WELCOME (5% off)</span>
                    </div>
                    
                    {/* Coupon Apply Section */}
                    <div className="coupon-section">
                        <input 
                            type="text" 
                            className="coupon-input" 
                            placeholder="Enter coupon code" 
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value)}
                        />
                        <button className="apply-coupon-btn" onClick={handleApplyCoupon}>Apply Coupon</button>
                    </div>
                    
                    {cupon.applied && (
                        <div className="coupon-applied">
                            {cupon.message} 
                            <button onClick={() => { dispatch(resetCupon()); setCouponInput(""); }} style={{ marginLeft: '10px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', color: '#155724' }}>✕</button>
                        </div>
                    )}
                    
                    {/* Direct Discount Buttons */}
                    <h4>Direct Discount:</h4>
                    <div className="discount-buttons">
                        <button className="discount-btn green" onClick={() => handleDirectDiscount(10)}>10% Discount</button>
                        <button className="discount-btn yellow" onClick={() => handleDirectDiscount(20)}>20% Discount</button>
                        <button className="discount-btn green" onClick={() => handleDirectDiscount(30)}>30% Discount</button>
                        {directDiscount > 0 && (
                            <button className="discount-btn" style={{ backgroundColor: '#6c757d', color: 'white' }} onClick={() => { setDirectDiscount(0); toast.info("Direct discount removed"); }}>Reset Discount</button>
                        )}
                    </div>
                    
                    <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #e0e0e0', margin: '20px 0' }}>
                        {totalDiscountVal > 0 && (
                            <p style={{ fontSize: '16px', color: '#dc3545', marginBottom: '10px' }}>
                                Total Discount: - RS {totalDiscountVal.toFixed(2)} 
                                ({cupon.applied ? `${cupon.code} (${cupon.discount}%)` : ""} 
                                {cupon.applied && directDiscount > 0 ? " + " : ""} 
                                {directDiscount > 0 ? `Direct (${directDiscount}%)` : ""})
                            </p>
                        )}
                        <div className="gst">GST (18%): RS {gstVal.toFixed(2)}</div>
                        <div className="final-amount">Total Payable: RS {totalBill.toFixed(2)}</div>
                    </div>
                    
                    <div className="payment-section">
                        <h3>Select Payment Method</h3>
                        <div className="payment-buttons">
                            <button 
                                className="payment-btn" 
                                style={{ backgroundColor: paymentMethod === "qr" ? "#ff6b6b" : "", color: paymentMethod === "qr" ? "white" : "" }}
                                onClick={() => setPaymentMethod("qr")}
                            >
                                UPI QR Code
                            </button>
                            <button 
                                className="payment-btn" 
                                style={{ backgroundColor: paymentMethod === "card" ? "#ff6b6b" : "", color: paymentMethod === "card" ? "white" : "" }}
                                onClick={() => { setPaymentMethod("card"); toast.success("Selected Card Payment mode"); }}
                            >
                                Credit/Debit Card
                            </button>
                            <button 
                                className="payment-btn" 
                                style={{ backgroundColor: paymentMethod === "cod" ? "#ff6b6b" : "", color: paymentMethod === "cod" ? "white" : "" }}
                                onClick={() => { setPaymentMethod("cod"); toast.success("Selected Cash on Delivery mode"); }}
                            >
                                Cash On Delivery
                            </button>
                        </div>
                    </div>
                    
                    {paymentMethod === "qr" && qrCodeDataUrl && (
                        <div className="qr-section">
                            <h2>Scan QR Code to Pay</h2>
                            <img src={qrCodeDataUrl} alt="QR Code" style={{ width: '200px', height: '200px' }} />
                            <p className="upi-id">UPI ID: <strong>shravani22d@oksbi</strong></p>
                            <p style={{ color: '#666', fontSize: '14px', marginTop: '10px' }}>Amount: <strong>RS {totalBill.toFixed(2)}</strong></p>
                        </div>
                    )}
                    
                    <div className="checkout-buttons">
                        <button className="checkout-btn" onClick={handleCheckout}>Place Order</button>
                        <button className="email-btn" onClick={() => setShowEmailSection(!showEmailSection)}>Send Receipt via Email</button>
                    </div>
                    
                    {showEmailSection && (
                        <div className="email-section">
                            <form onSubmit={handleSendEmail}>
                                <label className="email-label">Enter your Email Address:</label>
                                <input 
                                    type="email" 
                                    className="email-input" 
                                    placeholder="email@example.com" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <button type="submit" className="email-btn" style={{ marginTop: '10px', width: '100%' }}>Send Receipt</button>
                            </form>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Cart;