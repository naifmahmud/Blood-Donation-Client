import React from "react";

const Home = () => {
  return (
    <div>
      <section>
        <section className="relative overflow-hidden">
          
          <div className="absolute inset-0 bg-linear-to-r from-red-500 via-red-600 to-rose-600"></div>

         
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
      </section>
    </div>
  );
};

export default Home;
