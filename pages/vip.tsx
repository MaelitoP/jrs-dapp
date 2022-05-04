import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

const VIPPage = () => (
  <div className="wrapper">
    <Navbar active_page="VIP" />

    <div className="mx-auto bg-teal-500 text-white rounded shadow-xl py-5 px-5 w-full lg:w-10/12 xl:w-3/4">
      <div className="flex flex-wrap -mx-3 items-center">
        <div className="w-full sm:w-1/2 md:w-2/4 px-3 text-left">
          <div className="p-5 xl:px-8 md:py-5">
            <h3 className="text-2xl">GET YOURS NOW !</h3>
            <h5 className="text-xl mb-3">Become an early JRS Member</h5>
            <p className="text-sm text-white">
              The release of a very limited series of 88 VIP passes that give
              special advantages to its holder when combined with a JRS Pirate.
              All VIP pass holders will receive a free JRS Pirate and an
              automatic whitelist spot to mint a second JRS Pirate.
            </p>
          </div>
        </div>
        <div className="w-1/3 px-3 text-center">
          <div className="p-5 xl:px-8 md:py-5">
            <a className="block w-full py-2 px-4 rounded text-black bg-gray-200 hover:bg-white hover:text-gray-900 focus:outline-none transition duration-150 ease-in-out mb-3">
              MINT MY VIP PASS
            </a>
            <button className="w-full py-2 px-4 rounded outline outline-1 outline-black text-black bg-transparent hover:text-white hover:bg-black focus:outline-none transition duration-150 ease-in-out">
              Pick a number
            </button>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
);

export default VIPPage;
