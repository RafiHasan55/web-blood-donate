// pages/AboutUsPage.jsx

const AboutUsPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-6">
        About Our Blood Donation Platform
      </h1>

      <p className="text-lg text-gray-800 mb-4">
        Our platform was built with one purpose: to save lives. Every year,
        millions of people across the country suffer due to delayed access to
        blood. Whether due to accidents, childbirth, or surgery, the need is
        constant and urgent.
      </p>

      <p className="text-lg text-gray-800 mb-4">
        We bridge the gap between donors and recipients through technology. By
        connecting verified blood donors with those in need based on location,
        blood type, and availability, we ensure help arrives at the right time.
      </p>

      <h2 className="text-2xl font-semibold text-red-600 mt-8 mb-2">
        Our Mission
      </h2>
      <p className="text-gray-700 mb-4">
        Our mission is to build the largest decentralized voluntary blood
        donation community, empowering every citizen to be a hero.
      </p>

      <h2 className="text-2xl font-semibold text-red-600 mt-8 mb-2">
        Our Values
      </h2>
      <ul className="list-disc list-inside text-gray-700">
        <li>Empathy and Humanity First</li>
        <li>Transparency and Trust</li>
        <li>Volunteerism and Community</li>
        <li>Technology with Purpose</li>
      </ul>

      <p className="text-lg text-gray-800 mt-6">
        Join us today and become part of a movement that saves lives, every day.
      </p>
    </div>
  );
};

export default AboutUsPage;
