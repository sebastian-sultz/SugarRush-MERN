// // src/App.jsx
// import React from 'react';
// import Navbar from './components/Navbar';
// import Hero from './components/Hero';
// import About from './components/About';
// import Services from './components/Services';
// import Testimonials from './components/Testimonials';
// import Footer from './components/Footer';

// function App() {
//   return (
//     <div className="bg-beige-100 min-h-screen">
//       <Navbar />
//       <Hero />
//       <About />
//       <Services />
//       <Testimonials />
//       <Footer />
//     </div>
//   );
// }

// export default App;


import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
// import Features from './components/Features';
// import NewArrivals from './components/NewArrivals';
// import Banner from './components/Banner';
// import Facts from './components/Facts';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Spinner from './components/Spinner';
// import BackToTop from './components/BackToTop';
import Login from './components/Login';
import Signup from './components/Signup';
import About from './components/About'
import Services from './components/Services'
// import CartPage from './components/CartPage';
import Cart from './components/Cart';
// import ShoppingSection from './components/ShoppingSection';
import { UserProvider } from './UserContext';
function App() {
  return (
  <UserProvider>
   
        <div className="min-h-screen  bg-beige-100">
          <Spinner />
          <Navbar />
          <Routes>
            <Route path="/" element={<HomeContent />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
         
          
        </div>
       
     </UserProvider>
  );
}

// Home Content (Combining all home sections)
function HomeContent() {
  return (
    <>
     
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <Footer />
    </>
  );
}

export default App;