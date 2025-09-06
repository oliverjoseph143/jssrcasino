 import React from "react";
import AboutGirlImg from "../asserts/AboutImg.png";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="AboutUsSection">
      {/* Title */}
      <div className="About-title">
        SIGN UP TO GOODLUCK <span className="Gold">CASINO</span> TODAY
        <div className="About-subtitle">ABOUT US</div>
      </div>

      {/* Hero Section */}
      <div className="hero-with-rays">
        <div className="rays-layer"></div>

        <div className="flexbox">
          {/* Left Card */}
          <div className="feature-card left">
            <h4>🎰 Instant Withdrawals</h4>
            <p>Get the fastest withdrawals directly to your bank account.</p>
          </div>

          {/* Middle Image */}
          <div className="girl-img">
            <img src={AboutGirlImg} alt="About Us" />
          </div>

          {/* Right Card */}
          <div className="feature-card right">
            <h4>💰 100% First Deposit Bonus</h4>
            <p>Get 100% more up to INR 1,00,000 on your first deposit.</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="Main-Content">
        <div className="center-title">Best Online Gaming Website</div>
        <div className="About-paragraph">
          Goodluck Casino has been the preferred destination for passionate
          online players for many years. Our wide selection of casino games
          attracts enthusiasts who enjoy exploring a variety of experiences in
          one convenient place. Players can dive into popular titles such as
          Blackjack, Poker, Slots, Roulette, Baccarat, Crash, and more. We
          provide a platform where you can enjoy your favourite games, test your
          luck, and walk away with exciting cash prizes.
          <br /><br />
          Every new player is welcomed with a generous 100% bonus on their first
          deposit. You’ll also benefit from seasonal promotions, exclusive
          rewards, and weekly cashback offers. Goodluck Casino ensures
          non-stop entertainment while maintaining a safe, fair, and secure
          environment.
        </div>
      </div>

      {/* Two Column Info Section */}
      <div className="flexbox2">
        <div className="box1">
          <h4 className="center-title">Our Values</h4>
          At GoodLuckCasino, we encourage a safe and entertaining gaming
          environment. We promote fair play with a certified RNG system and
          guarantee security in every transaction.
        </div>

        <div className="box2">
          <h4 className="center-title">Our History</h4>
          GoodLuckCasino has been the top choice for online gamers for years,
          offering both traditional and modern casino games with world-class
          service.
        </div>
      </div>
    </div>
  );
};

export default AboutUs;