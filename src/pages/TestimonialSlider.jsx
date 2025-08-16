import React, { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Abdul Kobir",
    username: "@abdul.kobir",
    image: "/images/person/1.jpg",
    review:
      "This platform made donating blood so easy! I feel proud to help save lives.",
  },
  {
    name: "Emma Yesmin",
    username: "@emma.yesmin",
    image: "/images/person/2.jpg",
    review:
      "A seamless experience. The notifications are timely and very helpful!",
  },
  {
    name: "Choinot Ali",
    username: "@choinot.ali",
    image: "/images/person/3.jpg",
    review:
      "I love how simple it is to find nearby donors. Highly recommended for everyone.",
  },
  {
    name: "Swapna Akther",
    username: "@swapna.akther",
    image: "/images/person/4.jpg",
    review:
      "Life-saving initiative! Donating blood has never been this organized.",
  },
  {
    name: "Ryan Rifat",
    username: "@ryan.rifat",
    image: "/images/person/5.jpg",
    review:
      "Amazing community! I got notified exactly when someone needed blood nearby.",
  },
];

const TestimonialSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000); // change slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-red-50">
      <div className="max-w-3xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-red-600 mb-8">
          What Our Donors Say
        </h2>
        <div className="relative pt-6">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center transition-all duration-500 ">
            <div className="flex justify-center -mt-16 mb-4">
              <img
                src={testimonials[current].image}
                alt={testimonials[current].name}
                className="w-20 h-20 rounded-full object-cover border-2 border-red-500"
              />
            </div>
            <p className="text-gray-600 italic mb-4">
              “{testimonials[current].review}”
            </p>
            <p className="font-bold text-red-600">{testimonials[current].name}</p>
            <p className="text-gray-400 text-sm">{testimonials[current].username}</p>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  current === index ? "bg-red-600" : "bg-gray-300"
                }`}
                onClick={() => setCurrent(index)}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
