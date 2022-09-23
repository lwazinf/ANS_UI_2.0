import {
  faEthereum,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faExpand, faGlobe, faGlobeAfrica } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Res } from "../../../src/types";
import ProfileBadge from "./modals/ProfileBadge";

interface ProfileHUDProps {
  data: Res | undefined;
}

const ProfileHUD = ({data}: ProfileHUDProps) => {
  const [viewSwitch, setViewSwitch] = useState(true);
  return (
    <div
      className={`w-[900px] h-[300px] rounded-[4px] shadow-md bg-black relative mx-auto mt-4 flex flex-col justify-center items-center overflow-hidden mb-4`}
    >
      <img
        className={`w-full h-full object-cover absolute top-0 ${viewSwitch ? 'opacity-60' : 'opacity-100'} transition-all duration-[800ms]`}
        src={`https://images.pexels.com/photos/1714340/pexels-photo-1714340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}
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
          <div
            className={`flex flex-col justify-center items-center h-full mr-2`}
          >
            <div
              className={`w-[130px] hover:px-0 px-[1px] h-[100px] transition-all duration-300 cursor-pointer relative overflow-hidden`}
            >
              <div
                className={`w-full h-full rounded-[4px] bg-white transition-all duration-300 cursor-pointer relative overflow-hidden`}
              >
                {
                data ? 
                // <img className={`w-full h-full object-cover`} src={`https://arweave.net/${data.ANS.avatar}`}/>
                // ND - using 'meson.network' for the profile pictures. May only work on xy account.
                <img className={`w-full h-full object-cover`} src={`https://pz-prepnb.meson.network/${data.ANS.avatar}`}/>
                :
                <div />
                }
              </div>
            </div>
          </div>
          <div className={`flex flex-col justify-center items-center h-full`}>
            <div
              className={`flex flex-col items-left justify-center h-[80px] w-[250px]`}
            >
              <p className={`text-[13px] text-[lightgrey] font-thin m-0`}>
              {
              data ?
              data.ANS.bio
              :
              ''
            }
              </p>
              <div className={`relative h-[50px] min-w-[50px] flex flex-row mt-1`}>
                <p className={`text-[35px] text-white font-black mt-[-10px]`}>
                {
              data ? 
              data.ANS.currentLabel.toUpperCase()
              :
              ''
            }
                </p>
                <div className={`ml-[-5px]`}>
                  <ProfileBadge
                    loading={false}
                    is_evaluated={data?.is_evaluated}
                    is_verified={data?.is_verified}
                    isDark={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`absolute bottom-10 text-white w-full h-[15px] flex flex-row justify-center font-black transition-all duration-300 hover:opacity-90`}
        >
          
          <p
            className={`cursor-pointer text-white text-[15px] font-black transition-all duration-300 hover:opacity-100 ${
              viewSwitch
              ? "duration-[1500ms] opacity-100"
              : "duration-[100ms] opacity-70"
            }`}
          >
            {
              data ? 
              data.ANS.nickname.toUpperCase()
              :
              ''
            }
          </p>
        </div>

        <div
          className={`absolute bottom-4 w-full h-[15px] flex flex-row justify-center items-center`}
        >
          <p
            className={`cursor-pointer text-white text-[12px] font-thin transition-all duration-300 hover:opacity-90 ${
              viewSwitch
                ? "duration-[1000ms] opacity-30"
                : "duration-[1000ms] opacity-30"
            }`}
          >
            {
              data ? 
              data.arweave_address
              :
              ''
            }
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

        <div
          className={`absolute ${viewSwitch ? 'right-[150px] opacity-100 duration-[800ms]' : 'right-3 duration-500 opacity-40'} top-[60px] text-white cursor-pointer w-[20px] h-[20px] transition-all hover:opacity-70`}
          onClick={() => {
            
          }}
        >
          <FontAwesomeIcon icon={faTwitter} />
        </div>
        <p className={`font-thin text-white cursor-pointer text-[13px] m-0 p-0 absolute ${viewSwitch ? 'right-[40px] opacity-80 duration-[800ms]' : 'right-[-12px] duration-500 opacity-0 pointer-events-none'} top-[60px] w-[100px] text-left`}>xylophonezy</p>

        <div
          className={`absolute ${viewSwitch ? 'right-[150px] opacity-100 duration-[800ms]' : 'right-3 duration-500 opacity-40'} top-[90px] text-white cursor-pointer w-[18px] h-[18px] transition-all hover:opacity-70`}
          onClick={() => {
            
          }}
        >
          <FontAwesomeIcon icon={faEthereum} />
        </div>
        <p className={`font-thin text-white cursor-pointer text-[13px] m-0 p-0 absolute ${viewSwitch ? 'right-[40px] opacity-80 duration-[800ms]' : 'right-[-12px] duration-500 opacity-0 pointer-events-none'} top-[95px] w-[100px] text-left`}>reedseal.eth</p>

        <div
          className={`absolute ${viewSwitch ? 'right-[150px] opacity-100 duration-[800ms]' : 'right-3 duration-500 opacity-40'} top-[130px] text-white cursor-pointer w-[20px] h-[20px] transition-all hover:opacity-70`}
          onClick={() => {
            
          }}
        >
          <FontAwesomeIcon icon={faGithub} />
        </div>
        <p className={`font-thin text-white cursor-pointer text-[13px] m-0 p-0 absolute ${viewSwitch ? 'right-[40px] opacity-80 duration-[800ms]' : 'right-[-12px] duration-500 opacity-0 pointer-events-none'} top-[130px] w-[100px] text-left`}>xylophonez</p>

        <div
          className={`absolute ${viewSwitch ? 'right-[150px] opacity-100 duration-[800ms]' : 'right-3 duration-500 opacity-40'} top-[160px] text-white cursor-pointer w-[20px] h-[20px] transition-all hover:opacity-70`}
          onClick={() => {
            
          }}
        >
          <FontAwesomeIcon icon={faGlobe} />
        </div>
        <p className={`font-thin text-white cursor-pointer text-[13px] m-0 p-0 absolute ${viewSwitch ? 'right-[40px] opacity-80 duration-[800ms]' : 'right-[-12px] duration-500 opacity-0 pointer-events-none'} top-[160px] w-[100px] text-left`}>permacast.dev</p>
      </div>
    </div>
  );
};

export default ProfileHUD;
