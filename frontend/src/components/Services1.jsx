import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaMugHot } from 'react-icons/fa';
import { BASE_URL } from '../constants/constants';
import { useUser } from '../UserContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../utils/api';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { loggedInUser, token, updateCartCount } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/services`);
        setServices(response.data || []);
      } catch (error) {
        setError('Failed to load services.');
        setServices([]);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleAddToCart = async (serviceId) => {
    if (!loggedInUser) {
      toast.error('Please log in to add items to your cart.');
      navigate('/login');
      return;
    }

    try {
      await addToCart(serviceId, token);
      toast.success('Item added to cart!');
      updateCartCount(1);
    } catch (error) {
      toast.error('Failed to add item to cart.');
    }
  };

  if (loading) return <div className="text-center text-lg text-gray-600 py-10">Loading services...</div>;
  if (error) return <div className="text-center text-lg text-red-500 py-10">{error}</div>;

  return (
    <div className="py-20 bg-beige-100">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <span className="inline-block font-semibold text-[#603813] text-sm bg-[#F5DFCA] border border-[#603813] rounded-full px-4 py-1 mb-3">
            OUR SERVICES
          </span>
          <h1 className="text-4xl font-playball text-[#603813] mb-10">What We Offer</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={service._id}
              className="relative bg-white rounded-xl shadow-lg px-5 py-8 text-center overflow-hidden transition-all duration-700 ease-in-out group"
            >
              {/* Hover Background Animation */}
              <div className={`absolute top-0 left-0 w-full h-0 ${service.bgColor} transition-all duration-700 ease-in-out group-hover:h-full`}></div>

              <div className="relative z-10 flex flex-col items-center">
                <FaMugHot className="text-8xl mb-4 transition-all duration-500 group-hover:text-gray-800 text-yellow-700" />
                <h4 className="text-2xl font-semibold mb-2 transition-all duration-500 group-hover:text-gray-800">
                  {service.name}
                </h4>
                <p className="text-base text-gray-600 transition-all duration-500 group-hover:text-white">
                  {service.description}
                </p>

                {/* Add to Cart Button */}
                <button
                  className="bg-golden text-deep-black px-4 py-2 rounded-full mt-4"
                  onClick={() => handleAddToCart(service._id)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
