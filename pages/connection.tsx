import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import Wallet from "../components/Wallet";

const ConnectionPage = () => (
  <div className="wrapper">
    <Navbar active_page="Connection" />

    <div className="pt-28 pb-28">
      <div className="flex container justify-center">
        <div className="col-span-6">
          <Wallet name="MetaMask" uri="metamask" />
          <Wallet name="Coinbase Wallet" uri="coinbase" />
          <Wallet name="WalletConnect" uri="wallet-connect" />
        </div>
      </div>
    </div>

    <Footer />
  </div>
);

export default ConnectionPage;
