import React, { useState, useEffect } from "react";
import axios from "axios";

import InfiniteScroll from "../components/InfiniteScroll";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

import { sampleNFTData } from "../utils/sample-data";
import Dropdown from "../components/Dropdown";
import Image from "../components/Image";

const GalleryPage = ({ metadata }) => {
  const [filter, setFilter] = useState(metadata);

  const [count, setCount] = useState({
    prev: 0,
    next: 10,
  });

  const [filterItems, setFilterItems] = useState(new Array(10).fill(null));
  const [hasMore, setHasMore] = useState(true);
  const [current, setCurrent] = useState(filter.slice(count.prev, count.next));

  const getDataWithoutFilter = () => {
    let updatedData = metadata;
    for (let attribute of filterItems) {
      if (attribute) {
        updatedData = updatedData.filter(
          (item) =>
            item.attributes[filterItems.indexOf(attribute)].value === attribute
        );
      }
    }

    return updatedData;
  };

  const getMoreData = () => {
    if (current.length === filter.length) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      setCurrent(
        current.concat(filter.slice(count.prev + 10, count.next + 10))
      );
    }, 1000);

    setCount((prevState) => ({
      prev: prevState.prev + 10,
      next: prevState.next + 10,
    }));
  };

  useEffect(() => {
    console.log("Filter Data updated: ", filterItems);
    console.log("New metadata: ", getDataWithoutFilter());
  }, [filterItems]);

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
                <Dropdown
                  key={name}
                  categoryName={name}
                  attributes={attributes}
                  filterItems={filterItems}
                  setFilterItems={setFilterItems}
                />
              ))}
            </div>

            <InfiniteScroll
              className="gallery col-span-3 grid grid-cols-3 gap-8"
              dataLength={filter.length}
              next={getMoreData}
              hasMore={hasMore}
              loader={<></>}
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

export default GalleryPage;
