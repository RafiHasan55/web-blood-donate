import { Link } from "react-router";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Tagline */}
        <div>
          <h2 className="text-2xl font-bold text-red-500 mb-2">
            Blood 🩸 Unity
          </h2>
          <p className="text-sm text-gray-400">
            Together, we build a community of lifesavers. Every drop of blood
            you donate carries the power to save a life, bring hope to a family,
            and make the world a little better. Join us in this noble journey
            and become someone’s hero today.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link to="/" className="hover:text-red-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-red-400">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/search" className="hover:text-red-400">
                Search Donors
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-red-400">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Info</h3>
          <ul className="text-gray-300 text-sm space-y-2">
            <li>📞 +880 1234-567890</li>
            <li>📧 info@bloodunity.com</li>
            <li>📍 Dhaka, Bangladesh</li>
          </ul>
        </div>

        {/* Newsletter (optional) */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Subscribe</h3>
          <p className="text-gray-400 text-sm mb-2">
            Get updates & alerts directly to your inbox.
          </p>
          <form className="flex items-center gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 rounded w-full text-white outline-1 outline-white focus:outline-none"
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded"
            >
              <FaEnvelope />
            </button>
          </form>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-8 pt-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Blood Unity. All rights reserved.
          </p>
          <div className="flex gap-4 text-gray-400 text-lg">
            <a
              target="_blank"
              href="https://www.facebook.com/mdraseduzzaman.rased0/"
              className="hover:text-blue-500"
            >
              <FaFacebook />
            </a>
            <a
              target="_blank"
              href="https://www.instagram.com/freelancer.rased/"
              className="hover:text-sky-400"
            >
              <FaTwitter />
            </a>
            <a
              target="_blank"
              href="https://twitter.com/freelancerrased"
              className="hover:text-pink-500"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
