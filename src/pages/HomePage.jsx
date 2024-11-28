import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 md:px-8">
      {/* Heading with responsive font size and margin */}
      
      <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center sm:text-3xl">
        Welcome to Lost & Found NITW Application
      </h1>

      {/* Buttons */}
      <div className="flex flex-col space-y-6 w-full max-w-xs">
        <Link to="/list-item">
          <button className="w-full px-6 py-3 text-lg font-semibold tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-white hover:text-sky-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 sm:px-4 sm:py-2 sm:text-base">
            Add Items
          </button>
        </Link>
        <Link to="/items-list">
          <button className="w-full px-6 py-3 text-lg font-semibold tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-white hover:text-sky-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 sm:px-4 sm:py-2 sm:text-base">
            Items List
          </button>
        </Link>
      </div>
    </div>
  );
}
