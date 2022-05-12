import React, { useEffect, useState, MouseEventHandler } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

import Wallet from "../components/Wallet";
import Account from "../components/Account";

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
  const { connector, account, activate, active } = context;

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
    setActivatingConnector("Injected");
    activate(connectorsByName["Injected"], (err) => {
      if (err) setActivatingConnector(undefined);
    });
  };

  const handleCoinbaseWallet = () => {
    setActivatingConnector("WalletLink");
    activate(connectorsByName["WalletLink"], (err) => {
      if (err) setActivatingConnector(undefined);
    });
  };

  const handleWalletConnect = () => {
    setActivatingConnector("WalletConnect");
    activate(connectorsByName["WalletConnect"], (err) => {
      if (err) setActivatingConnector(undefined);
    });
  };

  return (
    <div className="wrapper">
      <Navbar active_page="Login" />

      {active && account ? (
        <div className="grid place-items-center h-screen">
          <div className="flex-wrap">
            <h2 className="welcome-title mb-3">WALLET LINKED</h2>
            <Account />
          </div>
        </div>
      ) : (
        <Wallets
          handleMetaMask={handleMetaMask}
          handleCoinbaseWallet={handleCoinbaseWallet}
          handleWalletConnect={handleWalletConnect}
        />
      )}

      <Footer />
    </div>
  );
};

type TWallets = {
  handleMetaMask: MouseEventHandler<HTMLDivElement>;
  handleCoinbaseWallet: MouseEventHandler<HTMLDivElement>;
  handleWalletConnect: MouseEventHandler<HTMLDivElement>;
};

const Wallets = ({
  handleMetaMask,
  handleCoinbaseWallet,
  handleWalletConnect,
}: TWallets) => {
  return (
    <>
      <div className="content grid grid-cols-5 gap-4">
        <div className="ml-10 col-span-2">
          <div className="ml-10 flex-wrap pt-28 pb-28">
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
            className="wallet-img m-auto mt-20 border-b-2 border-black"
            src="./images/jrs-pirate.png"
            alt="Connection Artwork"
          />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
