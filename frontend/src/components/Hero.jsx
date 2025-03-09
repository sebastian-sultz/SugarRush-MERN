import React from 'react';
import cfe from '../assets/img/cfe.jpeg';

const Hero = () => {
  return (
    <div className="bg-black pt-16 pb-10">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 items-center">
          
          {/* Text Section */}
          <div className="lg:col-span-4">
            <small className="inline-block font-openSans font-semibold text-primary-600 text-xs uppercase bg-black border border-primary-600 rounded-full px-3 py-1 mb-3 animate__animated animate__bounceInDown">
              Welcome to Sugar-Rush
            </small>
            <h1 className="text-6xl font-playball text-primary-600 mb-3 py-8 animate__animated animate__bounceInDown">
              Your <span className="text-primary">Perfect</span> Brew <h1 className='py-5'>Awaits</h1>
            </h1>
          </div>

          {/* Image Section (Now Closer to Text) */}
          <div className="lg:col-span-3 flex justify-center lg:pr-10">
            <img
              src={cfe}
              className="w-[300px] h-[360px] rounded-lg animate__animated animate__zoomIn"
              alt="Coffee"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
