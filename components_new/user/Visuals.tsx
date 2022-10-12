import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faBoxesStacked, faCoins, faTag, faTowerBroadcast } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { select } from "d3-selection";
import { createRef, useEffect, useRef, useState } from "react";
import { Bar, Pie } from "react-roughviz";
import { useRecoilState } from "recoil";
import { isDarkMode } from "../../atoms";
import * as d3 from 'd3'


interface VisualsProps {
  data: any;
}

const Visuals = ({ data }: VisualsProps) => {
  const [currentData, setCurrentData] = useState("tag");
  // Everything on this element is Light/Dark theme ready..
  const [isDark_, setIsDark_] = useRecoilState(isDarkMode);

//   const getData = (userInput: any) => {
    // let platform_ = [];
    // data.forEach((element) => {
    //   platform_.push(element[userInput]);
    // });
    // platform_ = [...new Set(platform_)];
    // let platformObj = new Map();
    // platform_.forEach((data__) => {
    //   platformObj.set(data__, 0);
    // });
    // data.forEach((element) => {
    //   platformObj.set(
    //     element[userInput],
    //     platformObj.get(element[userInput]) + 1
    //   );
    // });

//     return platformObj;
//   };

var data__ = [
    {source:"Item 1", x: 100, y: 60, val: 1350, color: "#C9D6DF"},
    {source:"Item 2", x: 30, y: 80, val: 2500, color: "#F7EECF"},
    {source:"Item 3", x: 50, y: 40, val: 5700, color: "#E3E1B2"},
    {source:"Item 4", x: 190, y: 100, val: 30000, color: "#F9CAC8"},
    {source:"Item 5", x: 80, y: 170, val: 47500, color: "#D1C2E0"}
  ]

const svgRef = createRef<HTMLDivElement>()

    let w = 700;
    let h = 400;
    
    useEffect(() => {
        const refAccess = 
        select(svgRef.current).append('svg').attr("width", 700)
        .attr("height", 400);
        
        refAccess.selectAll("circle")
        .data(data).enter()
        .append("circle")
        .attr("cx", (d) => parseFloat(d.fee)*10000*Math.random())
        .attr("cy", (d) => parseFloat(d.fee)*10000*Math.random())
        .attr("r", function(d) {
          return Math.sqrt(parseFloat(d.fee)*35500)/Math.PI 
        })
        .attr("fill", function(d) {
          return 'ghostwhite';
        });
    }, [])
  return (
    <div
      className={`w-full h-full flex flex-row justify-center items-center relative overflow-hidden`}
      onClick={() => {}}
    >

        <div className={`w-[700px] h-[400px] flex flex-col justify-center items-center`} ref={svgRef} id={`mainDiv`}></div>
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
