import React, { useState } from 'react';
import { FaBell, FaSearch, FaBars } from 'react-icons/fa';

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    // This would actually toggle the sidebar visibility in a real implementation
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.classList.toggle('-translate-x-full');
    }
  };

  return (
    <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar} 
          className="md:hidden p-2 rounded-md hover:bg-gray-100 cursor-pointer"
          aria-label="Toggle sidebar"
        >
          <FaBars className="text-gray-600" />
        </button>
        <div className="relative ml-4 md:ml-0">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FaSearch className="text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Search incidents, locations..."
            className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent box-border w-full md:w-64"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100 relative cursor-pointer" aria-label="Notifications">
          <FaBell className="text-gray-600" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            EO
          </div>
          <span className="hidden md:inline-block font-medium">Emergency Operator</span>
        </div>
      </div>
    </header>
  );
}