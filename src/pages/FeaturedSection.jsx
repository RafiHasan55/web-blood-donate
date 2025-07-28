const FeaturedSection = () => {
  return (
    <section className="bg-red-50 py-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-red-700 mb-4">Why Donate Blood?</h2>
        <p className="text-gray-700 max-w-3xl mx-auto text-lg mb-10">
          Every two seconds, someone in need requires blood. Your single donation can save up to three lives. Join our community of heroes and make a real difference today.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold text-red-600 mb-2">🩸 Save Lives</h3>
            <p className="text-gray-600">Blood donations are critical during surgeries, trauma care, and for patients with chronic conditions.</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold text-red-600 mb-2">💪 Stay Healthy</h3>
            <p className="text-gray-600">Donating blood can improve your cardiovascular health and reduce harmful iron stores.</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold text-red-600 mb-2">🤝 Build Community</h3>
            <p className="text-gray-600">Be a part of a life-saving mission and inspire others to donate through your contribution.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
