import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import { BASE_URL } from '../constants/constants';
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addToCart } from '../utils/api';
import { FaMugHot } from 'react-icons/fa';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { loggedInUser, token, updateCartCount } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/products/all`);
        setServices(response.data || []);
      } catch (error) {
        setError('Failed to load watches.');
        setServices([]);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleAddToCart = async (watchId) => {
    if (!loggedInUser) {
      toast.error('Please log in to add items to your cart.');
      navigate('/login');
      return;
    }

    try {
      await addToCart(watchId, token);
      toast.success('Item added to cart!');
      updateCartCount(1);
    } catch (error) {
      toast.error('Failed to add item to cart.');
    }
  };

  if (loading) return <Spinner />;
  if (error) return <div className="container py-16 text-center text-golden text-xl">{error}</div>;

  return (
    <section id="services">
      <div className="pt-20 bg-beige-100 px-6 lg:px-20">
        <div className="container mx-auto">
          <div className="text-center">
            <span className="inline-block font-semibold text-[#603813] text-sm bg-[#F5DFCA] border border-[#603813] rounded-full px-4 py-1 mb-3">
              OUR SERVICES
            </span>
            <h1 className="text-4xl font-playball text-[#603813] mb-10">What We Offer</h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <div
                key={service._id}
                className="relative bg-white rounded-xl shadow-lg px-5 py-8 text-center overflow-hidden transition-all duration-700 ease-in-out group flex flex-col min-h-[320px]"
              >
                {/* Hover Background Animation */}
                <div className="absolute top-0 left-0 w-full h-0 bg-yellow-500 transition-all duration-700 ease-in-out group-hover:h-full"></div>

                <div className="relative z-10 flex flex-col items-center flex-grow">
                  <FaMugHot className="text-8xl mb-4 transition-all duration-500 group-hover:text-yellow-800 text-yellow-600" />
                  <h4 className="text-2xl font-semibold mb-2 transition-all duration-500 group-hover:text-gray-800">
                    {service.name}
                  </h4>
                  <p className="text-base text-gray-600 transition-all duration-500 group-hover:text-white h-16 overflow-hidden">
                    {service.description}
                  </p>

                  {/* Price and Add to Cart Section */}
                  <div className="mt-auto w-full flex justify-between items-center px-2">
                    {/* Price on the Left */}
                    <span className="text-lg font-semibold text-yellow-700 group-hover:text-white transition-all duration-500">
                    ₹{service.price}
                    </span>

                    {/* Add to Cart Button on the Right */}
                    <button
                      onClick={() => handleAddToCart(service._id)}
                      className="bg-gradient-to-r from-yellow-600 to-yellow-800 text-white text-sm font-medium px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 ease-in-out group-hover:bg-white hover:scale-105"
                    >
                      Buy Now!
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;