import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-beige-100 border-b border-gray-50 px-6 lg:px-16">
      <div className="container mx-auto">
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <a href="/" className="font-playball font-bold text-3xl text-primary-600">
            Sugar<span className="text-gray-900">Rush</span>
          </a>

          {/* Toggle Button for Mobile */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden px-3 py-2">
            <i className="fa fa-bars text-primary-600 text-xl"></i>
          </button>

          {/* Navbar Links - Added Left Padding */}
          <div className={`lg:flex space-x-8 ${isOpen ? 'block' : 'hidden'} lg:block`}>
            <a href="#home" className="nav-item text-lg font-semibold text-gray-900 hover:text-primary-600">Home</a>
            <a href="#about" className="nav-item text-lg font-semibold text-gray-900 hover:text-primary-600">About</a>
            <a href="#services" className="nav-item text-lg font-semibold text-gray-900 hover:text-primary-600">Services</a>
            <a href="#contact" className="nav-item text-lg font-semibold text-gray-900 hover:text-primary-600">Contact</a>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
