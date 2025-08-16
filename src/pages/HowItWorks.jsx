import { FaUserPlus, FaBell, FaTint, FaHeart } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus className="text-red-500 text-3xl" />,
      title: "Register as a Donor",
      desc: "Sign up and share your blood group, location, and availability.",
    },
    {
      icon: <FaBell className="text-yellow-500 text-3xl" />,
      title: "Get Notified",
      desc: "Receive requests when someone needs blood near your location.",
    },
    {
      icon: <FaTint className="text-blue-500 text-3xl" />,
      title: "Donate Blood",
      desc: "Visit the donation location and help save a life.",
    },
    {
      icon: <FaHeart className="text-green-500 text-3xl" />,
      title: "Save Lives",
      desc: "Your donation makes a real difference to someone's family.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">
          How It Works
        </h2>
        <p className="text-gray-700 max-w-3xl mx-auto text-lg mb-10">
          Follow these simple steps to become a lifesaving blood donor.
          Register, get notified, donate, and make a real difference in
          someone’s life.
        </p>
        <div className="grid gap-8 md:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded shadow hover:shadow-lg transition"
            >
              <div className="mb-4 text-center justify-center items-center flex">
                {step.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
