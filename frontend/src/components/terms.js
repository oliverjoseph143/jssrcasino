import React from "react";
import "./terms.css";
import termsImage1 from "../asserts/Terms.jpg";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Terms = () => {
  const navigate = useNavigate(); 
  return (
    <div
      className="terms-container"
      style={{ backgroundImage: `url("${termsImage1}")` }}
    >
      <button className="back-btn" onClick={() => navigate("/")}>
        <FaArrowLeft className="back-icon" /> 
      </button>
      <div className="terms-card">
        <h1 className="terms-main-title">TERMS & CONDITIONS</h1>

        <section className="tnc-section">
          <h2>1. Introduction</h2>
          <p>
            Welcome to <strong style={{color:"gold"}}>GoodLuck Casino</strong>. 
            By creating an account or using our platform, you agree to follow these Terms & Conditions, 
            along with our Privacy Policy. These terms ensure fair play, safe transactions, and responsible gaming.  
            If you do not agree with any part of these Terms, please stop using our services immediately.
          </p> 
        </section>

        <section className="tnc-section">
          <h2>2. Eligibility & Accounts</h2>
          <p>You must be at least 18 years old (or the legal age in your region).</p>
          <p>
            Each player is allowed only <strong>one account</strong>. Do not
            share, transfer, or sell your login details.
          </p>
          <p>
            We may suspend or close accounts if fraud, illegal activity, or
            abuse is suspected.
          </p>
        </section>

        <section className="tnc-section">
          <h2>3. Deposits & Withdrawals</h2>
          <p>All deposits must be made using approved and legal payment methods.</p>
          <p>
            Withdrawals require <strong>KYC verification</strong> (valid ID,
            payment details, or proof of address).
          </p>
          <p>
            Deposits must be wagered at least once before withdrawal unless
            stated otherwise in promotional terms.
          </p>
        </section>

        <section className="tnc-section">
          <h2>4. Fair Play & Responsible Gaming</h2>
          <p>
            All games are run fairly using certified Random Number Generators
            (RNG). Cheating, collusion, or use of unauthorized tools is strictly
            prohibited.
          </p>
          <p>
            GoodLuck Casino promotes <strong>responsible gaming</strong>. Please
            set your own spending limits and seek support if gambling becomes a
            problem.
          </p>
        </section>

        <section className="tnc-section">
          <h2>5. Inactive Accounts</h2>
          <p>
            Accounts with no activity for more than 6 months may be suspended or
            closed. A maintenance fee may apply to dormant accounts with a
            remaining balance.
          </p>
          <p>You can request account closure anytime by contacting support.</p>
        </section>

        <section className="tnc-section">
          <h2>6. Data Protection & Privacy</h2>
          <p>
            We value your privacy. Personal data is processed securely and only
            used in line with our <strong>Privacy Policy</strong>.
          </p>
          <p>
            While we take strong measures to protect your information, we cannot
            guarantee complete security against online threats.
          </p>
        </section>

        <section className="tnc-section">
          <h2>7. Customer Support</h2>
          <p>
            Our support team is here to help you. For any questions, issues, or
            complaints, contact us at{" "}
            <a href="mailto:support@goodluckcasino.com">
              support@goodluckcasino.com
            </a>{" "}
            or use our live chat service.
          </p>
        </section>

        <section className="tnc-section">
          <h2>8. Updates to Terms</h2>
          <p>
            GoodLuck Casino reserves the right to update or change these Terms &
            Conditions at any time. Players will be notified of major updates,
            and continued use of the platform means acceptance of the changes.
          </p>
        </section>

        <section className="tnc-section">
          <h2>9. Governing Law</h2>
          <p>
            These Terms & Conditions are governed by the laws of your
            jurisdiction. In case of disputes, the matter will be resolved under
            the appropriate legal authority.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;