import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../UserContext';
import { FaUser, FaShoppingBag, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { loggedInUser, cartCount, updateUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation(); 

  const handleLogout = () => {
    updateUser('', null);
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const handleScroll = (sectionId) => {
    if (location.pathname !== '/') {
      // Navigate to home and scroll after navigation
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100); // Small delay for smooth transition
    } else {
      // Already on home page, just scroll
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false); // Close mobile menu
  };

  const handleHomeClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
    } else {
      navigate('/'); // Redirect to Home
    }
    setIsOpen(false); // Close mobile menu after clicking
  };

  return (
    <>
    <div className="bg-beige-100 border-b border-gray-50 px-6 fixed top-0 left-0 w-full z-50 shadow-md lg:px-20">
      <div className="container mx-auto">
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}<h1><button onClick={handleHomeClick} className="text-3xl font-playball text-primary-600">
                Golden<span className="text-gray-900">Hour</span>
              </button></h1>

          {/* Toggle Button for Mobile */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden px-3 py-2">
            <FaBars className="text-primary-600 text-xl" />
          </button>

          {/* Navbar Links */}
          <div className={`lg:flex space-x-8 ${isOpen ? 'block' : 'hidden'} lg:block`}>
          <button onClick={handleHomeClick} className="text-lg font-semibold text-gray-900 hover:text-primary-600">
                Home
              </button>
            <button onClick={() => handleScroll('about')} className="text-lg font-semibold text-gray-900 hover:text-primary-600">
                About
              </button>
              <button onClick={() => handleScroll('services')} className="text-lg font-semibold text-gray-900 hover:text-primary-600">
                Services
              </button>
              <button onClick={() => handleScroll('contact')} className="text-lg font-semibold text-gray-900 hover:text-primary-600">Contact</button>
          </div>

          {/* Icons Section */}
          <div className="flex space-x-6 items-center">
            <Link to="/cart" className="relative">
              <FaShoppingBag className="text-gray-900 text-xl hover:text-primary-600" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            {loggedInUser ? (
              <button onClick={handleLogout}>
                <FaSignOutAlt className="text-gray-900 text-xl hover:text-primary-600" />
              </button>
            ) : (
              <Link to="/login">
                <FaUser className="text-gray-900 text-xl hover:text-primary-600" />
              </Link>
            )}
          </div>
        </nav>
      </div>
    </div>
     <div className="pt-16"></div>
     </>
  );
}
