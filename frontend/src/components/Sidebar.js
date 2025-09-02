import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaUserTie, FaGamepad, FaMoneyBillWave, FaCreditCard, FaShieldAlt, FaChartBar } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { auth } = useAuth();

  const menuItems = [
    { path: '/dashboard', icon: <FaTachometerAlt />, label: 'Dashboard' },
    { path: '/users', icon: <FaUsers />, label: 'User Management' },
    { path: '/agents', icon: <FaUserTie />, label: 'Agent Management' },
    { path: '/games', icon: <FaGamepad />, label: 'Game Management' },
    ...(auth?.type === 'superadmin' ? [
      { path: '/transactions', icon: <FaMoneyBillWave />, label: 'Transactions' },
      { path: '/payment-gateway', icon: <FaCreditCard />, label: 'Payment Gateway Management' }
    ] : []),
    { path: '/security', icon: <FaShieldAlt />, label: 'Security' },
    { path: '/reports', icon: <FaChartBar />, label: 'Reports & Analytics' }
  ];

  return (
    <div className="sidebar">
      <ul>
        {menuItems.map((item) => (
          <li key={item.path}>
            <NavLink 
              to={item.path} 
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              {item.icon}
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;