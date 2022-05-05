import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

import { sampleNFTData } from "../utils/sample-data";
import Dropdown from "../components/Dropdown";
import Image from "../components/Image";

const GalleryPage = ({ data }) => {
  console.log(data);

  return (
    <div className="wrapper">
      <Navbar active_page="Gallery" />

      <div className="gallery-container py-5">
        <div className="container m-auto ">
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
            <div className="col-span-2 bg-red-200">
              1
              {/* {data.map((metadata, index) => (
                <Image
                  key={index}
                  src={metadata.image}
                  alt={metadata.description}
                  width="300"
                  height="300"
                />
              ))} */}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(
    `https://bafybeib76xx535qg7gsm5x537zz5wyzlwhfqx6twekjhgkxtgsfk66cqzy.ipfs.dweb.link/json/_metadata.json`
  );
  const data = await res.json();
  // Pass data to the page via props
  return { props: { data } };
}

export default GalleryPage;
