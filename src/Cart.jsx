import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeItem } from "./CartSlice";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { applyCupon, resetCupon } from "./CuponSlice.js";
import QRCode from "qrcode"; // Different package
import emailjs from "@emailjs/browser";
import "react-toastify/dist/ReactToastify.css";
import "./Cart.css";
import { Link } from "react-router-dom";

function Cart() {
    // ... all your existing state and calculations ...

    const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");

    useEffect(() => {
        if (paymentMethod === "qr") {
            // Generate QR code as data URL
            QRCode.toDataURL(`upi://pay?pa=shravani22d@oksbi&pn=Shravani&am=${totalBill.toFixed(2)}&cu=INR`, {
                width: 200,
                margin: 2
            }, (err, url) => {
                if (!err) {
                    setQrCodeDataUrl(url);
                }
            });
        }
    }, [paymentMethod, totalBill]);

    // ... rest of your code ...

    return (
        <div className="cart-container">
            {/* ... all your existing JSX ... */}

            {/* QR Code Display - Updated for qrcode package */}
            {paymentMethod === "qr" && qrCodeDataUrl && (
                <div className="qr-section">
                    <h2>Scan QR Code to Pay</h2>
                    <img src={qrCodeDataUrl} alt="QR Code" style={{ width: '200px', height: '200px' }} />
                    <p className="upi-id">UPI ID: shravani22d@oksbi</p>
                </div>
            )}

            {/* ... rest of your JSX ... */}
        </div>
    );
}

export default Cart;