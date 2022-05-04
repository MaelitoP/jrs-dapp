import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

const VIPPage = () => (
  <div className="wrapper">
    <Navbar active_page="VIP" />

    <div className="flex justify-center">
      <div className="flex w-full py-20">
        <div className="justify-start">
          <img
            className="vip border-t-2 border-gray-900"
            src="/images/jrs-vip.png"
            alt="JRS VIP Card"
          />
        </div>
      </div>
    </div>

    <Footer />
  </div>
);

export default VIPPage;
