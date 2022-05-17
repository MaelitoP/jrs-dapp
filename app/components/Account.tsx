import React from "react";
import { useWeb3React } from "@web3-react/core";
import { FaEthereum, FaPowerOff } from "react-icons/fa";

const Account = () => {
  const { account, deactivate } = useWeb3React();

  return (
    <>
      <div className="cursor-pointer rounded-lg outline outline-1 outline-gray-400 bg-transparent text-white">
        <div className="px-4 py-1 flex items-center">
          <FaEthereum />
          <span className="px-2 animate-pulse">
            {account === null
              ? "-"
              : `${account.substring(0, 6)}...${account.substring(
                  account.length - 4
                )}`}
          </span>
        </div>
      </div>

      <div className="disconnect flex text-white justify-center">
        <FaPowerOff
          className="cursor-pointer hover:animate-pulse"
          onClick={() => deactivate()}
          size={24}
        />
      </div>
    </>
  );
};

export default Account;
