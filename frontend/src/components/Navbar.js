import React, { useState } from 'react';
import { FaUserCircle, FaCog, FaLock, FaTicketAlt, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import AccountModal from './AccountModal';
import PasswordModal from './PasswordModal';
import TicketsModal from './TicketsModal';

const Navbar = () => {
  const { auth, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showTicketsModal, setShowTicketsModal] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/images/logo.png" alt="Logo" className="logo" />
        <span className="app-name">GOODLUCK Casino</span>
      </div>
      <div className="navbar-center">ADMIN PANEL</div>
      <div className="navbar-right">
        <div className="admin-info" onClick={() => setShowDropdown(!showDropdown)}>
          <span>{auth?.name}</span>
          <FaUserCircle className="admin-icon" />
        </div>
        {showDropdown && (
          <div className="dropdown">
            <div className="dropdown-header">
              <img src={`/images/${auth?.photo}`} alt="Admin" />
              <div>
                <div>{auth?.name}</div>
                <div>{auth?.type}</div>
              </div>
            </div>
            <div className="dropdown-item" onClick={() => { setShowAccountModal(true); setShowDropdown(false); }}>
              <FaCog /> Account Setting
            </div>
            <div className="dropdown-item" onClick={() => { setShowPasswordModal(true); setShowDropdown(false); }}>
              <FaLock /> Change Password
            </div>
            <div className="dropdown-item" onClick={() => { setShowTicketsModal(true); setShowDropdown(false); }}>
              <FaTicketAlt /> Tickets
            </div>
            <div className="dropdown-item logout" onClick={logout}>
              <FaSignOutAlt /> Logout
            </div>
          </div>
        )}
      </div>
      {showAccountModal && <AccountModal onClose={() => setShowAccountModal(false)} />}
      {showPasswordModal && <PasswordModal onClose={() => setShowPasswordModal(false)} />}
      {showTicketsModal && <TicketsModal onClose={() => setShowTicketsModal(false)} />}
    </nav>
  );
};

export default Navbar;