import React, { useState } from "react";
import { RiArrowDownSLine, RiArrowRightSLine } from "react-icons/ri";

type TProps = {
  name: string;
  attributes: any;
};

const Dropdown = ({ name, attributes }: TProps) => {
  const [isActive, setIsActive] = useState(false);

  const [checkedState, setCheckedState] = useState(
    new Array(attributes.length).fill(false)
  );

  const handleOnChange = (position: any) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
  };

  return (
    <div className="filter-item mb-5">
      <div className="filter-title" onClick={() => setIsActive(!isActive)}>
        <div>{name}</div>
        <div>{isActive ? <RiArrowDownSLine /> : <RiArrowRightSLine />}</div>
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
                    onChange={() => handleOnChange(index)}
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
