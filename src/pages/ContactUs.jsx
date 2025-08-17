const ContactUs = () => {
  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4 text-center">
          Contact Us
        </h2>
        <p className="text-base-content max-w-3xl mx-auto text-lg mb-10 text-center">
          Have questions or need assistance? We’re here to support you. Reach
          out to us anytime for help, guidance, or collaboration opportunities.
          Together, we can make a difference.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 p-3 rounded"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 p-3 rounded"
              required
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full border border-gray-300 p-3 rounded"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
            >
              Send Message
            </button>
          </form>
          <div className="bg-red-50 p-6 rounded-md shadow">
            <h3 className="text-xl font-bold text-red-600 mb-2">
              Get in Touch
            </h3>
            <p className="text-gray-700 mb-4">We're here to help you 24/7</p>
            <p className="text-gray-600">
              <strong>Phone:</strong> +880 1751 202 502
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong> contact@bloodhero.com
            </p>
            <p className="text-gray-600">
              <strong>Location:</strong> Dhaka, Bangladesh
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
