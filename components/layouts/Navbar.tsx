import React from "react";
import Link from "next/link";
import { useWeb3React } from "@web3-react/core";

interface Props {
  active_page: string;
}

const Navbar: React.FC<Props> = ({ active_page }) => {
  const { active } = useWeb3React();

  const activeLogin = () => {
    return `hover:text-teal-400 ${active_page === "Login" ? "active" : ""}`;
  };

  return (
    <nav className="flex justify-center py-4">
      <div className="navbar items-center text-xs text-white hidden space-x-8 lg:flex">
        <Link href="/">
          <a
            className={`hover:text-teal-400 ${
              active_page === "Home" ? "active" : ""
            }`}
          >
            HOME
          </a>
        </Link>
        <Link href="/gallery">
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
        <Link href="/mint">
          <a
            className={`hover:text-teal-400 ${
              active_page === "Mint" ? "active" : ""
            }`}
          >
            MINT
          </a>
        </Link>
        {active ? (
          <Link href="/login">
            <a className="text-green-400">• CONNECTED</a>
          </Link>
        ) : (
          <Link href="/login">
            <a className={activeLogin()}>CONNECT WALLET</a>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
