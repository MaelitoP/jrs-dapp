import React from "react";

const Navbar = () => (
  <nav className="container flex justify-around py-8 mx-auto bg-white">
    <div className="items-center text-white hidden space-x-8 lg:flex">
      <a href="">Home</a>
      <a href="">Gallery</a>
      <div className="flex items-center">
        <img src="./images/logo/logo_small.png" />
      </div>
      <a href="">Mint</a>
      <a href="">Connect</a>
    </div>

    {/* <div className="flex items-center space-x-2">
      <button className="px-4 py-2 text-blue-100 bg-blue-800 rounded-md">
        Connect Wallet
      </button>
    </div> */}
  </nav>
);

export default Navbar;
