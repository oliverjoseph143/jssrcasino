 import React from 'react';
import './disconnectionpolicy.css';
import disconnectImg from "../asserts/disco.jpg";
import { useNavigate } from 'react-router-dom';

export default function DisconnectionPolicy() {
  const navigate = useNavigate();

  return (
    <div 
      className="bg-dark text-light min-vh-100 d-flex flex-column policy-page"
      style={{ backgroundImage:`url(${disconnectImg})` }}
    >
      {/* Overlay */}
      <div className="overlay"></div>

      {/* Back Button - Top Left */}
      <button 
        className="btn btn-success back-btn"
        onClick={() => navigate(-1)}
      >
        ←
      </button>

      {/* Header */}
      <header className="py-5 text-center position-relative">
        <div className="container">
          <h1 className="display-6 fw-bold policy-title">DISCONNECTION POLICY</h1>
        </div>
      </header>

      {/* Content inside a Card */}
      <main className="flex-grow-1 position-relative">
        <div className="container pb-5">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="card policy-card bg-dark bg-opacity-75 text-light p-4">
                <p className="lead mb-4">
                  Communication problems over the internet may cause sudden disconnection to the gameplay.
                  GoodLuckCasino is committed to protect our players from unjustifiable loss while eliminating
                  the possibility of intentional disconnection and system abuse.
                </p>

                <p className="mb-4">
                  As we cannot guarantee uninterrupted connection due to factors such as poor reception or
                  weak internet connections, our software has been designed to cope with such situations.
                  Kindly read and understand the following disconnection policy:
                </p>

                <ol className="policy-list">
                  <li>
                    Players must accept the risk of disconnection and should attempt to log back in and continue
                    playing as quickly as possible. Check with your Internet Service Provider about how to reduce
                    the risk of disconnection.
                  </li>
                  <li>
                    Should disconnection occur before a bet is placed successfully, the bet will not be valid.
                  </li>
                  <li>
                    Should disconnection occur after a bet is placed successfully, the bet will be valid and results
                    will be determined by the gameplay. After reconnecting, the results will be shown in the game
                    history table.
                  </li>
                  <li>
                    Players may contact Customer Service to verify placed bet and game results but will not in any
                    way alter the results of the bet.
                  </li>
                  <li>
                    Should players experience continuous interruptions to the gameplay, please contact Customer
                    Service for further investigation.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}