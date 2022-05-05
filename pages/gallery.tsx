import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

import { sampleNFTData } from "../utils/sample-data";
import Dropdown from "../components/Dropdown";

const GalleryPage = () => (
  <div className="wrapper">
    <Navbar active_page="Gallery" />

    <div className="gallery-container">
      <div className="container m-auto px-10 ">
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-3">
            <h2 className="font-semibold welcome-title text-white text-1lg mr-auto">
              GALLERY
            </h2>
          </div>
          <div className="col-span-1 w-60">
            {sampleNFTData.map(({ name, attributes }) => (
              <Dropdown key={name} name={name} attributes={attributes} />
            ))}
          </div>
          <div className="col-span-2 bg-red-200">02</div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
);

export default GalleryPage;
