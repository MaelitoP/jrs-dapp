import React from "react";

const Footer = () => (
  <footer>
    <div
      className="
        footer
        container
        flex flex-col flex-wrap
        px-3
        py-2
        mx-auto
        md:items-center
        lg:items-start
        md:flex-row md:flex-nowrap
      "
    >
      <div className="flex-shrink-0 w-64 mx-auto text-center md:mx-0 md:text-left">
        <img
          className="object-contain h-10 w-10 flex
          mb-5
          items-center
          justify-center
          md:justify-start"
          src="./images/logo/logo_small.png"
        />
        <p className="mt-2 text-sm text-gray-500">
          Each JRS Pirate is unique and programmatically generated from hundreds
          of possibles attributes, clothing, hats, weapons, and more. All JRS
          Pirates are awesome and fearless, but some are rarer than others.
        </p>
      </div>
      <div className="justify-end w-full mt-4 py-9 text-left lg:flex">
        <div className="w-full px-4 lg:w-1/3 md:w-1/2">
          <ul className="mb-8 space-y-2 text-sm list-none">
            <li>
              <a className="text-gray-600 hover:text-teal-400">Home</a>
            </li>
            <li>
              <a className="text-gray-600 hover:text-teal-400">Gallery</a>
            </li>
            <li>
              <a className="text-gray-600 hover:text-teal-400">Mint</a>
            </li>
            <li>
              <a className="text-gray-600 hover:text-teal-400">
                Connect Wallet
              </a>
            </li>
          </ul>
        </div>
        <div className="w-full px-4 lg:w-1/3 md:w-1/2">
          <ul className="mb-8 space-y-2 text-sm list-none">
            <li>
              <a
                className="text-gray-600 hover:text-teal-400"
                target="_blank"
                href="https://www.instagram.com/jollyrogersociety/"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                className="text-gray-600 hover:text-teal-400"
                target="_blank"
                href="https://twitter.com/jollyrogernft"
              >
                Twitter
              </a>
            </li>
            <li>
              <a className="text-gray-600 hover:text-teal-400" href="">
                Telegram
              </a>
            </li>
            <li>
              <a
                className="text-gray-600 hover:text-teal-400"
                target="_blank"
                href="https://discord.gg/kn7Py7AnAX"
              >
                Discord
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="flex justify-center">
      <p className="mb-5 text-xs text-white">
        All Rights Reserved &copy; JRS 2022
      </p>
    </div>
  </footer>
);

export default Footer;
