import { useUser } from '../UserContext';
import { useNavigate, Link } from 'react-router-dom'; // Added Link import
import { useEffect, useState } from 'react';
import { getCart, removeFromCart, updateCartItem, clearCart } from '../utils/api';
import { toast } from 'react-toastify';
import { FaCheckCircle, FaMinus, FaTrash, FaMugHot } from 'react-icons/fa';

export default function Cart() {
  const { loggedInUser, token, cartCount, updateCartCount } = useUser();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopover, setShowPopover] = useState(false);

  useEffect(() => {
    if (!loggedInUser) {
      navigate('/login');
      return;
    }

    const fetchCart = async () => {
      try {
        const response = await getCart(token);
        setCartItems(response.data);
        const totalCount = response.data.reduce((sum, item) => sum + item.quantity, 0);
        console.log('Fetched cart items:', response.data, 'Total count:', totalCount);
        updateCartCount(totalCount - cartCount);
      } catch (error) {
        console.error('Error fetching cart:', error);
        toast.error('Failed to load cart.');
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [loggedInUser, token, cartCount, navigate, updateCartCount]);

  const handleRemoveItem = async (watchId) => {
    try {
      const item = cartItems.find((i) => i.watch._id === watchId);
      await removeFromCart(watchId, token);
      const updatedItems = cartItems.filter((i) => i.watch._id !== watchId);
      setCartItems(updatedItems);
      updateCartCount(-item.quantity);
      toast.success('Item removed from cart.');
      if (updatedItems.length === 0) {
        console.log('Cart is now empty');
      }
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('Failed to remove item.');
    }
  };

  const handleReduceQuantity = async (watchId) => {
    try {
      const itemIndex = cartItems.findIndex((i) => i.watch._id === watchId);
      const currentItem = cartItems[itemIndex];
      const newQuantity = currentItem.quantity - 1;

      if (newQuantity <= 0) {
        await handleRemoveItem(watchId); // Explicitly call remove
      } else {
        await updateCartItem(watchId, newQuantity, token);
        const updatedItems = [...cartItems];
        updatedItems[itemIndex].quantity = newQuantity;
        setCartItems(updatedItems);
        updateCartCount(-1);
        toast.success('Quantity reduced.');
      }
    } catch (error) {
      console.error('Error reducing quantity:', error);
      toast.error('Failed to update quantity.');
    }
  };

  const handleCheckout = async () => {
    try {
      await clearCart(token);
      setCartItems([]);
      updateCartCount(-cartCount);
      setShowPopover(true);
      setTimeout(() => {
        setShowPopover(false);
      }, 2000);
    } catch (error) {
      toast.error('Checkout failed.');
    }
  };

  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.watch.price * item.quantity, 0)
    .toFixed(2);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-charcoal">
        <div className="text-golden text-xl font-dancing animate-pulse">Loading your cart...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal py-10 px-6 lg:px-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-[#603813] text-4xl md:text-5xl font-dancing mb-8 text-center tracking-wide">
          Your Cart
        </h1>

        {cartItems.length > 0 ? (
          <div className="bg-deep-black rounded-xl shadow-luxury overflow-hidden">
            {/* Table for larger screens */}
            <div className="hidden md:block">
              <table className="w-full text-silver">
                <thead className="bg-deep-black/80">
                  <tr className="border-b border-gray-800 text-left">
                    <th className="py-4 px-6   font-medium">Watch</th>
                    <th className="py-4 px-6   font-medium">Price</th>
                    <th className="py-4 px-6   font-medium">Quantity</th>
                    <th className="py-4 px-6   font-medium">Total</th>
                    <th className="py-4 px-6   font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr
                      key={item.watch._id}
                      className="border-b border-primary-600 hover:bg-deep-black/70 transition-colors duration-200"
                    >
                      <td className="py-4 px-6 flex items-center">
                        <FaMugHot
                          className="w-16 h-16 text-primary-600 object-contain rounded-md mr-4"
                        />
                        <span className="text-silver  ">{item.watch.name}</span>
                      </td>
                      <td className="py-4 px-6 text-golden  ">₹{item.watch.price}</td>
                      <td className="py-4 px-6 text-silver  ">{item.quantity}</td>
                      <td className="py-4 px-6 text-golden  ">
                      ₹{(item.watch.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="py-4 px-6 flex space-x-3">
                        <button
                          className="w-8 h-8 flex items-center justify-center bg-golden/20 text-golden rounded-full hover:bg-golden/40 hover:scale-110 transition-all duration-200 shadow-sm"
                          onClick={() => handleReduceQuantity(item.watch._id)}
                          title="Reduce Quantity"
                        >
                          <FaMinus className="text-sm" />
                        </button>
                        <button
                          className="w-8 h-8 flex items-center justify-center bg-golden/20 text-golden rounded-full hover:bg-golden/40 hover:scale-110 transition-all duration-200 shadow-sm"
                          onClick={() => handleRemoveItem(item.watch._id)}
                          title="Remove Item"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-primary-600">
                    <td colSpan="3" className="py-4 px-6 text-right text-silver  font-semibold">
                      Total:
                    </td>
                    <td colSpan="2" className="py-4 px-6 text-golden   font-semibold">
                    ₹{totalPrice}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Card layout for mobile */}
            <div className="md:hidden space-y-6 p-4">
              {cartItems.map((item) => (
                <div
                  key={item.watch._id}
                  className="bg-deep-black/80 rounded-lg p-4 shadow-inner border border-primary-600"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={item.watch.image}
                      alt={item.watch.name}
                      className="w-20 h-20 object-contain rounded-md mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="text-silver   text-lg">{item.watch.name}</h3>
                      <p className="text-golden  ">₹{item.watch.price}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-silver  ">
                      Qty: {item.quantity} | Total: ₹{(item.watch.price * item.quantity).toFixed(2)}
                    </p>
                    <div className="flex space-x-2">
                      <button
                        className="w-8 h-8 flex items-center justify-center bg-golden/20 text-golden rounded-full hover:bg-golden/40 hover:scale-110 transition-all duration-200 shadow-sm"
                        onClick={() => handleReduceQuantity(item.watch._id)}
                        title="Reduce Quantity"
                      >
                        <FaMinus className="text-sm" />
                      </button>
                      <button
                        className="w-8 h-8 flex items-center justify-center bg-golden/20 text-golden rounded-full hover:bg-golden/40 hover:scale-110 transition-all duration-200 shadow-sm"
                        onClick={() => handleRemoveItem(item.watch._id)}
                        title="Remove Item"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="text-right mt-4">
                <p className="text-silver   font-semibold">
                  Total: <span className="text-golden">₹{totalPrice}</span>
                </p>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="p-6 flex justify-end">
              <button
                className="bg-primary-600 text-deep-black px-6 py-3 rounded-full   font-semibold hover:bg-primary-600/80 hover:scale-105 transition-all duration-200 shadow-md"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-silver text-xl  ">Your cart is empty.</p>
            <Link
              to="/shop"
              className="mt-4 inline-block bg-golden text-deep-black px-6 py-2 rounded-full   hover:bg-golden/80 transition-all duration-200"
            >
              Shop Now
            </Link>
          </div>
        )}

        {/* Checkout Confirmation Popover */}
        {showPopover && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-deep-black p-8 rounded-xl shadow-2xl border border-primary-600 flex flex-col items-center animate-fade-in">
              <FaCheckCircle className="text-golden text-5xl mb-4 animate-pulse" />
              <p className="text-silver text-xl font-playfair">Order Confirmed!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}