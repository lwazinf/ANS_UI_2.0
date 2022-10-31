import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { useRecoilState } from "recoil";
import { currentState, hoverData, hudAux, showNews } from "../../../atoms";

const Arc = ({ arcData }: any) => {

  // variables
  const [pieData0_, setPieData0_] = useState(0);
  const [pieData1_, setPieData1_] = useState("");
  const [radiusAux_, setradiusAux_] = useState(0);
  const [hoverData_, setHoverData_] = useRecoilState(hoverData);
  const [hudAux_, setHudAux_] = useRecoilState(hudAux);
  const [showNews_, setShowNews_] = useRecoilState(showNews);
  const [currentState_, setCurrentState_] = useRecoilState(currentState);

  let w = 302;
  let h = 412;
  var radius = Math.min(w, h) / 2.2;

  // colors for each category
  const tag_ : any = {
    collectible: "blue",
    transaction: "lightblue",
    exchange: "gray",
    social: "white",
    governance: "yellow",
  };
  const network_ : any = {
    ethereum: "yellow",
    xdai: "lightblue",
    polygon: "brown",
    binance_smart_chain: "slategrey",
  };
  const type_ : any = {
    transfer: "pink",
    mint: "green",
    swap: "gray",
    poap: "slategrey",
    trade: "lightblue",
    post: "purple",
    profile: "orangered",
    vote: "red",
  };
  const platform_ : any = {
    poap: "purple",
    Snapshot: "orangered",
    OpenSea: "blue",
    MetaMask: "lightblue",
    Uniswap: "gray",
    SushiSwap: "white",
    Lens: "red",
    undefined: "orange",
  };

  const getColor = () => {
    return currentState_ == "tag"
      ? tag_[arcData.data[0]]
      : currentState_ == "type"
      ? type_[arcData.data[0]]
      : currentState_ == "network"
      ? network_[arcData.data[0]]
      : platform_[arcData.data[0]];
  };

// 👇👇👇 'Arcs' make up the pie chart, initiated here 
  const arc = d3
    .arc()
    .innerRadius(
      radius * 0.4 + (hoverData_[0] == arcData.data[0] ? radiusAux_ : -5)
    )
    .outerRadius(
      radius * 0.7 + (hoverData_[0] == arcData.data[0] ? radiusAux_ : -5)
    );

  const mouseOver = (data_ : any) => {
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

  return (
    // 👇👇👇 these are the segments of the pie chart
    <path
      className={`
      ${
        // 👇👇👇 Arc is highlighted if mouse hovers over either a bubble or an arc itself.
        pieData1_ == arcData.data[0] || hoverData_[0] == arcData.data[0]
          ? "opacity-100"
          : "opacity-60"
      } 
      transition-all duration-100
      `}
        // 👇👇👇 Arc data is passed here, its size, start and end angles, etc..
        // @ts-ignore
      d={arc(arcData)}
        // 👇👇👇 Arc Using the arc data, an arc's color is generated here..
      fill={getColor()}
      onMouseOver={() => {
        // 👇👇👇 Arc selection..
        mouseOver(arcData);
      }}
      onMouseOut={mouseOut}
    />
  );
};

// 👇👇👇 Main functional component, receives data and sizes: x = width, y = height

interface PieChart_Props {
  data: any,
  x: any,
  y: any
}

const PieChart_ = ({ data, x, y }: PieChart_Props) => {
  const [currentState_, setCurrentState_] = useRecoilState(currentState);
  const [percentage_, setPercentage_] = useState(0);

  // 👇👇👇 D3 Pie object is initiated
  const pie = d3
    .pie()
    .startAngle(0)
    .endAngle(percentage_ * Math.PI * 2)
    .padAngle(0.05)
    .value((d:any) => parseFloat(d[1]));

  // 👇👇👇 Gets total values per category, makes a map
  const getData = (userInput: any) => {
    let platform__ : any = [];
    data.forEach((element : any) => {
      platform__.push(element[userInput]);
    });
    // @ts-ignore
    platform__ = [...new Set(platform__)];
    let platformObj = new Map();
    platform__.forEach((data__ : any) => {
      platformObj.set(data__, 0);
    });
    data.forEach((element : any) => {
      platformObj.set(
        element[userInput],
        platformObj.get(element[userInput]) + 1
      );
    });

    return platformObj;
  };

  // 👇👇👇 Processing data before we pass it to D3, creates a clean object  for D3 to use.
  const getMap = (_currentData : any) => {
    // @ts-ignore
    let keys_ = [...getData(_currentData).keys()];
    // @ts-ignore
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
    // 👇👇👇 The pie chart initial transition code
    setPercentage_(0);

    d3.selection()
      .transition("pie-reveal")
      .duration(3000)
      .tween("Percentage_", () => {
        const percentInterpolate = d3.interpolate(percentage_, 100);
        return (t : any) => setPercentage_(percentInterpolate(t));
      });
  }, [data]);

  return (

// 👇👇👇 D3 canvas <g></g> contains the whole chart..
<g transform={`translate(${x}, ${y})`}>
  {/* 👇👇👇 Pie Arcs are drawn on this canvas using the map function */}
    {/* @ts-ignore */}
      {pie(getMap(currentState_)).map((d) => {
        return <Arc key={d.index} arcData={d} />;
      })}
    </g>
  );
};

export default PieChart_;
