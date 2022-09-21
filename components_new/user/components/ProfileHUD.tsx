import {
  faEthereum,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faExpand } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ProfileBadge from "./modals/ProfileBadge";

interface ProfileHUDProps {}

const ProfileHUD = ({}: ProfileHUDProps) => {
  const [loading, setLoading] = useState(false);
  const [viewSwitch, setViewSwitch] = useState(false);
  return (
    <div
      className={`w-[900px] h-[300px] rounded-[4px] shadow-md bg-[ghostwhite] relative mx-auto mt-4 flex flex-col justify-center items-center overflow-hidden`}
    >
      <img
        className={`w-full h-full object-cover absolute top-0`}
        src={`https://images.pexels.com/photos/345415/pexels-photo-345415.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`}
      />

      <div
        className={`_filter w-full h-full absolute top-0 ${
          viewSwitch
            ? "duration-[100ms] opacity-100"
            : "duration-[1000ms] opacity-50"
        } transition-all`}
      />
      <img
        className={`w-[100px] h-[100px] rotate-[20deg] object-cover absolute top-[-10px] left-[10px] invert ${
          viewSwitch
            ? "duration-[1000ms] opacity-40"
            : "duration-[100ms] opacity-20"
        } transition-all`}
        src={`/ProfileHUD/ar_logo.png`}
      />
      <div className={`w-full h-full absolute top-0 p-[15px]`}>
        <div
          className={`w-[400px] h-[150px] absolute bottom-1 ${
            viewSwitch
              ? "duration-[800ms] opacity-80 left-[20px]"
              : "duration-[200ms] opacity-10 left-[-50px]"
          } flex flex-row`}
        >
          <div className={`flex flex-col justify-center items-center h-full mr-1`}>
            <div
              className={`w-[130px] hover:px-0 px-[1px] h-[100px] transition-all duration-300 cursor-pointer`}
            >
              <div
                className={`w-full h-full rounded-[2px] bg-white transition-all duration-300 cursor-pointer`}
              />
            </div>
          </div>
          <div className={`flex flex-col justify-center items-center h-full`}>
            <div
              className={`flex flex-col  items-center h-[100px] w-[250px]`}
            >
              <p className={`text-[13px] text-[lightgrey] font-thin`}>
                The details of this page are currently under wraps!
                </p>
            </div>
          </div>
        </div>

        <div
          className={`absolute bottom-8 text-white w-full h-[15px] flex flex-row justify-center items-center text-[15px] font-black transition-all duration-300 hover:opacity-90 cursor-default ${
            viewSwitch
              ? "duration-[1500ms] opacity-70"
              : "duration-[100ms] opacity-30"
          }`}
        >
          XYLOPHONE
        </div>

        <div
          className={`absolute bottom-4 w-full h-[15px] flex flex-row justify-center items-center`}
        >
          <p
            className={`cursor-pointer text-white text-[12px] font-thin transition-all duration-300 hover:opacity-90 ${
              viewSwitch
                ? "duration-[1000ms] opacity-60"
                : "duration-[100ms] opacity-50"
            }`}
          >
            0x34F4K3KJBKJBKJBHBKJBK555445JJ432BKLNL34HG5S5Z
          </p>
        </div>

        <div
          className={`absolute right-3 bottom-4 text-white cursor-pointer w-[15px] h-[15px] transition-all duration-300 opacity-100 hover:opacity-70`}
          onClick={() => {
            setViewSwitch(!viewSwitch);
          }}
        >
          <FontAwesomeIcon icon={faExpand} />
        </div>
      </div>
    </div>
  );
};

export default ProfileHUD;
