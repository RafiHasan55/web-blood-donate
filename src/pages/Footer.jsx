import { Link } from "react-router";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-red-100 text-black pt-12 pb-6 mt-12">
      <div className="max-w-11/12 mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Tagline */}
        <div>
          <Link to='/' className="text-3xl font-bold text-red-500 mb-4"> Blood 🩸 Unity</Link>
          
          <p className="text-sm text-black mt-4">
            Together, we build a community of lifesavers. Every drop of blood
            you donate carries the power to save a life, bring hope to a family,
            and make the world a little better. Join us in this noble journey
            and become someone’s hero today.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 hover:text-red-600">Quick Links</h3>
          <ul className="space-y-2 text-black">
            <li>
              <Link to="/" className="hover:text-red-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-red-600">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/search" className="hover:text-red-600">
                Search Donors
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-red-600">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3 hover:text-red-600">Contact Info</h3>
          <ul className="text-black text-sm space-y-2 ">
            <li className="hover:text-red-600">📞 +880 1751 202 502</li>
            <li className="hover:text-red-600">📧 info@bloodunity.com</li>
            <li className="hover:text-red-600">📍 Dhaka, Bangladesh</li>
          </ul>
        </div>

        {/* Newsletter (optional) */}
        <div>
          <h3 className="text-lg font-semibold mb-3 hover:text-red-600">Subscribe</h3>
          <p className="text-black text-sm mb-2">
            Get updates & alerts directly to your inbox.
          </p>
          <form className="flex items-center gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 rounded w-full text-black outline-1 outline-black focus:outline-none"
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
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-center items-center gap-10">
          <p className="text-sm text-black">
            &copy; {new Date().getFullYear()} Blood Unity. All rights reserved.
          </p>
          <div className="flex gap-4 text-black text-lg">
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
