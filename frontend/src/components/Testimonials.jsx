import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import tst from "../assets/img/tst.jpg";
import stt from "../assets/img/stt.jpg";
import tst2 from "../assets/img/tst2.jpg";
import tst3 from "../assets/img/tst3.jpg";

const testimonials = [
  { id: 1, name: "Person Name", profession: "Profession", image: tst },
  { id: 2, name: "Person Name", profession: "Profession", image: stt },
  { id: 3, name: "Person Name", profession: "Profession", image: tst2 },
  { id: 4, name: "Person Name", profession: "Profession", image: tst3 },
  { id: 5, name: "Person Name", profession: "Profession", image: tst },
  { id: 6, name: "Person Name", profession: "Profession", image: stt },
];

const sliderSettingsLTR = {
  dots: false,
  infinite: true,
  speed: 5000,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 0,
  cssEase: "linear",
  pauseOnHover: false,
  arrows: false,
  rtl: false,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 1 } },
  ],
};

const sliderSettingsRTL = {
  ...sliderSettingsLTR,
  rtl: true,
};

const Testimonials = () => {
  return (
    <div className="py-16 bg-beige-100 px-6 lg:px-20">

      <div className="container mx-auto ">
        {/* Heading */}
        <div className="text-center">
        <h1 className="text-4xl font-playball text-[#603813] mb-10">What Our Customers Say!</h1>

        </div>

        {/* First Row (Left to Right) */}
        <Slider {...sliderSettingsLTR} className="mb-6">
          {testimonials.slice(0, 3).map((testimonial) => (
            <div key={testimonial.id} className="px-2">
              <div className="bg-white rounded-lg shadow-md p-4 w-[320px] h-[280px] flex flex-col justify-between relative">
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    className="w-14 h-14 rounded-full border-2 border-primary"
                    alt={testimonial.name}
                  />
                  <div className="ml-3">
                    <h4 className="text-lg font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-600 mb-1">{testimonial.profession}</p>
                  </div>
                  <i className="fa fa-quote-right fa-lg text-gray-500 absolute top-4 right-4"></i>
                </div>

                {/* Centered Stars */}
                <div className="flex justify-center mt-3 text-yellow-500">
                  {Array(5)
                    .fill()
                    .map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                </div>

                <p className="text-sm text-gray-700 text-center mt-2">
                  Lorem ipsum dolor sit amet elit, sed do eiusmod tempor ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          ))}
        </Slider>

        {/* Second Row (Right to Left) */}
        <Slider {...sliderSettingsRTL}>
          {testimonials.slice(3, 6).map((testimonial) => (
            <div key={testimonial.id} className="px-2">
              <div className="bg-white rounded-lg shadow-md p-4 w-[320px] h-[280px] flex flex-col justify-between relative">
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    className="w-14 h-14 rounded-full border-2 border-primary"
                    alt={testimonial.name}
                  />
                  <div className="ml-3">
                    <h4 className="text-lg font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-600 mb-1">{testimonial.profession}</p>
                  </div>
                  <i className="fa fa-quote-right fa-lg text-gray-500 absolute top-4 right-4"></i>
                </div>

                {/* Centered Stars */}
                <div className="flex justify-center mt-3 text-yellow-500">
                  {Array(5)
                    .fill()
                    .map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                </div>

                <p className="text-sm text-gray-700 text-center mt-2">
                  Lorem ipsum dolor sit amet elit, sed do eiusmod tempor ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonials;
