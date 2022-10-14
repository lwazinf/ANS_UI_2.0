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
import { extendDash, isDarkMode } from "../../atoms";
import * as d3 from "d3";
import { drag } from "d3";

interface VisualsProps {
  data: any;
}

const Visuals = ({ data }: VisualsProps) => {
  const [currentData, setCurrentData] = useState("tag");

  // Everything on this element is Light/Dark theme ready..
  const [isDark_, setIsDark_] = useRecoilState(isDarkMode);

  // Clicking "assets/Transactions" reveals one of two dashboard views.. Dash is the Recoil atom which changes the ui
  const [dash_, setDash_] = useRecoilState(extendDash);

  const getData = (userInput: any) => {
    let platform_ = [];
    data.forEach((element) => {
      platform_.push(element[userInput]);
    });
    platform_ = [...new Set(platform_)];
    let platformObj = new Map();
    platform_.forEach((data__) => {
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

  const svgRef = createRef<HTMLDivElement>();

  let w = 452;
  let h = 412;

  let z = data.map((obj) => {
    return !isNaN(parseFloat(obj.fee)) ? parseFloat(obj.fee) * 25 : 0;
  });

  useEffect(() => {
    const simulation = d3
      .forceSimulation()
      .force("x", d3.forceX().strength(0.0005))
      .force("y", d3.forceX().strength(0.0005))
      .force("charge", d3.forceManyBody().strength(1))
      .force("centerStage", d3.forceCenter(w / 2, h / 2))
      .force(
        "collide",
        d3.forceCollide((d) => {
          return radiusScale(parseFloat(d.fee) * 8000) + 1.5;
        })
      );

    const refAccess = select(svgRef.current)
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .append("g");
    // .attr("transform", `translate(0,0)`);
    // .attr("transform", `translate(${w/2},${h/2})`);

    let radiusScale = d3
      .scaleSqrt()
      .domain([Math.min(...z.filter(Number)), Math.max(...z.filter(Number))])
      .range([2, 5]);

    let circles = refAccess
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("opacity", 0.8)
      .attr("r", (d) => {
        return radiusScale(parseFloat(d.fee) * 8000);
      })
      .attr("fill", (d) => {
        return d.tag == "collectible"
          ? "blue"
          : d.tag == "transaction"
          ? "lightblue"
          : d.tag == "exchange"
          ? "gray"
          : d.tag == "social"
          ? "white"
          : "yellow";
      })
      .call(
        drag().on("start", dragstarted).on("drag", dragged).on("end", dragended)
      );

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

    d3.select("#type_").on("click", () => {
      circles.attr("fill", (d) => {
        return d.type == "mint"
          ? "green"
          : d.type == "transfer"
          ? "orange"
          : d.type == "swap"
          ? "gray"
          : d.type == "vote"
          ? "red"
          : d.type == "poap"
          ? "slategrey"
          : d.type == "social"
          ? "pink"
          : d.type == "trade"
          ? "lightblue"
          : d.type == "post"
          ? "purple"
          : d.type == "vote"
          ? "orangered"
          : "white";
      });
    });

    d3.select("#tag_").on("click", () => {
      circles.attr("fill", (d) => {
        return d.tag == "collectible"
          ? "blue"
          : d.tag == "transaction"
          ? "lightblue"
          : d.tag == "exchange"
          ? "gray"
          : d.tag == "social"
          ? "white"
          : "yellow";
      });
    });

    d3.select("#network_").on("click", () => {
      circles.attr("fill", (d) => {
        return d.network == "ethereum"
          ? "blue"
          : d.network == "polygon"
          ? "brown"
          : d.network == "xdai"
          ? "gray"
          : "white";
      });
    });

    d3.select("#platform_").on("click", () => {
      circles.attr("fill", (d) => {
        return d.platform == "OpenSea"
          ? "blue"
          : d.platform == "MetaMask"
          ? "lightblue"
          : d.platform == "Uniswap"
          ? "gray"
          : d.platform == "SushiSwap"
          ? "white"
          : d.platform == "Lens"
          ? "red"
          : "orange";
      });
    });

    const ticked = () => {
      circles
        .attr("cx", (d) => {
          return d.x;
        })
        .attr("cy", (d) => {
          return d.y + 1;
        });
    };

    simulation.nodes(data).on("tick", ticked);
  }, []);

  return (
    <div
      className={`min-w-[700px] h-[400px] flex flex-row justify-center items-center relative overflow-hidden`}
      onClick={() => {}}
    >
      <div
        className={`flex flex-row justify-center items-center`}
        ref={svgRef}
      ></div>

      <div
        className={`flex flex-row justify-center items-center w-full h-full bg-black/0 backdrop-blur-sm absolute bottom-0 opacity-30 pointer-events-none`}
      />

      <div
        className={`w-[200px] h-[200px] absolute left-[30px] flex flex-col justify-center items-end rounded-[4px] pr-[30px] ${
          dash_ ? "opacity-0 duration-400" : "opacity-80 duration-[1500ms]"
        } transition-all`}
        onClick={() => {}}
      >
        <div
          className={`${
            currentData == "tag" ? "w-[90px]" : "w-[20px] hover:w-[120px]"
          } cursor-pointer duration-[200ms] transition-all my-[5px] flex flex-row relative overflow-hidden`}
        >
          <div
            className={`w-[120px] h-full absolute left-0 pl-[30px] font-medium text-[13px] ${
              isDark_ ? "text-white/40" : "text-black/60"
            } flex flex-col justify-center hover:opacity-100 ${
              currentData == "tag" ? "opacity-100" : "opacity-0"
            } duration-300 transition-all`}
            onClick={() => {
              setCurrentData("tag");
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
                : "hover:text-black text-black/80"
            } w-[20px] h-[20px]`}
          />
        </div>

        <div
          className={`${
            currentData == "network" ? "w-[90px]" : "w-[20px] hover:w-[120px]"
          } cursor-pointer duration-[200ms] transition-all my-[5px] flex flex-row relative overflow-hidden`}
        >
          <div
            className={`w-[120px] h-full absolute left-0 pl-[30px] font-medium text-[13px] ${
              isDark_ ? "text-white/40" : "text-black/60"
            } flex flex-col justify-center hover:opacity-100 ${
              currentData == "network" ? "opacity-100" : "opacity-0"
            } duration-300 transition-all`}
            onClick={() => {
              setCurrentData("network");
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
                : "hover:text-black text-black/80"
            } w-[20px] h-[20px]`}
          />
        </div>

        <div
          className={`${
            currentData == "type" ? "w-[90px]" : "w-[20px] hover:w-[120px]"
          } cursor-pointer duration-[200ms] transition-all my-[5px] flex flex-row relative overflow-hidden`}
        >
          <div
            className={`w-[120px] h-full absolute left-0 pl-[30px] font-medium text-[13px] ${
              isDark_ ? "text-white/40" : "text-black/60"
            } flex flex-col justify-center hover:opacity-100 ${
              currentData == "type" ? "opacity-100" : "opacity-0"
            } duration-300 transition-all`}
            onClick={() => {
              setCurrentData("type");
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
                : "hover:text-black text-black/80"
            } w-[20px] h-[20px]`}
          />
        </div>
        <div
          className={`${
            currentData == "platform" ? "w-[90px]" : "w-[20px] hover:w-[120px]"
          } cursor-pointer duration-[200ms] transition-all my-[5px] flex flex-col relative overflow-hidden`}
        >
          <div
            className={`w-[120px] h-full absolute left-0 pl-[30px] font-medium text-[13px] ${
              isDark_ ? "text-white/40" : "text-black/60"
            } flex flex-col justify-center hover:opacity-100 ${
              currentData == "platform" ? "opacity-100" : "opacity-0"
            } duration-300 transition-all`}
            onClick={() => {
              setCurrentData("platform");
              console.log(...getData("platform").keys());
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
        className={`flex flex-row justify-center items-center min-w-[300px] h-[80px] rounded-[4px] absolute bottom-[20px] ${dash_ ? "opacity-0 duration-400" : "opacity-80 duration-[1500ms]"} transition-all duration-400`}
      >
        <p
          className={`min-w-[20px] h-full flex flex-col mx-[5px] justify-center items-center
      ${isDark_ ? "text-white" : "text-black"} text-right relative bottom-[1px] text-[35px] font-black`}
        >
          {currentData.toUpperCase()}
        </p>

        <p
          className={`text-[13px] w-[200px] ${
            isDark_ ? "text-white/70" : "text-black"
          } font-thin text-left`}
        >
          {currentData == "network"
            ? "Transactions according to network used.."
            : currentData == "platform"
            ? "Transactions according to platform used.."
            : currentData == "tag"
            ? "Transactions according to category.."
            : "Transactions according to nature of transaction.."}
        </p>
      </div>

      <div className={`hidden w-[50px] h-[20px] bg-white/80 rounded-4px absolute`} id={'tooltip_'}>

      </div>
      {/* <div className={`w-[100px] h-full flex flex-col justify-center items-end`} onClick={() => {}}>
        <div
          className={`${currentData == 'tag' ? 'w-[90px]' : 'w-[20px] hover:w-[120px]'} cursor-pointer duration-[200ms] transition-all my-[5px] flex flex-row relative overflow-hidden`}
        >
          <div
            className={`w-[120px] h-full absolute left-0 pl-[30px] font-medium text-[13px] ${
              isDark_ ? "text-white/40" : "text-black/60"
            } flex flex-col justify-center hover:opacity-100 ${currentData == 'tag' ? 'opacity-100' : 'opacity-0'} duration-300 transition-all`}
            onClick={() => {
              setCurrentData("tag");
            }}
          >
            Tag
          </div>
          <FontAwesomeIcon
            icon={faTag}
            className={`text-center duration-[200ms] transition-all ${
              isDark_
                ? "hover:text-white text-white/80"
                : "hover:text-black text-black/80"
            } w-[20px] h-[20px]`}
          />
        </div>

        <div
          className={`${currentData == 'network' ? 'w-[90px]' : 'w-[20px] hover:w-[120px]'} cursor-pointer duration-[200ms] transition-all my-[5px] flex flex-row relative overflow-hidden`}
        >
          <div
            className={`w-[120px] h-full absolute left-0 pl-[30px] font-medium text-[13px] ${
              isDark_ ? "text-white/40" : "text-black/60"
            } flex flex-col justify-center hover:opacity-100 ${currentData == 'network' ? 'opacity-100' : 'opacity-0'} duration-300 transition-all`}
            onClick={() => {
              setCurrentData("network");
            }}
          >
            Network
          </div>
          <FontAwesomeIcon
            icon={faTowerBroadcast}
            className={`text-center duration-[200ms] transition-all ${
              isDark_
                ? "hover:text-white text-white/80"
                : "hover:text-black text-black/80"
            } w-[20px] h-[20px]`}
          />
        </div>

        <div
          className={`${currentData == 'type' ? 'w-[90px]' : 'w-[20px] hover:w-[120px]'} cursor-pointer duration-[200ms] transition-all my-[5px] flex flex-row relative overflow-hidden`}
        >
          <div
            className={`w-[120px] h-full absolute left-0 pl-[30px] font-medium text-[13px] ${
              isDark_ ? "text-white/40" : "text-black/60"
            } flex flex-col justify-center hover:opacity-100 ${currentData == 'type' ? 'opacity-100' : 'opacity-0'} duration-300 transition-all`}
            onClick={() => {
              setCurrentData("type");
            }}
          >
            Type
          </div>
          <FontAwesomeIcon
            icon={faBoxesStacked}
            className={`text-center duration-[200ms] transition-all ${
              isDark_
                ? "hover:text-white text-white/80"
                : "hover:text-black text-black/80"
            } w-[20px] h-[20px]`}
          />
        </div>
        <div
          className={`${currentData == 'platform' ? 'w-[90px]' : 'w-[20px] hover:w-[120px]'} cursor-pointer duration-[200ms] transition-all my-[5px] flex flex-row relative overflow-hidden`}
        >
          <div
            className={`w-[120px] h-full absolute left-0 pl-[30px] font-medium text-[13px] ${
              isDark_ ? "text-white/40" : "text-black/60"
            } flex flex-col justify-center hover:opacity-100 ${currentData == 'platform' ? 'opacity-100' : 'opacity-0'} duration-300 transition-all`}
            onClick={() => {
              setCurrentData("platform");
            }}
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
      
      <div className={`mb-4 ml-[-45px] w-[350px]`}>
        <Bar
          data={{
            labels: [...getData(currentData).keys()],
            values: [...getData(currentData).values()],
          }}
          fillStyle={"zigzag"}
          roughness={1}
          fillWeight={1}
          color={"ghostwhite"}
          stroke={"ghostwhite"}
          highlight={"grey"}
          innerStrokeWidth={0}
          className={`absolute top-4 left-4`}
        />
      </div>

      <div className={`w-[200px] h-full flex flex-col justify-center items-center
      ${
        isDark_
          ? "text-white"
          : "text-black"
      } text-[35px] font-black`}>
        {
            currentData.charAt(0).toUpperCase()+currentData.slice(1)
        }
        <p className={`text-[13px] text-center ${
                isDark_ ? "text-white/70" : "text-black"
              } font-thin`}>
                {
                    currentData == 'network' ? 'Transactions according to network used..' : currentData == 'platform' ? 'Transactions according to platform used..' : currentData == 'tag' ? 'Transactions according to category..' : 'Transactions according to nature of transaction..'
                }
              </p>
      </div> */}
    </div>
  );
};

export default Visuals;
