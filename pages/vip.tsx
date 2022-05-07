import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import { Accordion } from "../components/Accordion";

const VIPPage = () => (
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

        <div className="flex justify-center mt-14">
          <button className="relative group overflow-hidden px-14 h-12 rounded-full flex space-x-2 items-center bg-gradient-to-r from-green-300 via-yellow-300 to-pink-300">
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

export default VIPPage;
