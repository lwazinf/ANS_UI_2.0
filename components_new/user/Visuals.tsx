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
import { values } from "lodash";

interface VisualsProps {
  data: any;
}

const Visuals = ({ data }: VisualsProps) => {
  const [currentData, setCurrentData] = useState("tag");

  // Everything on this element is Light/Dark theme ready..
  const [isDark_, setIsDark_] = useRecoilState(isDarkMode);

  // Clicking "assets/Transactions" reveals one of two dashboard views.. Dash is the Recoil atom which changes the ui
  const [dash_, setDash_] = useRecoilState(extendDash);

  const svgRef0 = createRef<HTMLDivElement>();
  let w0 = 902;
  let h0 = 412;

  const svgRef1 = createRef<HTMLDivElement>();
  let w1 = 302;
  let h1 = 412;

  let z = data.map((obj) => {
    return !isNaN(parseFloat(obj.fee)) ? parseFloat(obj.fee) * 25 : 0;
  });

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

    // First Chart

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
          ? "pink"
          : d.type == "swap"
          ? "gray"
          : d.type == "vote"
          ? "red"
          : d.type == "poap"
          ? "slategrey"
          : d.type == "social"
          ? "orange"
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
          ? "yellow"
          : d.network == "polygon"
          ? "lightblue"
          : d.network == "xdai"
          ? "brown"
          : "slategrey";
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

    // Second Chart

    var radius = Math.min(w1, h1) / 2.2;

    var pie = d3
      .pie()
      .value((d) => d)([...getData(currentData).values()]);

      var arc = d3.arc()
      .innerRadius(radius * 0.4)
      .outerRadius(radius * 0.7);
    
      var color = d3.interpolateGreys(.5)

      const refAccess1 = select(svgRef1.current)
      .append("svg")
      .attr("width", w1)
      .attr("height", h1)
      .append("g") 
      .attr("transform", `translate(${w1 / 2}, ${h1 / 2})`)

      const tooltip = d3.select(`#plateArea`)
      .append('div')
      .style('visibility', 'hidden')
      .style('position', 'absolute')
      .style('background-color', 'red')

      refAccess1.append('g')
      .selectAll('path')
      .data(pie)
      .join('path')
      .attr('d', arc)
      .attr('fill', (d, i) => color)
      .attr('stroke', 'white')
      .attr('opacity', '0.8')
      .on('mouseover', (e, d) => {
        console.log(e)
        console.log(d)
        tooltip.style('visibility', 'visible')
        .text(`XY`)
      })
      .on('mousemove', (e, d) => {
        tooltip.style('top', (e.pageY - 50) + 'px')
        .style('left', (e.pageX - 50) + 'px')
      })
    
    // refAccess1.attr("transform", "translate(" + w1 / 2 + "," + h1 / 2 + ")");

    const pieLabels: any = [...getData(currentData).keys()];

    simulation.nodes(data).on("tick", ticked);
  }, []);

  return (
    <div
      className={`w-full h-full flex flex-row justify-start items-center relative overflow-hidden`}
      onClick={() => {}}
      id={'plateArea'}
    >
      <div
        className={`flex flex-row justify-center items-center overflow-hidden relative ${
          dash_ ? "w-[452px] duration-400 pl-[180px]" : "w-["+w0+"px] duration-200"
        } transition-all`}
      >
        <div
          className={`flex flex-row justify-center items-center ${
            dash_ ? "duration-400" : "duration-[1500ms]"
          } transition-all`}
          ref={svgRef0}
        ></div>
      </div>

      {/* <div
        className={`flex flex-row justify-center items-center w-full h-full bg-black/0 backdrop-blur-sm absolute bottom-0 opacity-30 pointer-events-none`}
      /> */}

      <div
        className={`w-[150px] h-[200px] absolute left-[60px] top-[90px] flex flex-col justify-center items-end rounded-[4px] pr-[30px] ${
          dash_ ? "opacity-0 duration-400" : "opacity-80 duration-[1500ms]"
        } transition-all`}
        onClick={() => {}}
      >
        <div
          className={`${
            currentData == "tag" ? "w-[90px]" : "w-[20px] hover:w-[100px]"
          } cursor-pointer duration-[200ms] transition-all my-[5px] flex flex-row relative overflow-hidden`}
        >
          <div
            className={`w-[100px] h-full absolute left-0 pl-[30px] font-medium text-[15px] ${
              isDark_ ? "text-white/80" : "text-black/80"
            } flex flex-col justify-center hover:opacity-100 ${
              currentData == "tag" ? "opacity-100" : "opacity-0"
            } duration-300 transition-all _displayFont1 font-[100]`}
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
            currentData == "network" ? "w-[90px]" : "w-[20px] hover:w-[100px]"
          } cursor-pointer duration-[200ms] transition-all my-[5px] flex flex-row relative overflow-hidden`}
        >
          <div
            className={`w-[100px] h-full absolute left-0 pl-[30px] font-medium text-[15px] ${
              isDark_ ? "text-white/80" : "text-black/80"
            } flex flex-col justify-center hover:opacity-100 ${
              currentData == "network" ? "opacity-100" : "opacity-0"
            } duration-300 transition-all _displayFont1 font-[100]`}
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
            currentData == "type" ? "w-[90px]" : "w-[20px] hover:w-[100px]"
          } cursor-pointer duration-[200ms] transition-all my-[5px] flex flex-row relative overflow-hidden`}
        >
          <div
            className={`w-[100px] h-full absolute left-0 pl-[30px] font-medium text-[15px] ${
              isDark_ ? "text-white/80" : "text-black/80"
            } flex flex-col justify-center hover:opacity-100 ${
              currentData == "type" ? "opacity-100" : "opacity-0"
            } duration-300 transition-all _displayFont1 font-[100]`}
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
            currentData == "platform" ? "w-[90px]" : "w-[20px] hover:w-[100px]"
          } cursor-pointer duration-[200ms] transition-all my-[5px] flex flex-col relative overflow-hidden`}
        >
          <div
            className={`w-[100px] h-full absolute left-0 pl-[30px] font-medium text-[15px] ${
              isDark_ ? "text-white/80" : "text-black/80"
            } flex flex-col justify-center hover:opacity-100 ${
              currentData == "platform" ? "opacity-100" : "opacity-0"
            } duration-300 transition-all _displayFont1 font-[100]`}
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
        className={`flex flex-row justify-center items-center w-full h-[80px] rounded-[4px] absolute left-[50px] bottom-[0px] ${
          dash_
            ? "opacity-0 duration-400"
            : "opacity-80 duration-[1500ms] hover:opacity-30"
        } transition-all duration-400`}
      >
        <p
          className={`min-w-[20px] h-full flex flex-col mx-[10px] justify-center items-center
      ${
        isDark_ ? "text-white" : "text-black"
      } _displayFont0 font-[700] text-right relative bottom-0 text-[35px] pointer-events-none`}
        >
          {currentData.toUpperCase()}
        </p>

        <p
          className={`text-[16px] w-[200px] ${
            isDark_ ? "text-white/70" : "text-black"
          } text-left pointer-events-none leading-[15px] _displayFont1 font-[100]`}
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

      <div
        className={`flex flex-col absolute right-[90px] top-0 ${
          dash_ ? "opacity-0 duration-400 pointer-events-none" : "opacity-80 duration-[1500ms] pointer-events-auto"
        } transition-all`}
        onClick={() => {}}
        ref={svgRef1}
      >
      </div>
    </div>
  );
};

export default Visuals;
