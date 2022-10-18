import React from "react";
import * as d3 from "d3";
import { useRecoilState } from "recoil";
import { currentState } from "../../../atoms";

interface DynamicChart_Props {}

const Arc = ({ arcData }: any) => {
  const tag_ = {
    collectible: "blue",
    transaction: "lightblue",
    exchange: "gray",
    social: "white",
    governance: "yellow",
  };
  const network_ = {
    ethereum: "yellow",
    xdai: "lightblue",
    polygon: "brown",
    binance_smart_chain: "slategrey",
  };
  const type_ = {
    transfer: "pink",
    mint: "green",
    swap: "gray",
    poap: "slategrey",
    trade: "lightblue",
    post: "purple",
    profile: "orangered",
    vote: "red",
  };
  const platform_ = {
    poap: "purple",
    Snapshot: "orangered",
    OpenSea: "blue",
    MetaMask: "lightblue",
    Uniswap: "gray",
    SushiSwap: "white",
    Lens: "red",
    undefined: "orange",
  };

  let w1 = 302;
  let h1 = 412;
  const [currentState_, setCurrentState_] = useRecoilState(currentState);
  var radius = Math.min(w1, h1) / 2.2;
  const arc = d3
  .arc()
  .innerRadius(radius * 0.4)
  .outerRadius(radius * 0.7);
  
    const getColor = () => {
        return currentState_ == "tag"
        ? tag_[arcData.data[0]]
        : currentState_ == "type"
        ? type_[arcData.data[0]]
        : currentState_ == "network"
        ? network_[arcData.data[0]]
        : platform_[arcData.data[0]]
    }
    return (
        <path
        className={`opacity-60`}
      d={arc(arcData)}
      fill={getColor()}
    />
  );
};

const DynamicChart_ = ({ data, x, y }: DynamicChart_Props) => {
  const pie = d3.pie().padAngle(0.05).value((d) => parseFloat(d[1]));

  const [currentState_, setCurrentState_] = useRecoilState(currentState);
  const getData = (userInput: any) => {
    let platform__ = [];
    data.forEach((element) => {
      platform__.push(element[userInput]);
    });
    platform__ = [...new Set(platform__)];
    let platformObj = new Map();
    platform__.forEach((data__) => {
      platformObj.set(data__, 0);
    });
    data.forEach((element) => {
      platformObj.set(
        element[userInput],
        platformObj.get(element[userInput]) + 1
      );
    });

    return platformObj;
  };

  const getMap = (_currentData) => {
    let keys_ = [...getData(_currentData).keys()];
    let values_ = [...getData(_currentData).values()];
    let result_ = new Map();
    if (keys_.length == values_.length) {
      keys_.forEach((item, index, arr) => {
        result_.set(item ? item : "undefined", values_[index]);
        console.log(arr);
      });
    } else {
      return 0;
    }
    return result_;
  };

  console.log(getMap())
  return (
    <g transform={`translate(${x}, ${y})`}>
      {pie(getMap(currentState_)).map((d) => {
        console.log(d)
        return <Arc key={d.index} arcData={d} />
      })}
    </g>
  );
};

export default DynamicChart_;
