import React from 'react';
import cffr from '../assets/img/cffr.jpeg';

const About = () => {
  return (
    <section id="about">
    <div className="py-16 bg-beige-100 px-6 lg:px-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 items-center">
          
          {/* Image Section */}
          <div className="wow animate__animated animate__bounceInUp flex " data-wow-delay="0.1s">
            <img src={cffr} className="lg:w-[65%] w-[60%] rounded-lg" alt="Coffee" />
          </div>

          {/* Content Section */}
          <div className="wow animate__animated animate__bounceInUp lg:pl-2" data-wow-delay="0.3s">
            {/* About Us Badge */}
            <span className="inline-block font-open-sans font-bold text-gray-900 text-sm bg-white border border-primary rounded-full px-3 py-1 mb-3">
              ABOUT US
            </span>

            {/* Title - Now using Playfair font to match your screenshot */}
            <h1 className="text-4xl font-playball cursive text-gray-900 mb-4">
              Brewing moments, crafting memories.
            </h1>

            {/* Description - Now using Open Sans font */}
            <p className="text-base font-open-sans text-gray-700 mb-4 leading-relaxed">
              Welcome to our virtual coffee heaven, where every click brings you
              closer to a world of rich aromas and homelike flavours. Join us on
              this journey of delightful discoveries, where we believe in
              sipping comfort and warmth.
            </p>

            {/* Bullet Points - Icons with correct spacing & font */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-900 text-base font-open-sans">
              <div className="flex items-center">
                <i className="fas fa-share text-primary mr-2 text-sm"></i> Our beans, your dreams.
              </div>
              <div className="flex items-center">
                <i className="fas fa-share text-primary mr-2 text-sm"></i> A symphony of sips.
              </div>
              <div className="flex items-center">
                <i className="fas fa-share text-primary mr-2 text-sm"></i> Espresso your way.
              </div>
              <div className="flex items-center">
                <i className="fas fa-share text-primary mr-2 text-sm"></i> Your escape, our place.
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    </section>
  );
};

export default About;
