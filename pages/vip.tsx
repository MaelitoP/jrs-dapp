import React, { useState } from "react";
import { Contract } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import { Accordion } from "../components/Accordion";

import { sm_data } from "../config/contracts";

const VIPPage = () => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch VIP contract data
  const { address, abi } = sm_data.testnet.jrsva;

  // Fetch connected wallet data
  const { library, active, account } = useWeb3React<Web3Provider>();

  // Mint a VIP
  const handleAccess = async () => {
    if (!active && !account) {
      setError(true);
      setMessage("You're wallet isn't connected.");
      return;
    }

    const contract = new Contract(address, abi, library);
    const mintedNbr = await contract.numberMinted(account);

    if (mintedNbr._hex === "0x01") {
      setError(true);
      setMessage("You already have VIP access.");
      return;
    }

    const tx = await contract.connect(library.getSigner()).mint({
      // gasLimit = average of(metamaskLimit * 3)
      gasLimit: 100000,
      value: "180000000000000000",
    });

    try {
      await tx.wait();
    } catch (err) {
      setError(true);
      setMessage("An error occurred with the contract.");
      return;
    }

    setMessage("JRS VIP Pass received ! Welcome Sailor.");
  };

  return (
    <div className="wrapper">
      <Navbar active_page="VIP" />

      <div className="flex justify-center py-28">
        <div className="flex w-1/2">
          <div className="justify-start">
            <img
              className="animate-float vip"
              src="/images/jrs-vip.gif"
              alt="JRS VIP Card"
            />
          </div>
        </div>
        <div className="w-1/3 justify-start mt-10 mr-10">
          <h2 className="welcome-title tracking-wider mb-3">
            MINT YOUR VIP ACCESS !
          </h2>
          <p className="welcome-p text-gray-500">
            The JRS VIP pass is a collection of 88 very unique NFTs giving
            advantages to the holder when combined with a JRS Pirate NFT. There
            won’t be more VIPs in the future so if you are among the lucky ones
            owning one you may want to hold on to it.
          </p>

          <div className="flex-wrap justify-center mt-14">
            <button
              className="mx-auto relative group overflow-hidden px-14 h-12 rounded-full flex space-x-2 items-center bg-gradient-to-r from-green-300 via-yellow-300 to-pink-300"
              onClick={handleAccess}
            >
              <span className="relative text-sm font-medium text-white">
                GET ACCESS
              </span>
              <div className="flex items-center -space-x-3 translate-x-3">
                <div className="w-2.5 h-[1.6px] rounded bg-white origin-left scale-x-0 transition duration-300 group-hover:scale-x-100"></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 stroke-white -translate-x-2 transition duration-300 group-hover:translate-x-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </button>

            {error && (
              <>
                <div className="flex p-4 bg-gray-100 rounded-lg dark:bg-gray-700 mt-14">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-700 dark:text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <div className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {message}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setMessage("");
                      setError(false);
                    }}
                    className="ml-auto -mx-1.5 -my-1.5 bg-gray-100 text-gray-500 rounded-lg focus:ring-2 focus:ring-gray-400 p-1.5 hover:bg-gray-200 inline-flex h-8 w-8 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                  >
                    <span className="sr-only">Dismiss</span>
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              </>
            )}
            {message && !error && (
              <>
                <div className="flex p-4 mb-4 bg-green-100 rounded-lg dark:bg-green-200 mt-14">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-700 dark:text-green-800"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <div className="ml-3 text-sm font-medium text-green-700 dark:text-green-800">
                    {message}
                  </div>
                  <button
                    type="button"
                    className="ml-auto -mx-1.5 -my-1.5 bg-green-100 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8 dark:bg-green-200 dark:text-green-600 dark:hover:bg-green-300"
                    onClick={() => setMessage("")}
                  >
                    <span className="sr-only">Close</span>
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="flex items-end h-1/3 text-white">
            <Accordion
              title="Where does the money go ?"
              content="All sales will be reinvested in the Jolly Roger Society pre-mint
              development & marketing."
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default VIPPage;
