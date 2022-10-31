import {
  faBoxesStacked,
  faCoins,
  faTag,
  faTowerBroadcast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { select } from "d3-selection";
import { createRef, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import {
  extendDash,
  hudAux,
  isDarkMode,
  hoverData,
  currentState,
  showNews,
} from "../../../atoms";
import * as d3 from "d3";
import { drag } from "d3";

interface VisualsProps {
  data: any;
}

const Visuals = ({ data }: VisualsProps) => {
  const [currentData_, setCurrentData_] = useRecoilState(currentState);

  const [showNews_, setShowNews_] = useRecoilState(showNews);

  const [piePerc_, setPiePerc_] = useState(0);

  // Everything on this element is Light/Dark theme ready..
  const [isDark_, setIsDark_] = useRecoilState(isDarkMode);
  // Storing hover element data..
  const [hoverData_, setHoverData_] = useRecoilState(hoverData);
  // Clicking "assets/Transactions" reveals one of two dashboard views.. Dash is the Recoil atom which changes the ui
  const [dash_, setDash_] = useRecoilState(extendDash);
  // Made to send dashboard control signal
  const [hudAux_, setHudAux_] = useRecoilState(hudAux);

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

  const svgRef0 = createRef<HTMLDivElement>();
  let w0 = 902;
  let h0 = 412;

  const svgRef1 = createRef<HTMLDivElement>();
  let w1 = 302;
  let h1 = 412;

  var radius = Math.min(w1, h1) / 2.2;

  let z = data.map((obj : any) => {
    return !isNaN(parseFloat(obj.fee)) ? parseFloat(obj.fee) * 25 : 0;
  });

  const getData = (userInput: any) => {
    let platform__ : any = [];
    data.forEach((element : any) => {
      platform__.push(element[userInput]);
    });
    // @ts-ignore
    platform__ = [...new Set(platform__)];
    // @ts-ignore
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

  useEffect(() => {
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
      .attr("r", (d : any) => {
        return radiusScale(parseFloat(d.fee) * 8000);
      })
      .attr("fill", (d : any) => {
        if (currentData_ == "tag") {
          return tag_[d.tag];
        } else if (currentData_ == "type") {
          return type_[d.type];
        } else if (currentData_ == "platform") {
          return platform_[d.platform];
        } else {
          return network_[d.network];
        }
      })
      .call(
        // @ts-ignore
        drag().on("start", dragstarted).on("drag", dragged).on("end", dragended)
      )
      .on("mouseenter", function (d: any, i: any) {
        d3.select(this)
          .transition()
          .duration(200)
          .style("opacity", "1")
          .attr("r", (d : any, i : any) => {
            return radiusScale(parseFloat(d.fee) * 8500);
          });

        if (currentData_ == "network") {
          setHoverData_([i.network, parseFloat(i.fee).toFixed(2)]);
        } else if (currentData_ == "platform") {
          setHoverData_([i.platform, parseFloat(i.fee).toFixed(2)]);
        } else if (currentData_ == "tag") {
          setHoverData_([i.tag, parseFloat(i.fee).toFixed(2)]);
        } else if (currentData_ == "type") {
          setHoverData_([i.type, parseFloat(i.fee).toFixed(2)]);
        }
      })
      .on("mousemove", function (d, i) {})
      .on("mouseleave", function (d: any, i: any) {
        d3.select(this)
          .transition()
          .duration(200)
          .style("opacity", "0.6")
          .attr("r", (d: any, i) => {
            return radiusScale(parseFloat(d.fee) * 8000);
          });

        if (!showNews_) {
          setHoverData_(["", 0]);
        } else {
          setHoverData_(["news", 0]);
        }
      });

    function dragstarted(event: any, node: any) {
      if (!event.active) simulation.alphaTarget(1).restart();
      (node.fx = node.x), (node.fy = node.y);
    }

    function dragged(event: any, node: any) {
      (node.fx = event.x), (node.fy = event.y);
    }

    function dragended(event: any, node: any) {
      if (!event.active) simulation.alphaTarget(0);
      (node.fx = null), (node.fy = null);
    }

    // User Inputs

    d3.select("#type_").on("click", () => {
      setCurrentData_("type");
      circles.attr("fill", (d: any) => {
        return type_[d.type];
      });
    });

    d3.select("#tag_").on("click", () => {
      setCurrentData_("tag");
      circles.attr("fill", (d: any) => {
        return tag_[d.tag];
      });
    });

    d3.select("#network_").on("click", () => {
      setCurrentData_("network");
      circles.attr("fill", (d: any) => {
        return network_[d.network];
      });
    });

    d3.select("#platform_").on("click", () => {
      setCurrentData_("platform");
      circles.attr("fill", (d: any) => {
        return platform_[d.platform];
      });
    });

    const simulation = d3
      .forceSimulation()
      .force("x", d3.forceX().strength(0.0005))
      .force("y", d3.forceX().strength(0.0005))
      .force("charge", d3.forceManyBody().strength(1))
      .force("centerStage", d3.forceCenter(w0 / 2.5, h0 / 2))
      .force(
        "collide",
        d3.forceCollide((d) => {
          // @ts-ignore
          return radiusScale(parseFloat(d.fee) * 8000) + 1.5;
        })
      );

    const ticked = () => {
      circles
        .attr("cx", (d: any) => {
          return d.x;
        })
        .attr("cy", (d: any) => {
          return d.y + 1;
        });
    };

    simulation.nodes(data).on("tick", ticked);
  }, []);

  return (
    <div
      className={`w-full h-full flex flex-row justify-start items-center relative overflow-hidden`}
      onClick={() => {}}
      id={"plateArea"}
    >
      <div
        className={`flex flex-row justify-center items-center overflow-hidden relative ${
          dash_
            ? "w-[452px] duration-400 pl-[180px]"
            : "w-[" + w0 + "px] duration-200"
        } transition-all`}
      >
        <div
          className={`flex flex-row justify-center items-center ${
            dash_ ? "duration-400" : "duration-[1500ms]"
          } transition-all`}
          ref={svgRef0}
        ></div>
      </div>

      <div
        className={`w-[150px] h-[200px] absolute left-[60px] top-[90px] flex flex-col justify-center items-end rounded-[4px] pr-[30px] ${
          dash_
            ? "opacity-0 duration-400 pointer-events-none"
            : "opacity-80 duration-[1500ms] pointer-events-auto"
        } transition-all`}
        onClick={() => {}}
      >
        <div
          className={`${
            currentData_ == "tag" ? "w-[90px]" : "w-[20px] hover:w-[100px]"
          } cursor-pointer duration-[200ms] transition-all my-[5px] flex flex-row relative overflow-hidden`}
        >
          <div
            className={`w-[100px] h-full absolute left-0 pl-[30px] font-medium text-[15px] ${
              isDark_ ? "text-white/80" : "text-black"
            } flex flex-col justify-center hover:opacity-100 ${
              currentData_ == "tag" ? "opacity-100" : "opacity-0"
            } duration-300 transition-all _displayFont1 font-[100]`}
            onClick={() => {
              setCurrentData_("tag");
            }}
            onMouseEnter={() => {
              setHoverData_(["dashboard0", -99]);
            }}
            onMouseLeave={() => {
              if (!showNews_) {
                setHoverData_(["", 0]);
              } else {
                setHoverData_(["news", 0]);
              }
            }}
            id={`tag_`}
          >
            Tag
          </div>
          <FontAwesomeIcon
            icon={faTag}
            className={`text-center duration-[200ms] transition-all ${
              isDark_
                ? "hover:text-white text-white/80"
                : "hover:text-black text-black"
            } w-[20px] h-[20px]`}
          />
        </div>

        <div
          className={`${
            currentData_ == "network" ? "w-[90px]" : "w-[20px] hover:w-[100px]"
          } cursor-pointer duration-[200ms] transition-all my-[5px] flex flex-row relative overflow-hidden`}
        >
          <div
            className={`w-[100px] h-full absolute left-0 pl-[30px] font-medium text-[15px] ${
              isDark_ ? "text-white/80" : "text-black"
            } flex flex-col justify-center hover:opacity-100 ${
              currentData_ == "network" ? "opacity-100" : "opacity-0"
            } duration-300 transition-all _displayFont1 font-[100]`}
            onClick={() => {
              setCurrentData_("network");
            }}
            onMouseEnter={() => {
              setHoverData_(["dashboard0", -96]);
            }}
            onMouseLeave={() => {
              if (!showNews_) {
                setHoverData_(["", 0]);
              } else {
                setHoverData_(["news", 0]);
              }
            }}
            id={`network_`}
          >
            Network
          </div>
          <FontAwesomeIcon
            icon={faTowerBroadcast}
            className={`text-center duration-[200ms] transition-all ${
              isDark_
                ? "hover:text-white text-white/80"
                : "hover:text-black text-black"
            } w-[20px] h-[20px]`}
          />
        </div>

        <div
          className={`${
            currentData_ == "type" ? "w-[90px]" : "w-[20px] hover:w-[100px]"
          } cursor-pointer duration-[200ms] transition-all my-[5px] flex flex-row relative overflow-hidden`}
        >
          <div
            className={`w-[100px] h-full absolute left-0 pl-[30px] font-medium text-[15px] ${
              isDark_ ? "text-white/80" : "text-black"
            } flex flex-col justify-center hover:opacity-100 ${
              currentData_ == "type" ? "opacity-100" : "opacity-0"
            } duration-300 transition-all _displayFont1 font-[100]`}
            onClick={() => {
              setCurrentData_("type");
            }}
            onMouseEnter={() => {
              setHoverData_(["dashboard0", -98]);
            }}
            onMouseLeave={() => {
              if (!showNews_) {
                setHoverData_(["", 0]);
              } else {
                setHoverData_(["news", 0]);
              }
            }}
            id={`type_`}
          >
            Type
          </div>
          <FontAwesomeIcon
            icon={faBoxesStacked}
            className={`text-center duration-[200ms] transition-all ${
              isDark_
                ? "hover:text-white text-white/80"
                : "hover:text-black text-black"
            } w-[20px] h-[20px]`}
          />
        </div>
        <div
          className={`${
            currentData_ == "platform" ? "w-[90px]" : "w-[20px] hover:w-[100px]"
          } cursor-pointer duration-[200ms] transition-all my-[5px] flex flex-col relative overflow-hidden`}
        >
          <div
            className={`w-[100px] h-full absolute left-0 pl-[30px] font-medium text-[15px] ${
              isDark_ ? "text-white/80" : "text-black"
            } flex flex-col justify-center hover:opacity-100 ${
              currentData_ == "platform" ? "opacity-100" : "opacity-0"
            } duration-300 transition-all _displayFont1 font-[100]`}
            onClick={() => {
              setCurrentData_("platform");
            }}
            onMouseEnter={() => {
              setHoverData_(["dashboard0", -97]);
            }}
            onMouseLeave={() => {
              if (!showNews_) {
                setHoverData_(["", 0]);
              } else {
                setHoverData_(["news", 0]);
              }
            }}
            id={`platform_`}
          >
            Platform
          </div>
          <FontAwesomeIcon
            icon={faCoins}
            className={`text-center duration-[200ms] transition-all ${
              isDark_
                ? "hover:text-white text-white/80"
                : "hover:text-black text-black/80"
            } w-[20px] h-[20px]`}
          />
        </div>
      </div>

      <div
        className={`flex flex-row justify-center items-center w-full h-[80px] rounded-[4px] absolute left-[50px] bottom-[0px] ${
          dash_
            ? "opacity-0 duration-400"
            : "opacity-80 duration-[1500ms] hover:opacity-30"
        } transition-all duration-400`}
      >
        <p
          onClick={() => {}}
          className={`min-w-[20px] h-full flex flex-col mx-[10px] justify-center items-center
      ${
        isDark_ ? "text-white" : "text-black"
      } _displayFont0 font-[700] text-right relative bottom-0 text-[35px] `}
        >
          {currentData_.toUpperCase()}
        </p>

        <p
          className={`text-[16px] w-[200px] ${
            isDark_ ? "text-white/70" : "text-black"
          } text-left pointer-events-none leading-[15px] _displayFont1 font-[100]`}
        >
          {currentData_ == "network"
            ? "Transactions according to network used.."
            : currentData_ == "platform"
            ? "Transactions according to platform used.."
            : currentData_ == "tag"
            ? "Transactions according to category.."
            : "Transactions according to nature of transaction.."}
        </p>
      </div>

      <div
        className={`absolute top-[195px] right-[140px] flex flex-col ${
          dash_
            ? "opacity-0 duration-400 pointer-events-none"
            : "opacity-100 duration-[1500ms] pointer-events-auto"
        } transition-all`}
      >
        <p
          className={`text-[20px] w-[200px] ${
            isDark_ ? "text-white/70" : "text-black"
          } text-center pointer-events-none leading-[15px] _displayFont1 font-[600] relative ${
            hoverData_[0] == 0 ||
            hoverData_[0] == "ardrive" ||
            hoverData_[0] == "display" ||
            hoverData_[0] == "dashboard0" ||
            hoverData_[0] == "dashboard" ||
            hoverData_[0] == "news" ||
            hoverData_[0] == "expand"
              ? "opacity-30 duration-100 bottom-[-5px]"
              : "opacity-80 duration-100 bottom-[3px]"
          } transition-all`}
        >
          {hoverData_[0] == "ardrive" ||
          hoverData_[0] == "display" ||
          hoverData_[0] == "dashboard0" ||
          hoverData_[0] == "dashboard" ||
          hoverData_[0] == "news" ||
          hoverData_[0] == "expand"
            ? 0
            : hoverData_[1]}
        </p>
        <div
          className={`transition-all duration-[1500ms] flex flex-col justify-center items-center ${
            hoverData_[0] == 0 ? "opacity-0" : "opacity-100"
          }`}
        >
          <p
            className={`text-[17px] min-w-[200px] relative ${
              isDark_ ? "text-white/70" : "text-black"
            }  ${
              hoverData_[0] == 0 || hoverData_[0] == "ArDrive"
                ? "opacity-30 duration-100 bottom-[-10px]"
                : "opacity-80 duration-[1000ms] bottom-[0px]"
            } transition-all text-center pointer-events-none leading-[15px] _displayFont1 font-[100] opacity-60`}
          >
            {hoverData_[0] == "ardrive" ||
            hoverData_[0] == "display" ||
            hoverData_[0] == "dashboard" ||
            hoverData_[0] == "dashboard0" ||
            hoverData_[0] == "news" ||
            hoverData_[0] == "expand"
              ? ""
              : hoverData_[0]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Visuals;
