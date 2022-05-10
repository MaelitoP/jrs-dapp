import React, { useState, Dispatch } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { sampleNFTData } from "../utils/sample-data";

type TProps = {
  name: string;
  attributes: any;
  setFilter: Dispatch<React.SetStateAction<string>>;
  metadata: any;
};

const Dropdown = ({ name, attributes, setFilter, metadata }: TProps) => {
  const [isActive, setIsActive] = useState(false);

  const [checkedState, setCheckedState] = useState(
    new Array(attributes.length).fill(false)
  );

  // Get number of attributes / category
  const attributesByCategory = [
    sampleNFTData[0].attributes.length,
    sampleNFTData[1].attributes.length,
    sampleNFTData[2].attributes.length,
    sampleNFTData[3].attributes.length,
    sampleNFTData[4].attributes.length,
    sampleNFTData[5].attributes.length,
    sampleNFTData[6].attributes.length,
    sampleNFTData[7].attributes.length,
    sampleNFTData[8].attributes.length,
    sampleNFTData[9].attributes.length,
  ];

  const updateFilter = (attributeName: string) => {
    const filteredArr = metadata;

    checkedState.forEach((value, index) => {
      console.log(value, index);
    });

    setFilter(filteredArr);
  };

  const handleOnChange = (position: any, attributeName: string) => {
    const updatedCheckedState = checkedState
      .map((item, index) => (position !== index && item ? !item : item))
      .map((item, index) => (index === position ? !item : item));
    setCheckedState(updatedCheckedState);

    updateFilter(attributeName);
    // Filter metadata if attribute selected
    // if (updatedCheckedState[position]) updateFilter(attributeName);
    // else setFilter(metadata);

    setIsActive(false);
  };

  return (
    <div className="filter-item mb-5 border-b-[1px] border-gray-600">
      <div className="filter-title" onClick={() => setIsActive(!isActive)}>
        <div className="italic">{name}</div>
        <div>{isActive ? <RiArrowUpSLine /> : <RiArrowDownSLine />}</div>
      </div>
      {isActive && (
        <div className="filter-content">
          {attributes.map(({ name }, index) => {
            return (
              <div key={index}>
                <label className="inline-flex items-center mt-2">
                  <input
                    className="rounded ring-0 focus:ring-0 hover:ring-0 ring-offset-0 ring-offset-transparent ring-transparent outline-offset-0 form-checkbox border-transparent border-0 h-5 w-5 bg-gray-800 text-teal-600"
                    type="checkbox"
                    name={name}
                    value={name}
                    checked={checkedState[index]}
                    onChange={() => handleOnChange(index, name)}
                  />
                  <span className="ml-2 text-gray-400">{name}</span>
                </label>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
