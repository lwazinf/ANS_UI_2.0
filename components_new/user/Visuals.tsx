import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faBoxesStacked, faCoins, faTag, faTowerBroadcast } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Bar, Pie } from "react-roughviz";
import { useRecoilState } from "recoil";
import { isDarkMode } from "../../atoms";

interface VisualsProps {
  data: any;
}

const Visuals = ({ data }: VisualsProps) => {
  const [currentData, setCurrentData] = useState("tag");
  // Everything on this element is Light/Dark theme ready..
  const [isDark_, setIsDark_] = useRecoilState(isDarkMode);

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

  return (
    <div
      className={`w-full h-full flex flex-row justify-center items-center relative overflow-hidden`}
      onClick={() => {}}
    >
      <div className={`w-[100px] h-full flex flex-col justify-center items-end`} onClick={() => {}}>
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
      
      <div className={`mb-4 ml-[-45px]`}>
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
    </div>
  );
};

export default Visuals;
