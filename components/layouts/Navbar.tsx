import React from "react";

const Navbar = () => (
  <nav className="container flex justify-around py-3 mx-auto">
    <div className="navbar items-center text-xs text-white hidden space-x-8 lg:flex">
      <a className="hover:text-teal-400" href="">
        HOME
      </a>
      <a className="hover:text-teal-400" href="">
        GALLERY
      </a>
      <div className="flex items-center">
        <img
          className="object-contain h-10 w-10"
          src="./images/logo/logo_small.png"
        />
      </div>
      <a className="hover:text-teal-400" href="">
        MINT
      </a>
      <a className="hover:text-teal-400" href="">
        CONNECT WALLET
      </a>
    </div>

    {/* <div className="flex items-center space-x-2">
      <button className="px-4 py-2 text-blue-100 bg-blue-800 rounded-md">
        Connect Wallet
      </button>
    </div> */}
  </nav>
);

export default Navbar;
