import React from 'react';
import { Link } from 'react-router';

const Error = () => {
    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-50 to-red-100 px-4">
      <div className="text-center max-w-md">
   
        <div className="text-7xl mb-4">🩸</div>

        <h1 className="text-6xl font-extrabold text-red-500 mb-4">
          404
        </h1>

        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="btn bg-red-500 text-white hover:bg-red-600"
          >
            🏠 Go Home
          </Link>

          <Link
            to="/dashboard"
            className="btn btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          >
            📊 Dashboard
          </Link>
        </div>
      </div>
    </div>
        </div>
    );
};

export default Error;