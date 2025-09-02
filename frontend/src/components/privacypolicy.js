 import React from 'react';
import './privacypolicy.css';

//import privacyImg from '../../public/images/Caribbean.png';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      
    

      <div className="privacy-right">
        <h1 className="privacy-title">PRIVACY POLICY</h1>

        <div className="privacy-content">
          <h2>1. Introduction</h2>
          <p>
            Welcome to Good Luck Casino (“we”, “our”, “us”). We are committed to
            protecting and respecting your privacy. This Privacy Policy explains
            how we collect, use, and safeguard your personal data when you visit
            or use our platform.
          </p>
          <p>
            By accessing or using Good Luck Casino, you consent to the
            collection and use of your information as described in this Privacy
            Policy.
          </p>

          <h2>2. What Information We Collect</h2>
          <p>
            Identity Information: Full name, date of birth, gender,
            government-issued ID <br />
            Contact Information: Email address, mobile number, physical address <br />
            Account Information: Username, encrypted password, preferences,
            gameplay activity <br />
            Payment Data: Bank details, transaction history, wallet balance <br />
            Device/Technical Data: IP address, browser type, OS, device ID <br />
            Location Data: Based on IP or GPS (with permission) <br />
            Cookies & Session Data: Visit logs, interaction history
          </p>

          <h2>3. How We Collect It</h2>
          <p>
            When you register an account <br />
            When you make a deposit or withdrawal <br />
            When you contact support <br />
            Through cookies & analytics <br />
            From third-party identity verifiers (KYC, anti-fraud) <br />
            From payment processors & marketing partners
          </p>

          <h2>4. How We Use Your Information</h2>
          <p>
            Create and manage your account <br />
            Enable deposits, withdrawals & secure transactions <br />
            Detect and prevent fraud or suspicious activity <br />
            Send important updates (emails, results, password resets) <br />
            Deliver promotions & bonuses (opt-out available) <br />
            Improve site performance & user experience <br />
            Fulfill legal & regulatory obligations
          </p>

          <h2>5. Sharing Your Information</h2>
          <p>
            With payment gateways (Razorpay, Stripe, etc.) <br />
            With regulators if legally required <br />
            With fraud detection agencies <br />
            With analytics & marketing partners <br />
            With cloud hosting providers
          </p>

          <h2>6. Marketing Preferences</h2>
          <p>
            Bonuses & cashback offers <br />
            New games & tournament updates <br />
            Casino news & VIP loyalty perks <br />
            Opt-out anytime via email unsubscribe or profile settings <br />
            Email:{" "}
            <a href="mailto:support@goodluckcasino.com">
              support@goodluckcasino.com
            </a>
          </p>

          <h4 className="privacy-footer">
            By using our platform, you agree to our Privacy Policy.
          </h4>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
