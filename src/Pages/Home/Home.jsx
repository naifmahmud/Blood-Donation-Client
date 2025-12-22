import React from "react";

const Home = () => {
  return (
    <div>
      <section>
        {/* Banner section */}
        <section className="relative overflow-hidden w-full">
          <div className="absolute inset-0 bg-linear-to-r from-red-500 via-red-600 to-rose-600 rounded-2xl object-cover mt-10"></div>

          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-black/10 rounded-full blur-3xl"></div>

          <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
              Donate Blood, <br />
              <span className="text-white/90">Save Lives</span>
            </h1>

            <p className="mt-6 max-w-2xl mx-auto text-lg text-white/90">
              Join our community of heroes and help patients in need by donating
              blood. One donation can save up to three lives.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5">
              <a
                href="/register"
                className="px-8 py-3 rounded-full bg-white text-red-600 font-semibold hover:bg-red-100 transition"
              >
                🩸 Join as a Donor
              </a>

              <a
                href="/search"
                className="px-8 py-3 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-red-600 transition"
              >
                🔍 Search Donors
              </a>
            </div>
          </div>
        </section>

        {/* Feature Section */}
        <section className="max-w-7xl mx-auto my-20 px-4">
          {/* Section Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-red-600">
              Why Choose Our Blood Donation Platform?
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Every donation saves lives. We connect donors with patients
              quickly, safely, and transparently.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-3xl shadow-xl p-6 hover:scale-105 transition">
              <div className="text-4xl mb-4">🩸</div>
              <h3 className="text-xl font-semibold text-red-500">Save Lives</h3>
              <p className="text-gray-600 mt-2">
                One blood donation can save up to three lives. Your contribution
                makes a real difference.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-3xl shadow-xl p-6 hover:scale-105 transition">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-red-500">
                Easy Donor Search
              </h3>
              <p className="text-gray-600 mt-2">
                Find nearby donors quickly by blood group, district, and
                upazila.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-3xl shadow-xl p-6 hover:scale-105 transition">
              <div className="text-4xl mb-4">⏱️</div>
              <h3 className="text-xl font-semibold text-red-500">
                Fast Requests
              </h3>
              <p className="text-gray-600 mt-2">
                Create urgent blood requests and notify donors instantly when
                time matters most.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-3xl shadow-xl p-6 hover:scale-105 transition">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-red-500">
                Trusted Community
              </h3>
              <p className="text-gray-600 mt-2">
                Verified donors and transparent requests ensure a safe and
                reliable blood donation experience.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section className="max-w-6xl mx-auto my-16 px-4">
          <div className="rounded-3xl shadow-2xl bg-linear-to-r from-red-500 via-red-400 to-rose-600 p-1">
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8">
              {/* Heading */}
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white">Contact Us</h2>
                <p className="text-white/90 mt-2">
                  Have questions or need help? Reach out to us anytime.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Info */}
                <div className="text-white space-y-5">
                  <h3 className="text-xl font-semibold">Get in Touch</h3>

                  <p>
                    We are here to help connect donors with those in need. Feel
                    free to contact us for any support or information.
                  </p>

                  <div className="space-y-3">
                    <p className="flex items-center gap-2">
                      📞 <span className="font-medium">Phone:</span> +880
                      1234-567890
                    </p>
                    <p className="flex items-center gap-2">
                      ✉️ <span className="font-medium">Email:</span>{" "}
                      support@blooddonation.com
                    </p>
                    <p className="flex items-center gap-2">
                      📍 <span className="font-medium">Location:</span> Dhaka,
                      Bangladesh
                    </p>
                  </div>
                </div>

                {/* Contact Form */}
                <form className="bg-white rounded-2xl p-6 space-y-4">
                  <div>
                    <label className="label">Name</label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      placeholder="Your Name"
                      required
                    />
                  </div>

                  <div>
                    <label className="label">Email</label>
                    <input
                      type="email"
                      className="input input-bordered w-full"
                      placeholder="Your Email"
                      required
                    />
                  </div>

                  <div>
                    <label className="label">Message</label>
                    <textarea
                      rows="4"
                      className="textarea textarea-bordered w-full"
                      placeholder="Write your message..."
                      required
                    ></textarea>
                  </div>

                  <button className="btn bg-red-500 hover:bg-red-600 text-white w-full">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Home;
