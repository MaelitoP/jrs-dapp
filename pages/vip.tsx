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

        <div className="flex-wrap justify-center mt-14">
          <div className="w-1/3 mx-auto mb-10">
            <label className="font-light text-xs text-gray-600 py-2">
              How many ?
            </label>

            <div className="flex flex-row h-9 w-full rounded-lg relative bg-transparent mt-2 ">
              <button className="bg-gray-800 text-white hover:text-gray-700 hover:bg-gray-300 h-full w-20 rounded-l-lg cursor-pointer outline-none">
                <span className="items-center text-2xl font-thin">-</span>
              </button>

              <input
                type="number"
                className="outline-none focus:outline-none block text-center w-full bg-gray-600 font-semibold text-md hover:text-gray-200 focus:text-gray-100  md:text-basecursor-default flex items-center text-white"
                defaultValue="0"
              ></input>
              <button className="bg-gray-800 text-white hover:text-gray-700 hover:bg-gray-300 h-full w-20 rounded-r-lg cursor-pointer">
                <span className="m-auto text-2xl font-thin">+</span>
              </button>
            </div>
          </div>

          <button className="mx-auto relative group overflow-hidden px-14 h-12 rounded-full flex space-x-2 items-center bg-gradient-to-r from-green-300 via-yellow-300 to-pink-300">
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
