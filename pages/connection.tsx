import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import Wallet from "../components/Wallet";

const ConnectionPage = () => (
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
            <Wallet name="MetaMask" uri="metamask" />
            <Wallet name="Coinbase Wallet" uri="coinbase" />
            <Wallet name="WalletConnect" uri="wallet-connect" />
          </div>
        </div>
      </div>
      <div className="col-span-3">
        <img src="./images/pirate-ship.png" alt="Connection Artwork" />
      </div>
    </div>

    <Footer />
  </div>
);

export default ConnectionPage;
