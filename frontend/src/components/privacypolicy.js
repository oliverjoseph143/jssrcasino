 import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";  
import "./privacypolicy.css";
import privacyImg from "../asserts/privacypolicy.jpg";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div
      className="privacy-container"
      style={{ backgroundImage: `url("${privacyImg}")` }}
    >
      <button className="back-btn" onClick={() => navigate("/")}>
        <FaArrowLeft className="back-icon" />
      </button>
      <div className="privacy-card">
        <h1 className="privacy-main-title">PRIVACY POLICY</h1>
        <div className="privacy-section">
          <h2>1. Introduction</h2>
          <p>
            Welcome to <strong style={{ color: "#198754" }}>Good Luck Casino</strong>.  
            We are committed to protecting and respecting your privacy. This
            Privacy Policy explains how we collect, use, and safeguard your
            personal data when you use our platform.
          </p>
        </div>
        <div className="privacy-section">
          <h2>2. What Information We Collect</h2>
          <p>
            Identity Information: Full name, DOB, government-issued ID <br />
            Contact Information: Email, phone, address <br />
            Account Information: Username, encrypted password, gameplay data <br />
            Payment Data: Bank details, wallet balance, transactions <br />
            Device Data: IP address, browser, OS, device ID <br />
            Location Data: IP/GPS (with permission) <br />
            Cookies & Session Data: Logs, interaction history
          </p>
        </div>
        <div className="privacy-section">
          <h2>3. How We Collect It</h2>
          <p>
            When you register an account <br />
            When you deposit/withdraw funds <br />
            When contacting support <br />
            Through cookies & analytics <br />
            From KYC providers & payment processors
          </p>
        </div>
        <div className="privacy-section">
          <h2>4. How We Use Your Information</h2>
          <p>
            Manage your account securely <br />
            Process deposits & withdrawals <br />
            Detect/prevent fraud & suspicious activity <br />
            Send important notifications (password resets, results) <br />
            Deliver offers & loyalty rewards (opt-out anytime) <br />
            Improve user experience & comply with laws
          </p>
        </div>
        <div className="privacy-section">
          <h2>5. Sharing Your Information</h2>
          <p>
            With payment providers (Stripe, Razorpay, etc.) <br />
            With regulators if required by law <br />
            With fraud prevention agencies <br />
            With analytics & cloud hosting partners
          </p>
        </div>

        <div className="privacy-section">
          <h2>6. Marketing Preferences</h2>
          <p>
            Receive bonus offers, game updates & VIP perks <br />
            You can unsubscribe anytime via profile settings <br />
            Email:{" "}
            <a href="mailto:support@goodluckcasino.com">
              support@goodluckcasino.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;