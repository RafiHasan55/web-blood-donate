import { useContext, useState } from "react";
import { CgMenuMotion } from "react-icons/cg";
import { RiMenuAddLine } from "react-icons/ri";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";
import { FaCaretDown } from "react-icons/fa";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logout successful!");
      })
      .catch((error) => {
        toast.error("Logout failed: " + error.message);
      });
  };

  const menu = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Our Blogs", path: "/blog" },
    { name: "Donation Requests", path: "/donation-requests" },
  ];

  return (
    <nav className="bg-white shadow">
      {user && (
        <p className="text-center text-white bg-black py-2 bg-opacity-90">
          Welcome {user?.displayName} 🩸❤️ Thank you for being part of our
          lifesaving mission.
        </p>
      )}

      <div className="w-11/12 mx-auto py-5 flex justify-between items-center relative">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-stone-700">
          Blood 🩸 Unity
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-6">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className="hover:text-red-600"
            >
              {item.name}
            </NavLink>
          ))}

          {/* Avatar Dropdown */}
          {user ? (
            <div className="relative">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <img
                  src={user?.photoURL || "https://i.ibb.co/2P5zz1y/avatar.png"}
                  alt="avatar"
                  className="w-10 h-10 rounded-full border"
                />
                <FaCaretDown className="text-gray-600" />
              </div>
              {isDropdownOpen && (
                <ul className="absolute right-0 mt-2 bg-white border shadow-md w-40 rounded-md z-50 text-sm">
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/registration">Register</NavLink>
            </>
          )}
        </ul>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          {!isMenuOpen ? (
            <RiMenuAddLine
              onClick={() => setIsMenuOpen(true)}
              className="text-2xl cursor-pointer"
            />
          ) : (
            <CgMenuMotion
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl cursor-pointer"
            />
          )}

          <ul
            className={`absolute bg-white z-50 top-16 left-0 w-full py-4 flex flex-col gap-4 shadow-md ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            {menu.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className="px-6 hover:text-red-600"
              >
                {item.name}
              </NavLink>
            ))}
            {user ? (
              <>
                <NavLink to="/dashboard" className="px-6">
                  Dashboard
                </NavLink>
                <button onClick={handleLogout} className="px-6 text-left">
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="px-6">
                  Login
                </NavLink>
                <NavLink to="/registration" className="px-6">
                  Register
                </NavLink>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
