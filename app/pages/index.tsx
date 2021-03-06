import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import Link from "next/link";

const IndexPage = () => (
  <div className="wrapper">
    <Navbar active_page="Home" />

    <div className="content mb-5 lg:mb-0 row">
      <div className="mb-4 lg:mb-5">
        <div className="row">
          <div className="px-0 col-12">
            <img
              className="mx-auto w-100"
              src="./images/jrs-welcome-3.jpg"
              alt="JRS Welcome"
            />
          </div>
        </div>
      </div>

      <div className="flex col-span-12 lg:col-span-4">
        <div className="flex welcome lg:pt-4 row">
          <div className="border-bottom px-0 ml-3 lg:ml-0 col-span-9">
            <h1 className="welcome-title mb-3">
              WELCOME TO
              <br />
              THE JRS COLLECTION
            </h1>
            <Link href="/gallery">
              <button
                className="welcome-btn bg-teal-400 mb-4 w-100 hover:bg-white"
                type="button"
              >
                SEE THE GALLERY
              </button>
            </Link>
          </div>
          <div className="scroll m-auto pr-0 col-span-2">
            <div className="animate-pulse discover rotate">← DISCOVER</div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
);

export default IndexPage;
