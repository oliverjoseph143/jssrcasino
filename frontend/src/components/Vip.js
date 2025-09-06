 import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 
import "./Vip.css";
import bgImage from "../asserts/Vip.jpg"; 

const Vip = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div
      className="vip-page"
      style={{ backgroundImage: `url(${bgImage})` }}>
      <button className="back-button-outside" onClick={goHome}>
        <FaArrowLeft />
      </button>

      <div className="vip-card">
        <h2 className="vip-title">
          <i className="bi bi-crown-fill" /> Become a <span>VIP Member</span>
        </h2>
        <p className="vip-subtitle">
          Top customers get qualified for <strong>VIP member!</strong>
        </p>
        <div className="benefits-box mt-4">
          <h3 className="randy">Benefits & Rewards</h3>
          <p>
            Deposit more, play more to qualify! Become a VIP member,
            <br /> contact customer support to know more.
          </p>
          <div className="row mt-4">
            <div className="col-md-4">
              <div className="benefit-icon">
                <i className="bi bi-gift-fill" />
              </div>
              <div className="benefit-text">Special Bonuses</div>
            </div>
            <div className="col-md-4">
              <div className="benefit-icon">
                <i className="bi bi-cash-coin" />
              </div>
              <div className="benefit-text">Fastest Withdrawals</div>
            </div>
            <div className="col-md-4">
              <div className="benefit-icon">
                <i className="bi bi-headset" />
              </div>
              <div className="benefit-text">Dedicated Manager</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vip;
