import React from "react";
import Link from "next/link";

interface Props {
  active_page: string;
}

const Navbar: React.FC<Props> = ({ active_page }) => (
  <nav className="container flex justify-around py-3 mx-auto">
    <div className="navbar items-center text-xs text-white hidden space-x-8 lg:flex">
      <Link href="./">
        <a
          className={`hover:text-teal-400 ${
            active_page === "Home" ? "active" : ""
          }`}
        >
          HOME
        </a>
      </Link>
      <Link href="./gallery">
        <a
          className={`hover:text-teal-400 ${
            active_page === "Gallery" ? "active" : ""
          }`}
        >
          GALLERY
        </a>
      </Link>
      <div className="flex items-center">
        <img
          className="object-contain h-10 w-10"
          src="./images/logo/logo_small.png"
        />
      </div>
      <Link href="./mint">
        <a
          className={`hover:text-teal-400 ${
            active_page === "Mint" ? "active" : ""
          }`}
        >
          MINT
        </a>
      </Link>
      <Link href="./connection">
        <a
          className={`hover:text-teal-400 ${
            active_page === "Connection" ? "active" : ""
          }`}
        >
          CONNECT WALLET
        </a>
      </Link>
    </div>
  </nav>
);

export default Navbar;
