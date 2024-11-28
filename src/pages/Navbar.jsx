import React from "react";
import { NavLink } from "react-router-dom";
//<a> tag refreshers the page but NavLink tag doesn't
const Navbar = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? "bg-black text-white text-lg font-semibold hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
      : "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2";

  return (
    <nav className="md:bg-blue-500 bg-blue-800 border-b border-blue-500 md:rounded-3xl md:m-5">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
              <span className="hidden md:block text-white text-2xl font-bold ml-2">
                खोया पाया तूने है क्या ??
              </span>
            </NavLink>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <NavLink to="/" className={linkClass}>
                  Home
                </NavLink>
                <NavLink to="/list-item" className={linkClass}>
                  Add Item
                </NavLink>
                <NavLink to="/items-list" className={linkClass}>
                  Items List
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
