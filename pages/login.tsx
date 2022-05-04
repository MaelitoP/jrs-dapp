import React, { useEffect, useState, MouseEventHandler } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import Wallet from "../components/Wallet";

import { injected, walletconnect, walletlink } from "../config/connectors";
import {
  useEagerConnect,
  useInactiveListener,
} from "../config/hooks/useEagerConnect";

enum ConnectorNames {
  Injected = "Injected",
  WalletConnect = "WalletConnect",
  WalletLink = "WalletLink",
}

const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.WalletLink]: walletlink,
};

const LoginPage = () => {
  const context = useWeb3React<Web3Provider>();
  const { connector, library, account, activate, deactivate, active, error } =
    context;

  // Handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState<any>();

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // Handle logic to eagerly connect to the injected ethereum provider,
  // if it exists and has granted access already
  const triedEager = useEagerConnect();

  // Handle logic to connect in reaction to certain events on the injected
  // ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  const handleMetaMask = () => {
    console.log("handled !");
  };

  const handleCoinbaseWallet = () => {
    return null;
  };

  const handleWalletConnect = () => {
    return null;
  };

  return (
    <div className="wrapper">
      <Navbar active_page="Connection" />

      <div className="content grid grid-cols-5 gap-4">
        <div className="col-span-2">
          <div className="flex-wrap pt-28 pb-28">
            <div className="mb-14 lg:col-span-8 col-span-12">
              <h2 className="welcome-title mb-3">CONNECT YOUR WALLET</h2>
              <p className="welcome-p text-gray-200 mb-0">
                Connect with one of our available wallet providers.
              </p>
            </div>

            <div className="col-span-3 connection-btn ml-5">
              {/* Wallet buttons */}
              <Wallet name="MetaMask" uri="metamask" onClick={handleMetaMask} />
              <Wallet
                name="Coinbase Wallet"
                uri="coinbase"
                onClick={handleCoinbaseWallet}
              />
              <Wallet
                name="WalletConnect"
                uri="wallet-connect"
                onClick={handleWalletConnect}
              />
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <img
            className="wallet-img m-auto mt-20 -rotate-12"
            src="./images/pirate-bottle.png"
            alt="Connection Artwork"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginPage;