import React from "react";

type Props = {
  name: string;
  uri: string;
};

const Wallet = ({ name, uri }: Props) => (
  <div className="grid col-span-4 relative mb-2">
    <div className="flex group shadow-lg bg-white py-6 pr-6 pl-9 rounded-lg">
      <div className="w-10 h-10">
        <img src={`./images/wallet/${uri}.png`} alt={`${name} logo`} />
      </div>
      <h3 className="ml-4 text-3xs font-bold">{name}</h3>
      <div className="bg-teal-400 group-hover:bg-cyan-200 h-full w-4 absolute top-0 left-0"></div>
    </div>
  </div>
);

export default Wallet;
