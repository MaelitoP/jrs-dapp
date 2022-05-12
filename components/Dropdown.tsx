import React, { useState, Dispatch } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

type TProps = {
  categoryName: string;
  attributes: any;
  filterItems: any;
  setFilterItems: Dispatch<React.SetStateAction<string[]>>;
};

const Dropdown = ({
  categoryName,
  attributes,
  filterItems,
  setFilterItems,
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

  const categoryIndex = attributesCategory[categoryName.replace(/ /g, "")];

  const addFilter = (attributeName: string) => {
    console.log("Filtre ajouté.");
    const filtered = filterItems;
    filtered[categoryIndex] = attributeName;
    setFilterItems(filtered);
    console.log(filterItems);
  };

  const removeFilter = () => {
    console.log("Filtre supprimé.");
    const filtered = filterItems;
    filtered[categoryIndex] = null;
    setFilterItems(filtered);
    console.log(filterItems);
  };

  const handleOnChange = (
    position: any,
    attributeName: string,
    value: boolean
  ) => {
    const updatedCheckedState = checkedState.map((item, index) => {
      return index === position || (position !== index && item) ? !item : item;
    });

    // Update filtered data's
    if (value) addFilter(attributeName);
    else removeFilter();

    // Update local state
    setCheckedState(updatedCheckedState);
  };

  return (
    <div className="filter-item mb-5 border-b-[1px] border-gray-600">
      <div className="filter-title" onClick={() => setIsActive(!isActive)}>
        <div className="italic">{categoryName}</div>
        <div>{isActive ? <RiArrowUpSLine /> : <RiArrowDownSLine />}</div>
      </div>
      {isActive && (
        <div className="filter-content">
          {attributes.map(({ name }, index: number) => {
            return (
              <div key={index}>
                <label className="inline-flex items-center mt-2">
                  <input
                    className="rounded ring-0 focus:ring-0 hover:ring-0 ring-offset-0 ring-offset-transparent ring-transparent outline-offset-0 form-checkbox border-transparent border-0 h-5 w-5 bg-gray-800 text-teal-600"
                    type="checkbox"
                    name={name}
                    value={name}
                    checked={checkedState[index]}
                    onChange={(e) =>
                      handleOnChange(index, name, e.target.checked)
                    }
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
