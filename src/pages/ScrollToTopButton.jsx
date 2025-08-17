import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Scroll distance e button show korbe (e.g., 40% of page)
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      if (scrollTop > scrollHeight * 0.2) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    showButton && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-10 right-4 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition"
      >
        <FaArrowUp />
      </button>
    )
  );
};

export default ScrollToTopButton;
