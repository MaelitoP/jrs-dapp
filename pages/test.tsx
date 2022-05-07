import React, { useState } from "react";
import axios from "axios";

import InfiniteScroll from "../components/InfiniteScroll";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

import { sampleNFTData } from "../utils/sample-data";
import Dropdown from "../components/Dropdown";
import Image from "../components/Image";

const TestPage = ({ metadata }) => {
  const [count, setCount] = useState({
    prev: 0,
    next: 10,
  });

  const [hasMore, setHasMore] = useState(true);
  const [current, setCurrent] = useState(
    metadata.slice(count.prev, count.next)
  );

  const getMoreData = () => {
    if (current.length === metadata.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setCurrent(
        current.concat(metadata.slice(count.prev + 10, count.next + 10))
      );
    }, 2000);
    setCount((prevState) => ({
      prev: prevState.prev + 10,
      next: prevState.next + 10,
    }));
  };

  return (
    <div className="wrapper">
      <Navbar active_page="Gallery" />

      <div className="gallery-container py-5">
        <div className="container m-auto ">
          <div className="grid grid-cols-4 gap-3">
            <div className="col-span-4">
              <h2 className="font-semibold welcome-title text-white text-1lg mr-auto">
                GALLERY
              </h2>
            </div>
            <div className="filter col-span-1">
              {sampleNFTData.map(({ name, attributes }) => (
                <Dropdown key={name} name={name} attributes={attributes} />
              ))}
            </div>
            <InfiniteScroll
              className="gallery col-span-3 grid grid-cols-3 gap-8"
              dataLength={current.length}
              next={getMoreData}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {current &&
                current.map(
                  (
                    nft: { image: string; description: string },
                    index: number
                  ) => (
                    <Image
                      key={index}
                      style={{ marginRight: 5, borderRadius: 8 }}
                      blurDataURL="https://media1.giphy.com/media/xTkcEQACH24SMPxIQg/giphy.gif?cid=ecf05e4738ueiwkbt9433t8ezfdj9ivu1z0fv188vms7q7vb&rid=giphy.gif&ct=g"
                      placeholder="blur"
                      src={nft.image}
                      alt={nft.description}
                      width="255"
                      height="255"
                      priority
                    />
                  )
                )}
            </InfiniteScroll>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  // Fetch data from external API
  const res = await axios.get(
    "https://bafybeievgx7rdlemudnvgyto5t2wq2mpnlg66blpa3uyqzdat5i5yrumva.ipfs.dweb.link/json/_metadata.json",
    {
      headers: {
        Accept: "application/json, text/plain, */*",
        "User-Agent": "*",
      },
    }
  );

  const metadata = res.data;
  // Pass data to the page via props
  return { props: { metadata } };
}

export default TestPage;
