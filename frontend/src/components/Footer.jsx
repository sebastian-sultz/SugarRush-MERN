import React from 'react';
import one from '../assets/img/1.jpeg';
import two from '../assets/img/2.jpeg';
import three from '../assets/img/3.jpeg';
import four from '../assets/img/4.jpeg';
import five from '../assets/img/5.jpeg';
import six from '../assets/img/6.jpeg';

const Footer = () => {
  return (
    <section id="contact">
    <div className="bg-white py-16">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo & About Section */}
          <div>
            <h1 className="text-primary-600 text-3xl font-playball">
              Sugar<span className="text-gray-900">Rush</span>
            </h1>
            <p className="text-gray-700 mt-4 leading-relaxed">
              Join us on a journey of rich flavours, warm ambiance, and genuine hospitality.
              Your perfect coffee experience starts here.
            </p>
          </div>

          {/* Special Facilities Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-900">Special Facilities</h4>
            <div className="flex flex-col space-y-3">
              <a className="text-gray-700 hover:text-primary-600 flex items-center">
                <i className="fa fa-check text-primary-600 mr-2"></i> Croissant
              </a>
              <a className="text-gray-700 hover:text-primary-600 flex items-center">
                <i className="fa fa-check text-primary-600 mr-2"></i> Salted Caramel Euphoria
              </a>
              <a className="text-gray-700 hover:text-primary-600 flex items-center">
                <i className="fa fa-check text-primary-600 mr-2"></i> Cocoa Cloud
              </a>
              <a className="text-gray-700 hover:text-primary-600 flex items-center">
                <i className="fa fa-check text-primary-600 mr-2"></i> Special Cookies
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-900">Contact Us</h4>
            <div className="flex flex-col space-y-3 text-gray-700">
              <p className="flex items-center">
                <i className="fa fa-map-marker-alt text-primary-600 mr-2"></i> Lajpat Nagar, New Delhi
              </p>
              <p className="flex items-center">
                <i className="fa fa-phone-alt text-primary-600 mr-2"></i> 9834587314
              </p>
              <p className="flex items-center">
                <i className="fas fa-envelope text-primary-600 mr-2"></i> sugarrush23@gmail.com
              </p>
              <p className="flex items-center">
                <i className="fa fa-clock text-primary-600 mr-2"></i> 24/7 Hours Service
              </p>
            </div>
          </div>

          {/* Social Gallery Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-900">Social Gallery</h4>
            <div className="grid grid-cols-3 gap-2">
              {[one, two, three, four, five, six].map((img, index) => (
                <img
                  key={index}
                  src={img}
                  className="w-16 h-16 rounded-full border border-primary-600 p-1"
                  alt={`Gallery ${index + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Back to Top Button */}
      <a href="#" className="bg-primary-600 text-white rounded-full fixed right-8 bottom-8 w-10 h-10 flex items-center justify-center shadow-md">
        <i className="fa fa-arrow-up"></i>
      </a>
    </div>
    </section>
  );
};

export default Footer;
