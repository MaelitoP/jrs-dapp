import React from "react";

type Props = {
  name: string;
  uri: string;
};

const Wallet = ({ name, uri }: Props) => (
  <div className="grid col-span-4 relative mb-2">
    <div className="flex group shadow-lg outline outline-1 outline-gray-800 bg-transparent py-2 pr-6 pl-9 rounded-lg">
      <div className="icon">
        <img src={`./images/wallet/${uri}.webp`} alt={`${name} logo`} />
      </div>
      <h3 className="ml-4 my-auto text-sm text-white font-medium">{name}</h3>
      <div className="bg-gray-800 rounded-l-lg group-hover:bg-teal-400 h-full w-4 absolute top-0 left-0"></div>
    </div>
  </div>
);

export default Wallet;
