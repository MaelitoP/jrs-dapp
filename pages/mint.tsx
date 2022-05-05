import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

const MintPage = () => (
  <div className="wrapper">
    <Navbar active_page="Mint" />

    <div className="flex justify-center items-center h-screen -mt-14">
      <div className="max-w-md w-full p-10 border-dashed border-[1px] border-teal-200 bg-transparent rounded-xl shadow-lg">
        <div className="grid gap-8 grid-cols-1">
          <div className="flex flex-col ">
            <div className="flex flex-col sm:flex-row items-center">
              <h2 className="font-semibold welcome-title text-white text-1lg mr-auto">
                MINT THE COLLECTION
              </h2>
              <div className="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div>
            </div>

            <div className="mt-5">
              <div className="form">
                <div className="md:flex flex-row md:space-x-4 w-full text-xs">
                  <div className="mb-3 space-y-2 w-full text-xs">
                    <label className="font-semibold text-gray-600 py-2">
                      Price
                    </label>
                    <input
                      defaultValue="0"
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                      required
                      type="number"
                    />
                    <p className="text-red text-xs hidden">
                      Please fill out this field.
                    </p>
                  </div>
                  <div className="mb-3 space-y-2 w-full text-xs">
                    <div className="">
                      <label className="font-semibold text-gray-600 py-2">
                        How many ?
                      </label>

                      <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-2 ">
                        <button className="bg-gray-200 text-grey-darker hover:text-gray-700 hover:bg-gray-300 h-full w-20 rounded-l-lg cursor-pointer outline-none">
                          <span className="items-center text-2xl font-thin">
                            -
                          </span>
                        </button>

                        <input
                          type="number"
                          className="outline-none focus:outline-none block text-center w-full bg-grey-lighter text-grey-darker font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700 border border-grey-lighter outline-none"
                          defaultValue="0"
                        ></input>
                        <button className="bg-gray-200 text-grey-darker hover:text-gray-700 hover:bg-gray-300 h-full w-20 rounded-r-lg cursor-pointer">
                          <span className="m-auto text-2xl font-thin">+</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-9">
                  <button className="relative group overflow-hidden px-14 h-10 rounded-full flex space-x-2 items-center bg-gradient-to-r from-green-300 via-yellow-300 to-pink-300 mt-5">
                    <span className="relative text-sm font-medium text-white">
                      MINT NOW
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
);

export default MintPage;
