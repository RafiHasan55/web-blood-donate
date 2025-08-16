import React from "react";

const Faqs = () => {
  return (
    <div className="max-w-11/12 mx-auto py-16">
      <section className="dark:bg-gray-100 dark:text-gray-800">
        <div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
          <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4 text-center">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-lg mb-10 text-center dark:text-gray-600">
            Find answers to common questions about registering, donating, and
            saving lives with Blood Unity. Stay informed and contribute safely.
          </p>
          <div className="space-y-4">
            <details className="w-full border rounded-lg">
              <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">
                How can I register as a donor?
              </summary>
              <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">
                You can sign up by creating an account and providing your blood
                group, location, and availability.{" "}
              </p>
            </details>
            <details className="w-full border rounded-lg">
              <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">
                How will I receive blood requests?
              </summary>
              <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">
                Once registered, you will get notifications whenever someone
                nearby needs blood matching your blood group.{" "}
              </p>
            </details>
            <details className="w-full border rounded-lg">
              <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">
                Can I donate blood more than once?
              </summary>
              <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">
                Yes! You can donate as often as your health permits. Regular
                donations help save more lives.{" "}
              </p>
            </details>
            <details className="w-full border rounded-lg">
              <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">
                Is there any cost to register or donate?
              </summary>
              <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">
                No, registration and blood donation are completely free for all
                donors.{" "}
              </p>
            </details>
            <details className="w-full border rounded-lg">
              <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">
                Who can become a blood donor?
              </summary>
              <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">
                Anyone who meets the health requirements and is willing to
                donate blood can join our platform.{" "}
              </p>
            </details>
            <details className="w-full border rounded-lg">
              <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">
                How do I find donors in my area?
              </summary>
              <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">
                You can use the “Find Donate” search tool to locate donors near
                your location.{" "}
              </p>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Faqs;
