import React, { useState, Dispatch } from "react";
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiContactsBookUploadLine,
} from "react-icons/ri";
import { sampleNFTData } from "../utils/sample-data";

type TProps = {
  name: string;
  attributes: any;
  filter: any;
  setFilter: Dispatch<React.SetStateAction<string>>;
  metadata: any;
};

const Dropdown = ({
  name,
  attributes,
  setFilter,
  metadata,
  filter,
}: TProps) => {
  const [isActive, setIsActive] = useState(false);

  const [checkedState, setCheckedState] = useState(
    new Array(attributes.length).fill(false)
  );

  const attributesCategory = {
    Skeleton: 1,
    Teeth: 2,
    Eyes: 3,
    Bandanas: 4,
    EyeCover: 5,
    Cloths: 6,
    Accessories: 7,
    Hats: 8,
    InMouth: 9,
    Beard: 10,
  };

  const updateFilter = (attributeName: string) => {
    const filteredArr = metadata;
    const categoryIndex = attributesCategory[name.replace(/ /g, "")];

    console.log(filteredArr);

    setFilter(
      filteredArr.filter(
        (item) => item.attributes[categoryIndex].value === attributeName
      )
    );
  };

  const handleOnChange = (position: any, attributeName: string) => {
    const updatedIndex = false;

    const updatedCheckedState = checkedState.map((item, index) => {
      if (position !== index && item) setFilter(metadata);
      return index === position || (position !== index && item) ? !item : item;
    });

    console.log(filter);

    setCheckedState(updatedCheckedState);

    // Filter metadata if attribute selected
    if (updatedCheckedState[position]) updateFilter(attributeName);
    else setFilter(metadata);

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
