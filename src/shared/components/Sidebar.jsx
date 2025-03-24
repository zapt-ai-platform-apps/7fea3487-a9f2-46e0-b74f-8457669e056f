import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaMap, FaExclamationTriangle, FaCog } from 'react-icons/fa';

export default function Sidebar() {
  return (
    <div className="sidebar bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out z-20">
      <div className="flex items-center space-x-4 px-6">
        <div className="bg-blue-600 p-2 rounded-full">
          <FaExclamationTriangle className="text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold">SitAware</h2>
          <p className="text-xs text-gray-400">Situational Awareness Tool</p>
        </div>
      </div>
      
      <nav className="mt-6">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `flex items-center space-x-4 px-6 py-3 rounded transition-colors ${
              isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
            }`
          }
          end
        >
          <FaHome className="text-lg" />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink 
          to="/map" 
          className={({ isActive }) => 
            `flex items-center space-x-4 px-6 py-3 rounded transition-colors ${
              isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
            }`
          }
        >
          <FaMap className="text-lg" />
          <span>Map View</span>
        </NavLink>
        
        <NavLink 
          to="/threats" 
          className={({ isActive }) => 
            `flex items-center space-x-4 px-6 py-3 rounded transition-colors ${
              isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
            }`
          }
        >
          <FaExclamationTriangle className="text-lg" />
          <span>Threat Analysis</span>
        </NavLink>
        
        <NavLink 
          to="/settings" 
          className={({ isActive }) => 
            `flex items-center space-x-4 px-6 py-3 rounded transition-colors ${
              isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
            }`
          }
        >
          <FaCog className="text-lg" />
          <span>Settings</span>
        </NavLink>
      </nav>
    </div>
  );
}