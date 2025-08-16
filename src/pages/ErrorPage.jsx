import { Link } from "react-router";
import Lottie from "lottie-react";
import errorAnimation from "..//assets//404 error.json";

const ErrorPage = () => {
  return (
    <div className="flex  flex-col lg:flex-row items-center justify-center text-center lg:text-start min-h-screen bg-gray-100 dark:bg-gray-900 gap-10 md:gap-16 px-4 transition">
      {/* Animation */}
      <div className="w-80 md:w-96 rounded-md shadow-2xl">
        <Lottie animationData={errorAnimation} loop={true} />
      </div>

      <div>
        {/* Text */}
        <h1 className="text-3xl md:text-5xl font-bold text-red-600  mb-4">
          Oops!
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-md">
          The page you're looking for doesn’t exist or has been moved.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-medium shadow-md transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
