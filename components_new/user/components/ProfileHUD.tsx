import {
  faEthereum,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faExpand,
  faGlobe,
  faGlobeAfrica,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import QRCode from "react-qr-code";
import { useRecoilState } from "recoil";
import { extendDash, isDarkMode } from "../../../atoms";
import { Res } from "../../../src/types";
import ProfileBadge from "./modals/ProfileBadge";

interface ProfileHUDProps {
  data: Res | undefined;
}

const ProfileHUD = ({ data }: ProfileHUDProps) => {
  const [viewSwitch_, setViewSwitch_] = useState(true);
  const [viewQR_, setViewQR_] = useState(true);
  const [isDark_, setIsDark_] = useState(false);
  // const [isDark_, setIsDark_] = useRecoilState(isDarkMode);
  const [dash_, setDash_] = useRecoilState(extendDash);
  return (
    <div
      className={`w-[900px] h-[300px] rounded-[4px] shadow-md ${isDark_ ? 'bg-black' : 'bg-white'} relative mx-auto mt-4 flex flex-col justify-center items-center overflow-hidden mb-4`}
    >
      <img
        className={`w-full h-full object-cover absolute top-0 ${
          viewSwitch_
            ? "opacity-60 duration-[400ms]"
            : "opacity-100 duration-[800ms]"
        } transition-all`}
        src={`https://images.pexels.com/photos/1714340/pexels-photo-1714340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}
      />

      <div
        className={`w-full h-full ${isDark_ ? 'bg-black/30' : 'bg-white/30'} backdrop-blur-sm absolute top-0 left-0 ${
          viewSwitch_
            ? "opacity-100 duration-[400ms]"
            : "opacity-0 duration-[800ms]"
        } transition-all`}
      />

      <div
        className={`${isDark_ ? 'invert-0' : 'invert'} w-full h-full absolute top-0 _filter ${
          viewSwitch_
            ? "duration-[400ms] opacity-100"
            : "duration-[800ms] opacity-20"
        } transition-all`}
      />

      <img
        className={`w-[100px] h-[100px] rotate-[20deg] object-cover absolute top-[-10px] left-[10px] ${isDark_ ? 'invert' : 'invert-0'} ${
          viewSwitch_
            ? "duration-[800ms] opacity-40"
            : "duration-[400ms] opacity-20"
        } transition-all`}
        src={`/ProfileHUD/ar_logo.png`}
      />

      <div className={`w-full h-full absolute top-0 p-[15px]`}>
        <div
          className={`absolute bottom-10 text-white w-full h-[15px] flex flex-row justify-center font-black transition-all duration-300 hover:opacity-90`}
        > 
        <div className={`${isDark_ ? 'bg-black/40' : 'bg-white/40'} transition-all duration-[200ms] min-w-[50px] h-[20px] flex flex-row justify-center items-center rounded-[2px] p-1
        ${
              !viewSwitch_
                ? "opacity-100 backdrop-blur-sm"
                : "opacity-0 backdrop-blur-none"
            }`}>
          <p
            className={`cursor-pointer ${isDark_ ? 'text-white' : 'text-black'} text-[15px] font-black transition-all duration-300 hover:opacity-100 ${
              viewSwitch_
                ? "duration-[1500ms] opacity-100"
                : "duration-[100ms] opacity-70"
            }`}
          >
            {data ? data.ANS.nickname.toUpperCase() : ""}
          </p>
        </div>
        </div>
      </div>

      <div className={`w-full h-full absolute top-0 p-[15px]`}>
        <div
          className={`absolute bottom-10 text-white w-full h-[15px] flex flex-row justify-center font-black transition-all duration-300 hover:opacity-90`}
        > 
        <div className={`transition-all duration-[200ms] min-w-[50px] h-[20px] flex flex-row justify-center items-center rounded-[2px] p-1
        ${
              !viewSwitch_
                ? "opacity-0"
                : "opacity-100"
            }`}>
          <p
            className={`cursor-pointer ${isDark_ ? 'text-white' : 'text-black'} text-[15px] font-black transition-all duration-300 hover:opacity-100 ${
              viewSwitch_
                ? "duration-[1500ms] opacity-100"
                : "duration-[100ms] opacity-70"
            }`}
          >
            {data ? data.ANS.nickname.toUpperCase() : ""}
          </p>
        </div>
        </div>
      </div>

      <div
        className={`w-full h-full absolute top-0 pl-[245px] flex flex-row justify-center items-center`}
      >
        <div
          className={`flex flex-col justify-center items-end transition-all w-[30px] h-[130px] ${
            viewSwitch_
              ? "opacity-100 pointer-events-auto duration-[400ms]"
              : "opacity-10 pointer-events-none duration-[800ms]"
          }`}
          onClick={() => {}}
        >
          <div
            className={`w-[20px] hover:w-[120px] cursor-pointer duration-[200ms] transition-all my-[4px] flex flex-row relative overflow-hidden`}
          >
            <div
              className={`w-[120px] h-full absolute left-0 pl-[30px] font-medium text-[13px] ${isDark_ ? 'text-white/40' : 'text-black/60'} flex flex-col justify-center hover:opacity-100 opacity-0 duration-300 transition-all`}
            >
              {
                data ?
                <a href={'https://twitter.com/'+data.ANS.links.twitter} target={'_blank'} rel={'noreferrer'}>{data.ANS.links.twitter}</a>
                :
                'Unknown'
              }
            </div>
            <FontAwesomeIcon
              icon={faTwitter}
              className={`text-center duration-[200ms] transition-all ${isDark_ ? 'hover:text-white text-white/80' : 'hover:text-black text-black/80'} w-[20px] h-[20px]`}
            />
          </div>
          <div
            className={`w-[20px] hover:w-[120px] cursor-default duration-[200ms] transition-all my-[4px] flex flex-row relative overflow-hidden`}
          >
            <div
              className={`w-[120px] h-full absolute left-0 pl-[30px] font-medium text-[13px] ${isDark_ ? 'text-white/40' : 'text-black/60'} flex flex-col justify-center hover:opacity-100 opacity-0 duration-300 transition-all`}
            >
              {
                data ?
                data.ENS
                :
                'Unknown'
              }
            </div>
            <FontAwesomeIcon
              icon={faEthereum}
              className={`text-center duration-[200ms] transition-all ${isDark_ ? 'hover:text-white text-white/80' : 'hover:text-black text-black/80'} w-[20px] h-[20px]`}
            />
          </div>
          <div
            className={`w-[20px] hover:w-[120px] cursor-pointer duration-[200ms] transition-all my-[4px] flex flex-row relative overflow-hidden`}
          >
            <div
              className={`w-[120px] h-full absolute left-0 pl-[30px] font-medium text-[13px] ${isDark_ ? 'text-white/40' : 'text-black/60'} flex flex-col justify-center hover:opacity-100 opacity-0 duration-300 transition-all`}
            >
              {
                data ?
                <a href={'https://github.com/'+data.ANS.links.github} target={'_blank'} rel={'noreferrer'}>{data.ANS.links.github}</a>
                :
                'Unknown'
              }
            </div>
            <FontAwesomeIcon
              icon={faGithub}
              className={`text-center duration-[200ms] transition-all ${isDark_ ? 'hover:text-white text-white/80' : 'hover:text-black text-black/80'} w-[20px] h-[20px]`}
            />
          </div>
          <div
            className={`w-[20px] hover:w-[120px] cursor-pointer duration-[200ms] transition-all my-[4px] flex flex-row relative overflow-hidden`}
          >
            <div
              className={`w-[120px] h-full absolute left-0 pl-[30px] font-medium text-[13px] ${isDark_ ? 'text-white/40' : 'text-black/60'} flex flex-col justify-center hover:opacity-100 opacity-0 duration-300 transition-all`}
            >
              {
                data ?
                <a href={data.ANS.links.customUrl} target={'_blank'} rel={'noreferrer'}>{data.ANS.links.customUrl.split('.')[1]}</a>
                :
                'Unknown'
              }
            </div>
            <FontAwesomeIcon
              icon={faGlobe}
              className={`text-center duration-[200ms] transition-all ${isDark_ ? 'hover:text-white text-white/80' : 'hover:text-black text-black/80'} w-[20px] h-[20px]`}
            />
          </div>
        </div>

        <div
          className={`transition-all p-1 m-2 relative overflow-hidden ${
            viewQR_ ? "w-[120px] h-[120px]" : "w-[120px] h-[120px]"
          } rounded-[2px] ${isDark_ ? 'bg-white' : 'bg-black'} hover:opacity-100 cursor-pointer ${
            viewSwitch_
              ? "opacity-80 pointer-events-auto duration-[400ms]"
              : "opacity-0 pointer-events-none duration-[800ms]"
          }`}
          onClick={() => {
            setViewQR_(!viewQR_);
          }}
        >
          {data ? (
            <QRCode
              size={256}
              className={`w-full h-full ${isDark_ ? 'invert-0' : 'invert'} ${
                viewQR_ ? "opacity-100 duration-500" : "opacity-0 duration-200"
              }`}
              value={`https://${data?.ANS.currentLabel}.ar.page`}
              viewBox={`0 0 256 256`}
            />
          ) : (
            <div />
          )}

          {data ? (
            // <img className={`w-full h-full object-cover`} src={`https://arweave.net/${data.ANS.avatar}`}/>
            // ND - using 'meson.network' for the profile pictures. May only work on xy account.
            <img
              className={`w-full h-full object-cover absolute top-0 right-0 transition-all ${
                viewQR_ ? "opacity-0 duration-200" : "opacity-100 duration-500"
              }`}
              src={`https://pz-prepnb.meson.network/${data.ANS.avatar}`}
            />
          ) : (
            <div />
          )}
        </div>

        <div
          className={`flex flex-col justify-start items-center pt-3 h-[120px] ${
            viewSwitch_
              ? "opacity-100 pointer-events-auto duration-[400ms]"
              : "opacity-0 pointer-events-none duration-[800ms]"
          }`}
        >
          <div
            className={`flex flex-col items-left justify-center h-[80px] w-[250px]`}
          >
            <p className={`text-[13px] ${isDark_ ? 'text-white/70' : 'text-black'} font-thin m-0`}>
              {data ? data.ANS.bio : ""}
            </p>
            <div
              className={`relative h-[50px] min-w-[50px] flex flex-row mt-1`}
            >
              <p className={`text-[35px] ${isDark_ ? 'text-white' : 'text-black'} font-black mt-[-10px]`}>
                {data ? data.ANS.currentLabel.toUpperCase() : ""}
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
        className={`absolute bottom-4 w-full h-[15px] flex flex-row justify-center items-center`}
      >
        <p
          className={`cursor-pointer ${isDark_ ? 'text-white' : 'text-black'} text-[12px] font-thin transition-all duration-300 hover:opacity-70 ${
            viewSwitch_
              ? "duration-[1000ms] opacity-30"
              : "duration-[1000ms] opacity-0"
          }`}
          onClick={() => {
          }}
        >
          {data ? data.arweave_address : ""}
        </p>

        <div
          className={`cursor-pointer ${isDark_ ? 'text-white' : 'text-black'} ml-2 flex flex-row min-w-2 absolute left-0 text-[12px] font-thin transition-all duration-300`}
          onClick={() => {
          }}
        >
          <p className={`m-2 cursor-pointer hover:opacity-70 ${
            viewSwitch_
              ? "duration-[1000ms] opacity-30"
              : "duration-[1000ms] opacity-0"
          }`} onClick={() => {
            dash_ ?
            setDash_(false)
            :
            setDash_(true)
          }}>
            {
            dash_ ?
            'Transactions'
            :
            'Assets'
          }
          </p>

          <p className={`m-2 cursor-pointer hover:opacity-70 ${
            viewSwitch_
              ? "duration-[1000ms] opacity-30"
              : "duration-[1000ms] opacity-0"
          }`} onClick={() => {
            setIsDark_(!isDark_)
          }}>
            {
            isDark_ ?
              'Light'
              :
              'Dark'
          }
          </p>
        </div>
      </div>

      <div
          className={`absolute right-3 bottom-4 ${isDark_ ? 'text-white' : 'text-black'} cursor-pointer w-[15px] h-[15px] transition-all duration-300 opacity-100 hover:opacity-70`}
          onClick={() => {
            setViewSwitch_(!viewSwitch_);
          }}
        >
          <FontAwesomeIcon icon={faExpand} />
        </div>
    </div>
  );
};

export default ProfileHUD;
