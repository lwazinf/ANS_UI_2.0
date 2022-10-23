import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { useRecoilState } from "recoil";
import { currentState, hoverData, hudAux, showNews } from "../../../atoms";

interface PieChart_Props {}

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

  const [pieData0_, setPieData0_] = useState(0);
  const [pieData1_, setPieData1_] = useState("");
  const [hoverData_, setHoverData_] = useRecoilState(hoverData);
  const [hudAux_, setHudAux_] = useRecoilState(hudAux);
  const [showNews_, setShowNews_] = useRecoilState(showNews);

  let w1 = 302;
  let h1 = 412;

  const [currentState_, setCurrentState_] = useRecoilState(currentState);
  const [radiusAux_, setradiusAux_] = useState(0);

  var radius = Math.min(w1, h1) / 2.2;

  const arc = d3
    .arc()
    .innerRadius(
      radius * 0.4 + (hoverData_[0] == arcData.data[0] ? radiusAux_ : -5)
    )
    .outerRadius(
      radius * 0.7 + (hoverData_[0] == arcData.data[0] ? radiusAux_ : -5)
    );

  const getColor = () => {
    return currentState_ == "tag"
      ? tag_[arcData.data[0]]
      : currentState_ == "type"
      ? type_[arcData.data[0]]
      : currentState_ == "network"
      ? network_[arcData.data[0]]
      : platform_[arcData.data[0]];
  };

  const mouseOver = (data_) => {
    setradiusAux_(5);
    setHudAux_(!hudAux_);
    setPieData0_(data_.data[1]);
    setPieData1_(data_.data[0]);
    setHoverData_(data_.data);
  };

  const mouseOut = () => {
    setradiusAux_(0);
    setHudAux_(!hudAux_);
    setPieData0_(0);
    setPieData1_("");
    if (!showNews_) {
      setHoverData_(["", 0]);
    } else {
      setHoverData_(["news", 0]);
    }
  };

  const getMap = (_currentData) => {
    let keys_ = [...getData(_currentData).keys()];
    let values_ = [...getData(_currentData).values()];
    let result_ = new Map();
    if (keys_.length == values_.length) {
      keys_.forEach((item, index, arr) => {
        result_.set(item ? item : "undefined", values_[index]);
      });
    } else {
      return 0;
    }
    return result_;
  };

  return (
    <path
      className={`${
        pieData1_ == arcData.data[0] || hoverData_[0] == arcData.data[0]
          ? "opacity-100"
          : "opacity-60"
      } transition-all duration-100`}
      d={arc(arcData)}
      fill={getColor()}
      onMouseOver={() => {
        mouseOver(arcData);
      }}
      onMouseOut={mouseOut}
    />
  );
};

const PieChart_ = ({ data, x, y }: PieChart_Props) => {
  const [percentage_, setPercentage_] = useState(0);
  const pie = d3
    .pie()
    .startAngle(0)
    .endAngle(percentage_ * Math.PI * 2)
    .padAngle(0.05)
    .value((d) => parseFloat(d[1]));

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
      });
    } else {
      return 0;
    }
    return result_;
  };

  useEffect(() => {
    setPercentage_(0);

    d3.selection()
      .transition("pie-reveal")
      .duration(3000)
      .tween("Percentage_", () => {
        const percentInterpolate = d3.interpolate(percentage_, 100);
        return (t) => setPercentage_(percentInterpolate(t));
      });
  }, [data]);
  return (
    <g transform={`translate(${x}, ${y})`}>
      {pie(getMap(currentState_)).map((d) => {
        return <Arc key={d.index} arcData={d} />;
      })}
    </g>
  );
};

export default PieChart_;
