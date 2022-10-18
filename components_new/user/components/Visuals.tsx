import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import {
  faBoxesStacked,
  faCoins,
  faTag,
  faTowerBroadcast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { select } from "d3-selection";
import { createRef, useEffect, useRef, useState } from "react";
import { Bar, Pie } from "react-roughviz";
import { useRecoilState } from "recoil";
import { extendDash, hudAux, isDarkMode, hoverData } from "../../../atoms";
import * as d3 from "d3";
import { drag } from "d3";
import { values } from "lodash";
import DynamicChart_ from "./DynamicChart";
import { height } from "@mui/system";

interface VisualsProps {
  data: any;
}

const Visuals = ({ data }: VisualsProps) => {
  const [currentData, setCurrentData] = useState("tag");

  const [pieData0, setPieData0] = useState(0);
  const [pieData1, setPieData1] = useState("");

  const [piePerc_, setPiePerc_] = useState(0);

  // Everything on this element is Light/Dark theme ready..
  const [isDark_, setIsDark_] = useRecoilState(isDarkMode);
  // Storing hover element data..
  const [hoverData_, setHoverData_] = useRecoilState(hoverData);
  // Clicking "assets/Transactions" reveals one of two dashboard views.. Dash is the Recoil atom which changes the ui
  const [dash_, setDash_] = useRecoilState(extendDash);
  // Made to send dashboard control signal
  const [hudAux_, setHudAux_] = useRecoilState(hudAux);

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

  const svgRef0 = createRef<HTMLDivElement>();
  let w0 = 902;
  let h0 = 412;

  const svgRef1 = createRef<HTMLDivElement>();
  let w1 = 302;
  let h1 = 412;

  var radius = Math.min(w1, h1) / 2.2;

  let z = data.map((obj) => {
    return !isNaN(parseFloat(obj.fee)) ? parseFloat(obj.fee) * 25 : 0;
  });

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

  const clickSwitch = () => {
    let elem_ = document.getElementById("switchID");
    elem_.click();
  };

  useEffect(() => {
    const simulation = d3
      .forceSimulation()
      .force("x", d3.forceX().strength(0.0005))
      .force("y", d3.forceX().strength(0.0005))
      .force("charge", d3.forceManyBody().strength(1))
      .force("centerStage", d3.forceCenter(w0 / 2.5, h0 / 2))
      .force(
        "collide",
        d3.forceCollide((d) => {
          return radiusScale(parseFloat(d.fee) * 8000) + 1.5;
        })
      );

    const ticked = () => {
      circles
        .attr("cx", (d) => {
          return d.x;
        })
        .attr("cy", (d) => {
          return d.y + 1;
        });
    };

    // First Chart // // // // // // // // // // // //

    const refAccess0 = select(svgRef0.current)
      .append("svg")
      .attr("width", w0)
      .attr("height", h0)
      .append("g");
    // .attr("transform", `translate(0,0)`);
    // .attr("transform", `translate(${w/2},${h/2})`);

    let radiusScale = d3
      .scaleSqrt()
      .domain([Math.min(...z.filter(Number)), Math.max(...z.filter(Number))])
      .range([2, 5]);

    let circles = refAccess0
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .style("opacity", "0.6")
      .style("cursor", "pointer")
      .attr("r", (d) => {
        return radiusScale(parseFloat(d.fee) * 8000);
      })
      .attr("fill", (d) => {
        if (currentData == "tag") {
          return tag_[d.tag];
        } else if (currentData == "type") {
          return type_[d.type];
        } else if (currentData == "platform") {
          return platform_[d.platform];
        } else {
          return network_[d.network];
        }
      })
      .call(
        drag().on("start", dragstarted).on("drag", dragged).on("end", dragended)
      );

    circles
      .on("mouseenter", function (d, i) {
        d3.select(this)
          .transition()
          .duration(200)
          .style("opacity", "1")
          .attr("r", (d, i) => {
            return radiusScale(parseFloat(d.fee) * 8500);
          });

          if(currentData == 'network'){
          setHoverData_([i.network, parseFloat(i.fee)])
        }else if(currentData == 'platform'){
          setHoverData_([i.platform, parseFloat(i.fee)])
        }else if(currentData == 'tag'){
          setHoverData_([i.tag, parseFloat(i.fee)])
        }else if(currentData == 'type'){
          setHoverData_([i.type, parseFloat(i.fee)])
        }
      })
      .on("mousemove", function (d, i) {})
      .on("mouseleave", function (d, i) {
        d3.select(this)
          .transition()
          .duration(200)
          .style("opacity", "0.6")
          .attr("r", (d, i) => {
            return radiusScale(parseFloat(d.fee) * 8000);
          });

          setHoverData_(['', 0])
          pieChart.style("opacity",'0.6')
      });

    function dragstarted(event, node) {
      if (!event.active) simulation.alphaTarget(1).restart();
      (node.fx = node.x), (node.fy = node.y);
    }

    function dragged(event, node) {
      (node.fx = event.x), (node.fy = event.y);
    }

    function dragended(event, node) {
      if (!event.active) simulation.alphaTarget(0);
      (node.fx = null), (node.fy = null);
    }

    // Second Chart // // // // // // // // // // // //

    // setPiePerc_(0)

    // d3.selection()
    // .transition('pie-reveal')
    // .duration(300)
    // .tween('piePerc_', () => {
    //   const percInterpolate = d3.interpolate(
    //     piePerc_,
    //     return (t) => setPiePerc_(percInterpolate(t))
    //   )
    // })

    var pie = d3
      .pie()
      .padAngle(0.05)
      .value((d) => d[1])(getMap(currentData));

    var arc0 = d3
      .arc()
      .innerRadius(radius * 0.4)
      .outerRadius(radius * 0.7);

    var arc1 = d3
      .arc()
      .innerRadius(radius * 0.4 + 5)
      .outerRadius(radius * 0.7 + 5);

    const refAccess1 = select(svgRef1.current)
      .append("svg")
      .attr("width", w1)
      .attr("height", h1)
      .append("g")
      .attr("transform", `translate(${w1 / 2}, ${h1 / 2})`);

    var pieChart = refAccess1
      .append("g")
      .selectAll("path")
      .data(pie)
      .enter()
      .append("path");

    pieChart
      .attr("d", arc0)
      .attr("fill", (d, i) => {
        if (currentData == "tag") {
          return tag_[d.data[0]];
        } else if (currentData == "type") {
          return type_[d.data[0]];
        } else if (currentData == "platform") {
          return platform_[d.data[0]];
        } else {
          return network_[d.data[0]];
        }
      })
      .style("opacity", (d, i) => {
        if(d.data[0] == hoverData_[0]){
          return "1"
        }else{
          return "0.6"
        }
      })
      .style("cursor", "pointer")
      .on("click", () => {})
      .on("mouseenter", function (d, i) {
        clickSwitch();
        d3.select(this)
          .transition()
          .duration(100)
          .style("opacity", "1")
          .attr("d", arc1);
        setPieData0(i.data[1]);
        setPieData1(i.data[0]);

        setHoverData_(i.data);
      })
      .on("mousemove", function (d, i) {
        setPieData0(i.data[1]);
        setPieData1(i.data[0]);
      })
      .on("mouseleave", function (d, i) {
        clickSwitch();

        d3.select(this)
          .transition()
          .duration(800)
          .style("opacity", "0.6")
          .attr("d", arc0);
        setPieData0(0);
        setPieData1("");

        setHoverData_(["", 0]);
      });

    // User Inputs

    d3.select("#type_").on("click", () => {
      setCurrentData("type");
      var pie = d3
        .pie()
        .padAngle(0.05)
        .value((d) => d[1])(getMap("type"));
      pieChart.data(pie).enter();
      pieChart.exit().remove();
      pieChart.attr("d", arc0);
      pieChart
        .attr("fill", (d, i) => {
          return type_[d.data[0]];
        })
        .style("opacity", "0.6")
        .style("cursor", "pointer")
        .on("mouseenter", function (d, i) {
          d3.select(this)
            .transition()
            .duration(100)
            .style("opacity", "1")
            .attr("d", arc1);

          setPieData0(i.data[1]);
          setPieData1(i.data[0]);
        })
        .on("mousemove", function (d, i) {})
        .on("mouseleave", function (d, i) {
          d3.select(this)
            .transition()
            .duration(800)
            .style("opacity", "0.6")
            .attr("d", arc0);
        });
      circles.attr("fill", (d) => {
        return type_[d.type];
      });
    });

    d3.select("#tag_").on("click", () => {
      setCurrentData("tag");
      var pie = d3
        .pie()
        .padAngle(0.05)
        .value((d) => d[1])(getMap("tag"));
      pieChart.data(pie).enter();
      pieChart.exit().remove();
      pieChart.attr("d", arc0);
      pieChart
        .attr("fill", (d, i) => {
          return tag_[d.data[0]];
        })
        .style("opacity", "0.6")
        .style("cursor", "pointer")
        .on("mouseenter", function (d, i) {
          d3.select(this)
            .transition()
            .duration(100)
            .style("opacity", "1")
            .attr("d", arc1);

          setPieData0(i.data[1]);
          setPieData1(i.data[0]);
        })
        .on("mousemove", function (d, i) {})
        .on("mouseleave", function (d, i) {
          d3.select(this)
            .transition()
            .duration(800)
            .style("opacity", "0.6")
            .attr("d", arc0);
        });
      circles.attr("fill", (d) => {
        return tag_[d.tag];
      });
    });

    d3.select("#network_").on("click", () => {
      setCurrentData("network");
      var pie = d3
        .pie()
        .padAngle(0.05)
        .value((d) => d[1])(getMap("network"));
      pieChart.data(pie).enter();
      pieChart.exit().remove();
      pieChart.attr("d", arc0);
      pieChart
        .attr("fill", (d, i) => {
          return network_[d.data[0]];
        })
        .style("opacity", "0.6")
        .style("cursor", "pointer")
        .on("mouseenter", function (d, i) {
          d3.select(this)
            .transition()
            .duration(100)
            .style("opacity", "1")
            .attr("d", arc1);

          setPieData0(i.data[1]);
          setPieData1(i.data[0]);
        })
        .on("mousemove", function (d, i) {})
        .on("mouseleave", function (d, i) {
          d3.select(this)
            .transition()
            .duration(800)
            .style("opacity", "0.6")
            .attr("d", arc0);
        });
      circles.attr("fill", (d) => {
        return network_[d.network];
      });
    });

    d3.select("#platform_").on("click", () => {
      setCurrentData("platform");
      var pie = d3
        .pie()
        .padAngle(0.05)
        .value((d) => d[1])(getMap("platform"));
      pieChart.data(pie).enter();
      pieChart.exit().remove();
      pieChart.attr("d", arc0);
      pieChart
        .attr("fill", (d, i) => {
          return platform_[d.data[0]];
        })
        .style("opacity", "0.6")
        .style("cursor", "pointer")
        .on("mouseenter", function (d, i) {
          d3.select(this)
            .transition()
            .duration(100)
            .style("opacity", "1")
            .attr("d", arc1);

          setPieData0(i.data[1]);
          setPieData1(i.data[0]);
        })
        .on("mousemove", function (d, i) {})
        .on("mouseleave", function (d, i) {
          d3.select(this)
            .transition()
            .duration(800)
            .style("opacity", "0.6")
            .attr("d", arc0);
        });
      circles.attr("fill", (d) => {
        return platform_[d.platform];
      });
    });

    simulation.nodes(data).on("tick", ticked);
  }, []);

  return (
    <svg width={500} height={500}>
      <DynamicChart_ data={data} x={250} y={250}/>
    </svg>
    // <div
    //   className={`w-full h-full flex flex-row justify-start items-center relative overflow-hidden`}
    //   onClick={() => {}}
    //   id={"plateArea"}
    // >
    //   <div
    //     className={`flex flex-row justify-center items-center overflow-hidden relative ${
    //       dash_
    //         ? "w-[452px] duration-400 pl-[180px]"
    //         : "w-[" + w0 + "px] duration-200"
    //     } transition-all`}
    //   >
    //     <div
    //       className={`flex flex-row justify-center items-center ${
    //         dash_ ? "duration-400" : "duration-[1500ms]"
    //       } transition-all`}
    //       ref={svgRef0}
    //     ></div>
    //   </div>

    //   {/* <div
    //     className={`flex flex-row justify-center items-center w-full h-full bg-black/0 backdrop-blur-sm absolute bottom-0 opacity-30 pointer-events-none`}
    //   /> */}

    //   <div
    //     className={`w-[150px] h-[200px] absolute left-[60px] top-[90px] flex flex-col justify-center items-end rounded-[4px] pr-[30px] ${
    //       dash_
    //         ? "opacity-0 duration-400 pointer-events-none"
    //         : "opacity-80 duration-[1500ms] pointer-events-auto"
    //     } transition-all`}
    //     onClick={() => {}}
    //   >
    //     <div
    //       className={`${
    //         currentData == "tag" ? "w-[90px]" : "w-[20px] hover:w-[100px]"
    //       } cursor-pointer duration-[200ms] transition-all my-[5px] flex flex-row relative overflow-hidden`}
    //     >
    //       <div
    //         className={`w-[100px] h-full absolute left-0 pl-[30px] font-medium text-[15px] ${
    //           isDark_ ? "text-white/80" : "text-black/80"
    //         } flex flex-col justify-center hover:opacity-100 ${
    //           currentData == "tag" ? "opacity-100" : "opacity-0"
    //         } duration-300 transition-all _displayFont1 font-[100]`}
    //         onClick={() => {
    //           setCurrentData("tag");
    //         }}
    //         id={`tag_`}
    //       >
    //         Tag
    //       </div>
    //       <FontAwesomeIcon
    //         icon={faTag}
    //         className={`text-center duration-[200ms] transition-all ${
    //           isDark_
    //             ? "hover:text-white text-white/80"
    //             : "hover:text-black text-black/80"
    //         } w-[20px] h-[20px]`}
    //       />
    //     </div>

    //     <div
    //       className={`${
    //         currentData == "network" ? "w-[90px]" : "w-[20px] hover:w-[100px]"
    //       } cursor-pointer duration-[200ms] transition-all my-[5px] flex flex-row relative overflow-hidden`}
    //     >
    //       <div
    //         className={`w-[100px] h-full absolute left-0 pl-[30px] font-medium text-[15px] ${
    //           isDark_ ? "text-white/80" : "text-black/80"
    //         } flex flex-col justify-center hover:opacity-100 ${
    //           currentData == "network" ? "opacity-100" : "opacity-0"
    //         } duration-300 transition-all _displayFont1 font-[100]`}
    //         onClick={() => {
    //           setCurrentData("network");
    //         }}
    //         id={`network_`}
    //       >
    //         Network
    //       </div>
    //       <FontAwesomeIcon
    //         icon={faTowerBroadcast}
    //         className={`text-center duration-[200ms] transition-all ${
    //           isDark_
    //             ? "hover:text-white text-white/80"
    //             : "hover:text-black text-black/80"
    //         } w-[20px] h-[20px]`}
    //       />
    //     </div>

    //     <div
    //       className={`${
    //         currentData == "type" ? "w-[90px]" : "w-[20px] hover:w-[100px]"
    //       } cursor-pointer duration-[200ms] transition-all my-[5px] flex flex-row relative overflow-hidden`}
    //     >
    //       <div
    //         className={`w-[100px] h-full absolute left-0 pl-[30px] font-medium text-[15px] ${
    //           isDark_ ? "text-white/80" : "text-black/80"
    //         } flex flex-col justify-center hover:opacity-100 ${
    //           currentData == "type" ? "opacity-100" : "opacity-0"
    //         } duration-300 transition-all _displayFont1 font-[100]`}
    //         onClick={() => {
    //           setCurrentData("type");
    //         }}
    //         id={`type_`}
    //       >
    //         Type
    //       </div>
    //       <FontAwesomeIcon
    //         icon={faBoxesStacked}
    //         className={`text-center duration-[200ms] transition-all ${
    //           isDark_
    //             ? "hover:text-white text-white/80"
    //             : "hover:text-black text-black/80"
    //         } w-[20px] h-[20px]`}
    //       />
    //     </div>
    //     <div
    //       className={`${
    //         currentData == "platform" ? "w-[90px]" : "w-[20px] hover:w-[100px]"
    //       } cursor-pointer duration-[200ms] transition-all my-[5px] flex flex-col relative overflow-hidden`}
    //     >
    //       <div
    //         className={`w-[100px] h-full absolute left-0 pl-[30px] font-medium text-[15px] ${
    //           isDark_ ? "text-white/80" : "text-black/80"
    //         } flex flex-col justify-center hover:opacity-100 ${
    //           currentData == "platform" ? "opacity-100" : "opacity-0"
    //         } duration-300 transition-all _displayFont1 font-[100]`}
    //         onClick={() => {
    //           setCurrentData("platform");
    //           console.log(...getData("platform").keys());
    //         }}
    //         id={`platform_`}
    //       >
    //         Platform
    //       </div>
    //       <FontAwesomeIcon
    //         icon={faCoins}
    //         className={`text-center duration-[200ms] transition-all ${
    //           isDark_
    //             ? "hover:text-white text-white/80"
    //             : "hover:text-black text-black/80"
    //         } w-[20px] h-[20px]`}
    //       />
    //     </div>
    //   </div>

    //   <div
    //     className={`flex flex-row justify-center items-center w-full h-[80px] rounded-[4px] absolute left-[50px] bottom-[0px] ${
    //       dash_
    //         ? "opacity-0 duration-400"
    //         : "opacity-80 duration-[1500ms] hover:opacity-30"
    //     } transition-all duration-400`}
    //   >
    //     <p
    //       onClick={() => {
    //         console.log([...getData(currentData).keys()]);
    //       }}
    //       className={`min-w-[20px] h-full flex flex-col mx-[10px] justify-center items-center
    //   ${
    //     isDark_ ? "text-white" : "text-black"
    //   } _displayFont0 font-[700] text-right relative bottom-0 text-[35px] `}
    //     >
    //       {currentData.toUpperCase()}
    //     </p>

    //     <p
    //       className={`text-[16px] w-[200px] ${
    //         isDark_ ? "text-white/70" : "text-black"
    //       } text-left pointer-events-none leading-[15px] _displayFont1 font-[100]`}
    //     >
    //       {currentData == "network"
    //         ? "Transactions according to network used.."
    //         : currentData == "platform"
    //         ? "Transactions according to platform used.."
    //         : currentData == "tag"
    //         ? "Transactions according to category.."
    //         : "Transactions according to nature of transaction.."}
    //     </p>
    //   </div>

    //   <div
    //     className={`absolute top-[195px] right-[140px] flex flex-col ${
    //       dash_
    //         ? "opacity-0 duration-400 pointer-events-none"
    //         : "opacity-100 duration-[1500ms] pointer-events-auto"
    //     } transition-all`}
    //   >
    //     <p
    //       className={`text-[20px] w-[200px] ${
    //         isDark_ ? "text-white/70" : "text-black"
    //       } text-center pointer-events-none leading-[15px] _displayFont1 font-[600] relative ${
    //         pieData0 == 0
    //           ? "opacity-30 duration-200"
    //           : "opacity-80 duration-800"
    //       }`}
    //     >
    //       {pieData0}
    //     </p>
    //     <p
    //       className={`text-[17px] min-w-[200px] relative top-[5px] ${
    //         isDark_ ? "text-white/70" : "text-black"
    //       } text-center pointer-events-none leading-[15px] _displayFont1 font-[200] opacity-60`}
    //     >
    //       {pieData1}
    //     </p>
    //   </div>
    //   {/* <div
    //     className={`flex flex-col absolute right-[90px] top-0 ${
    //       dash_
    //         ? "opacity-0 duration-400 pointer-events-none"
    //         : "opacity-100 duration-[1500ms] pointer-events-auto"
    //     } transition-all`}
    //     onClick={() => {}}
    //     ref={svgRef1}
    //   ></div> */}
    //   <div
    //     className={`w-0 h-0 opacity absolute top-0 left-0`}
    //     id={"switchID"}
    //     onClick={() => {
    //       setHudAux_(!hudAux_);
    //     }}
    //   />
    // </div>
  );
};

export default Visuals;
