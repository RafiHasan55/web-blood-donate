// components/AboutUsPreview.jsx

import { Link } from "react-router";

const AboutUsPreview = () => {
  return (
    <section className="bg-red-50 py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-red-600 mb-4">About Us</h2>
        <p className="text-gray-700 max-w-3xl mx-auto text-lg mb-6">
          We are a life-saving community platform that connects blood donors with people in need.
          Our mission is to ensure no life is lost due to the unavailability of blood. Together,
          we make blood donation accessible, efficient, and transparent.
        </p>
        <Link
          to="/about"
          className="inline-block mt-4 px-6 py-2 bg-red-600 text-white font-medium rounded hover:bg-red-700 transition"
        >
          View More
        </Link>
      </div>
    </section>
  );
};

export default AboutUsPreview;
