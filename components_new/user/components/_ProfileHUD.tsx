import {
  faEthereum,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faAngleLeft,
  faAngleRight,
  faArrowLeft,
  faArrowRight,
  faBacteria,
  faExpand,
  faGlobe,
  faImage,
  faPanorama,
  faPieChart,
  faQrcode,
  faScroll,
  faSliders,
  faStamp,
  faVrCardboard,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import QRCode from "react-qr-code";
import { useRecoilState } from "recoil";
import {
  extendDash,
  isDarkMode,
  currentANFT,
  hudAux,
  hoverData,
  showNews,
  currentState,
} from "../../../atoms";
import { Res } from "../../../src/types";
import ProfileBadge from "./modals/ProfileBadge";
import TwitterNews_ from "../_TwitterAPI";
const Converter = require("timestamp-conv");

interface ProfileHUDProps {
  data: Res | undefined;
}

const ProfileHUD = ({ data }: ProfileHUDProps) => {
  // Recoil atom, recieves dashboard control signal
  const [hudAux_, setHudAux_] = useRecoilState(hudAux);
  // Recoil atom, selects current dasboard category ui
  const [currentData_, setCurrentData_] = useRecoilState(currentState);
  // Recoil atom, toggles dashboard ui
  const [dash_, setDash_] = useRecoilState(extendDash);
  // Recoil atom, toggles HUD ui, mainly for Arweave News updates
  const [showNews_, setShowNews_] = useRecoilState(showNews);
  // Recoil atom, selects NFT item to display
  const [currentANFT_, setCurrentANFT_] = useRecoilState(currentANFT);
  // Recoil atom, Light/Dark theme toggle..
  const [isDark_, setIsDark_] = useRecoilState(isDarkMode);
  // Recoil atom, stores focus data..
  const [hoverData_, setHoverData_] = useRecoilState(hoverData);
  // Switches HUD views, simple or detailed
  const [viewSwitch_, setViewSwitch_] = useState(true);
  // Toggles between the QRCode and Display picture
  const [viewQR_, setViewQR_] = useState(true);
  //
  const [viewItem_, setViewItem_] = useState("");
  const [stampIndex_, setStampIndex_] = useState(0);

  const stamps_ = data
  // @ts-ignore
    ? data.STAMPS.filter((d) => d.stampedAssetType == "image")
    : [];

  const months_ = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    "10": "Oct",
    "11": "Nov",
    "12": "Dec",
  };

  return (
    <div
      className={`
      w-[900px] h-[300px] rounded-[4px] shadow-md 
      ${isDark_ ? "bg-black" : "bg-white"} 
      relative mx-auto mt-4 flex flex-col justify-center items-center overflow-hidden mb-4
      `}
      id={`
      userCard
      `}
    >
      
      {/* 👇👇👇 Cover Photo.. could be used for personal branding (user) or as advertising space (AR.PAGE) */}
      <img
        className={`
        w-full h-full object-cover absolute top-0 saturate-[1]
        ${
          viewSwitch_
            ? "opacity-60 duration-[800ms]"
            : "opacity-0 duration-[800ms]"
        }
        transition-all
        `}
        src={`
        https://images.pexels.com/photos/1714340/pexels-photo-1714340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
        `}
      />

<img
        className={`
        w-full h-full object-cover absolute top-0 saturate-[1]
        ${
          !viewSwitch_
            ? "opacity-80 duration-[800ms]"
            : "opacity-0 duration-[800ms]"
        }
        transition-all
        `}
        src={`
        https://images.pexels.com/photos/709237/pexels-photo-709237.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2
        `}
      />

      {/* 👇👇👇 Blur cover.. blurs the background for better focus on foreground elements */}
      <div
        className={`
        w-full h-full 
        ${
          isDark_
            ? viewSwitch_
              ? "bg-black/5"
              : "bg-black/80"
            : viewSwitch_
            ? "bg-white/5"
            : "bg-white/80"
        } 
        absolute top-0 left-0 opacity-100 duration-[400ms] backdrop-blur-sm transition-all
      `}
      />

      {/* 👇👇👇 Design element.. softens background, adds transition */}
      <div
        className={`
        ${isDark_ ? "invert-0" : "invert"} 
        w-full h-full absolute top-0 _filter 
        ${
          viewSwitch_
            ? "duration-[400ms] opacity-100"
            : "duration-[800ms] opacity-20"
        } 
        transition-all
        `}
      />

      {/* 👇👇👇 Latest news from Arweave News Twitter feed */}
      <div
        className={`
        w-full h-full flex flex-row justify-center items-center 
        ${isDark_ ? "text-white" : "text-black"} 
        text-[12px] font-thin absolute top-0 left-0
        transition-all 
        ${
          showNews_
            ? "opacity-100 duration-[1000ms]"
            : "opacity-0 duration-[100ms]"
        }
        `}
      >
        {/* 👇👇👇 Twitter Widget */}
        <TwitterNews_ />
      </div>

      <div
        className={`text-white w-full h-full flex flex-row justify-center items-center relative left-[123px] transition-all duration-400
        `}
      >
        <div
          className={`w-[120px] h-[120px] flex flex-row justify-center items-center overflow-hidden relative ${viewSwitch_ ? 'pointer-events-auto z-0' : 'pointer-events-none z-10'}`}
        >
          {data ? (
            <img
              className={`w-full h-full object-cover absolute top-0 right-0 transition-all
                  ${viewSwitch_ ? "opacity-0" : "opacity-100"}
                  `}
              src={`https://arweave.net/${stamps_[stampIndex_].stampedAsset}`}
              onClick={() => {}}
            />
          ) : (
            <div />
          )}
        </div>
        <div
          className={`
              flex flex-col items-left justify-center h-[80px] w-[250px] relative left-[8px] top-[4px]
              ${
                viewSwitch_
                  ? "opacity-0 pointer-events-none duration-[800ms]"
                  : "opacity-100 pointer-events-auto duration-[400ms]"
              }
              `}
        >
          {/* 👇👇👇 Stamp Bio */}
          <p
            className={`
                text-[13px] 
                ${isDark_ ? "text-white/70" : "text-black"} 
                font-thin m-0 overflow-clip
                `}
          >
            {data ? stamps_[stampIndex_].description : ""}
          </p>

          {/* 👇👇👇 Stamp Name */}
          <div
            className={`
                relative h-[50px] min-w-[50px] flex flex-row mt-1
                `}
          >
            <p
              className={`
                  text-[35px] 
                  ${isDark_ ? "text-white" : "text-black"} 
                  font-black mt-[-10px] transition-all duration-200 pointer-events-none truncate overflow-hidden
                  ${hoverData_[0] == "" ? "opacity-100" : "opacity-100"}
                  `}
            >
              {data ? stamps_[stampIndex_].title : ""}
            </p>
            <div
              className={`
                  ml-[-5px] transition-all duration-200 
                  ${viewSwitch_ ? "opacity-0" : "opacity-100"}
                  `}
            ></div>
          </div>
          <p
            className={`
                text-[13px] 
                ${isDark_ ? "text-white/70" : "text-black"} 
                font-thin m-0
                `}
          >
            {data ? `Stamp Date: ${new Converter.date(
              stamps_[stampIndex_].timestamp
            ).getDay()} ${
              // @ts-ignore
              months_[
                new Converter.date(stamps_[stampIndex_].timestamp)
                  .getMonth()
                  .toString()
              ]
            }, ${new Converter.date(stamps_[stampIndex_].timestamp).getYear()}` : ''}
          </p>
        </div>
      </div>

      {/* 👇👇👇 Arweave Logo.. takes users to Arweave ArWiki page */}
      <a
        href={`https://arwiki.wiki/#/en/category/the_arweave_project`}
        target={"_blank"}
        rel={"noreferrer"}
        className={`absolute top-[-10px] left-[10px] z-10`}
      >
        <img
          className={`
          w-[100px] h-[100px] rotate-[20deg] object-cover 
          ${isDark_ ? "invert" : "invert-0"} 
          ${
            viewSwitch_
              ? "duration-[800ms] opacity-40"
              : "duration-[400ms] opacity-20"
          } 
          transition-all
          `}
          src={`
          /ProfileHUD/ar_logo.png
          `}
        />
      </a>

      {/* 👇👇👇 Detailed HUD nickname element */}
      <div
        className={`
      w-full h-full absolute top-0 p-[15px] ml-[-30px]
      `}
      >
        <div
          className={`
          absolute bottom-10 text-white w-full h-[15px] flex flex-row justify-center font-black transition-all duration-300 hover:opacity-90
          `}
        >
          <div
            className={`
            transition-all duration-[200ms] w-full h-[20px] flex flex-row justify-center items-center rounded-[2px] p-1
            ${!viewSwitch_ ? "opacity-0" : "opacity-100"} 
            relative
            `}
          >
            {/* 👇👇👇 Detail element, main nickname */}
            <div
              className={`
              ${
                hoverData_[0] != "" || showNews_
                  ? "opacity-0 bottom-[-2px] duration-[400ms]"
                  : "opacity-100 bottom-[0px] duration-[600ms]"
              } 
              relative transition-all
              `}
            >
              <p
                className={`
                cursor-pointer 
                ${isDark_ ? "text-white" : "text-black"} 
                font-black transition-all hover:opacity-100 
                ${
                  viewSwitch_
                    ? "duration-[400ms] opacity-100"
                    : "duration-[100ms] opacity-70"
                } 
                ${
                  hoverData_[0] != "" || showNews_
                    ? "text-[12px]"
                    : "text-[15px]"
                }
                `}
              >
                {data ? data.ANS.nickname.toUpperCase() : ""}
              </p>
            </div>

            {/* 👇👇👇 Detail element, secondary nickname, hover details */}
            <div
              className={`
              w-full h-full 
              ${
                hoverData_[0] != "" || showNews_
                  ? "opacity-100 pt-[0px] duration-[1000ms]"
                  : "opacity-0 pt-[20px] duration-[1400ms]"
              } 
              absolute top-0 left-0 flex flex-col justify-center items-center
              `}
            >
              <p
                className={`
                cursor-pointer 
                ${
                  hoverData_[0] != "" || showNews_
                    ? "text-[15px]"
                    : "text-[12px]"
                } 
                ${isDark_ ? "text-white" : "text-black"} 
                absolute font-black transition-all hover:opacity-100 
                ${
                  viewSwitch_
                    ? "duration-[400ms] opacity-100"
                    : "duration-[100ms] opacity-70"
                }
                `}
              >
                {hoverData_[0] == "dashboard0" && !showNews_
                  ? "Dashboard".toUpperCase()
                  : showNews_
                  ? "Show Time"
                  : hoverData_[0] == "display"
                  ? // @ts-ignore
                    data.ANS.nickname.toUpperCase()
                  : // @ts-ignore
                    hoverData_[0].toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 👇👇👇 Main Control Area, hover data on control elements changes nickname element behaviour */}
      <div
        className={`
        w-full h-full absolute 
        ${
          showNews_
            ? "duration-200 opacity-5 top-[-140px] pointer-events-none"
            : "duration-700 opacity-100 top-[0px] pointer-events-auto"
        } 
        transition-all flex flex-row justify-center items-center pr-[30px]
        `}
      >
        <div
          className={`
          w-full h-full absolute top-0 pl-[245px] flex flex-row justify-center items-center transition-all
          `}
        >
          {/* 👇👇👇 Socials & External Links */}
          <div
            className={`
            flex flex-col justify-center items-end transition-all w-[30px] h-[130px] 
            ${
              viewSwitch_
                ? "opacity-100 pointer-events-auto duration-[400ms]"
                : "opacity-0 pointer-events-none duration-[800ms]"
            }
            `}
          >
            <div
              className={`
              w-[20px] hover:w-[120px] cursor-pointer duration-[200ms] transition-all my-[4px] flex flex-row relative overflow-hidden 
              ${
                hoverData_[0] == "" ||
                hoverData_[0] == "ardrive" ||
                hoverData_[0] == "display" ||
                hoverData_[0] == "news" ||
                hoverData_[0] == "expand" ||
                hoverData_[0] == "dashboard"
                  ? "opacity-100"
                  : "opacity-80"
              } 
              ${showNews_ ? "pointer-events-none" : "pointer-events-auto"}
              `}
            >
              <div
                className={`
                w-[120px] h-full absolute left-0 pl-[30px] font-medium text-[13px] 
                ${isDark_ ? "text-white/40" : "text-black/60"} 
                flex flex-col justify-center hover:opacity-100 opacity-0 duration-300 transition-all
                `}
              >
                {data ? (
                  <a
                    href={"https://twitter.com/" + data.ANS.links.twitter}
                    target={"_blank"}
                    rel={"noreferrer"}
                  >
                    {data.ANS.links.twitter}
                  </a>
                ) : (
                  "Unknown"
                )}
              </div>

              <FontAwesomeIcon
                icon={faTwitter}
                className={`
                text-center duration-[200ms] transition-all 
                ${
                  isDark_
                    ? "hover:text-white text-white/80"
                    : "hover:text-black text-black/80"
                } 
                w-[20px] h-[20px]
                `}
              />
            </div>
            <div
              className={`
              w-[20px] hover:w-[120px] cursor-default duration-[200ms] transition-all 
              ${
                hoverData_[0] == "" ||
                hoverData_[0] == "ardrive" ||
                hoverData_[0] == "display" ||
                hoverData_[0] == "news" ||
                hoverData_[0] == "expand" ||
                hoverData_[0] == "dashboard"
                  ? "opacity-100"
                  : "opacity-80"
              } 
              my-[4px] flex flex-row relative overflow-hidden 
              ${showNews_ ? "pointer-events-none" : "pointer-events-auto"}
              `}
            >
              <div
                className={`
                w-[120px] h-full absolute left-0 pl-[30px] font-medium text-[13px] 
                ${isDark_ ? "text-white/40" : "text-black/60"} 
                flex flex-col justify-center hover:opacity-100 opacity-0 duration-300 transition-all
                `}
              >
                {data ? data.ENS : "Unknown"}
              </div>

              <FontAwesomeIcon
                icon={faEthereum}
                className={`
                text-center duration-[200ms] transition-all 
                ${
                  isDark_
                    ? "hover:text-white text-white/80"
                    : "hover:text-black text-black/80"
                } 
                w-[20px] h-[20px]
                `}
              />
            </div>
            <div
              className={`
              w-[20px] hover:w-[120px] cursor-pointer duration-[200ms] 
              ${
                hoverData_[0] == "" ||
                hoverData_[0] == "ardrive" ||
                hoverData_[0] == "display" ||
                hoverData_[0] == "news" ||
                hoverData_[0] == "expand" ||
                hoverData_[0] == "dashboard"
                  ? "opacity-100"
                  : "opacity-80"
              } 
              transition-all my-[4px] flex flex-row relative overflow-hidden 
              ${showNews_ ? "pointer-events-none" : "pointer-events-auto"}
              `}
            >
              <div
                className={`
                w-[120px] h-full absolute left-0 pl-[30px] font-medium text-[13px] 
                ${isDark_ ? "text-white/40" : "text-black/60"} 
                flex flex-col justify-center hover:opacity-100 opacity-0 duration-300 transition-all
                `}
              >
                {data ? (
                  <a
                    href={"https://github.com/" + data.ANS.links.github}
                    target={"_blank"}
                    rel={"noreferrer"}
                  >
                    {data.ANS.links.github}
                  </a>
                ) : (
                  "Unknown"
                )}
              </div>
              <FontAwesomeIcon
                icon={faGithub}
                className={`
                text-center duration-[200ms] transition-all 
                ${
                  isDark_
                    ? "hover:text-white text-white/80"
                    : "hover:text-black text-black/80"
                } 
                w-[20px] h-[20px]
                `}
              />
            </div>

            <div
              className={`
              w-[20px] hover:w-[120px] 
              ${
                hoverData_[0] == "" ||
                hoverData_[0] == "ardrive" ||
                hoverData_[0] == "display" ||
                hoverData_[0] == "news" ||
                hoverData_[0] == "expand" ||
                hoverData_[0] == "dashboard"
                  ? "opacity-100"
                  : "opacity-80"
              } 
              cursor-pointer duration-[200ms] transition-all my-[4px] flex flex-row relative overflow-hidden 
              ${showNews_ ? "pointer-events-none" : "pointer-events-auto"}
              `}
            >
              <div
                className={`
                w-[120px] h-full absolute left-0 pl-[30px] font-medium text-[13px] 
                ${isDark_ ? "text-white/40" : "text-black/60"} 
                flex flex-col justify-center hover:opacity-100 opacity-0 duration-300 transition-all
                `}
              >
                {data ? (
                  <a
                    href={data.ANS.links.customUrl}
                    target={"_blank"}
                    rel={"noreferrer"}
                  >
                    {data.ANS.links.customUrl.split(".")[1]}
                  </a>
                ) : (
                  "Unknown"
                )}
              </div>
              <FontAwesomeIcon
                icon={faGlobe}
                className={`
                text-center duration-[200ms] transition-all 
                ${
                  isDark_
                    ? "hover:text-white text-white/80"
                    : "hover:text-black text-black/80"
                } 
                w-[20px] h-[20px]
                `}
              />
            </div>
          </div>

          {/* 👇👇👇 Profile Picture & QR Code */}
          <div
            className={`
            ${
              hoverData_[0] != ""
                ? "top-[0px] duration-[800ms]"
                : "top-[0px] duration-[200ms]"
            } 
            ${viewSwitch_ ? "opacity-100" : "opacity-0"}
            transition-all relative
            `}
          >
            <div
              className={`
              transition-all p-1 m-2 relative overflow-hidden w-[120px] h-[120px]
          rounded-[2px] 
          ${isDark_ ? "bg-white" : "bg-black"} 
          hover:opacity-100 cursor-pointer 
          ${
            viewSwitch_
              ? "opacity-80 pointer-events-auto duration-[400ms]"
              : "opacity-80 pointer-events-none duration-[800ms]"
          }
              `}
              onClick={() => {
                setViewQR_(!viewQR_);
              }}
              onMouseEnter={() => {
                return setHoverData_(["display", 0]);
              }}
              onMouseLeave={() => {
                if (!showNews_) {
                  return setHoverData_(["", 0]);
                } else {
                  setHoverData_(["news", 0]);
                }
              }}
            >
              {/* 👇👇👇 We use the username (suffix) & address (parameter) in the address bar already */}
              {/* 👇👇👇 QRCode is generated here.. this is an  added feature for (fast) easy access to one's profile! */}
              {/* 👇👇👇 If I were to add my profile to a CV/Resume, this would be a pretty cool way to point at it! */}

              {data ? (
                <QRCode
                  size={256}
                  className={`w-full h-full ${
                    isDark_ ? "invert-0" : "invert"
                  } ${
                    viewQR_
                      ? "opacity-0 duration-200"
                      : "opacity-100 duration-500"
                  }`}
                  value={`https://ar.page/p/${data?.ANS.currentLabel}`}
                  viewBox={`0 0 256 256`}
                />
              ) : (
                <div />
              )}

              {/* 👇👇👇 User Profile picture, nothing crazy */}
              {data ? (
                <img
                  className={`w-full h-full object-cover absolute top-0 right-0 transition-all ${
                    viewQR_
                      ? "opacity-100 duration-500"
                      : "opacity-0 duration-200"
                  }`}
                  src={`https://pz-prepnb.meson.network/${data.ANS.avatar}`}
                />
              ) : (
                <div />
              )}
            </div>
          </div>

          {/* 👇👇👇 Textual Data */}
          <div
            className={`
            flex flex-col justify-start items-center pt-6 h-[120px] 
            ${
              viewSwitch_
                ? "opacity-100 pointer-events-auto duration-[400ms]"
                : "opacity-100 pointer-events-none duration-[800ms]"
            }
            `}
          >
            <div
              className={`
              flex flex-col items-left justify-center h-[80px] w-[250px]
              ${
                viewSwitch_
                  ? "opacity-100 pointer-events-auto duration-[400ms]"
                  : "opacity-0 pointer-events-none duration-[800ms]"
              }
              `}
            >
              {/* 👇👇👇 Profile Bio */}
              <p
                className={`
                text-[13px] 
                ${isDark_ ? "text-white/70" : "text-black"} 
                font-thin m-0
                `}
              >
                {data ? data.ANS.bio : ""}
              </p>

              {/* 👇👇👇 Username */}
              <div
                className={`
                relative h-[50px] min-w-[50px] flex flex-row mt-1
                `}
              >
                <p
                  className={`
                  text-[35px] 
                  ${isDark_ ? "text-white" : "text-black"} 
                  font-black mt-[-10px] transition-all duration-200 pointer-events-none 
                  ${hoverData_[0] == "" ? "opacity-100" : "opacity-100"}
                  `}
                >
                  {data ? data.ANS.currentLabel.toUpperCase() : ""}
                </p>
                <div
                  className={`
                  ml-[-5px] transition-all duration-200 
                  ${viewSwitch_ ? "opacity-100" : "opacity-0"}
                  `}
                >
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
      </div>

      <div
        className={`
        absolute bottom-4 w-full h-[15px] flex flex-row justify-center items-center 
        ${
          viewSwitch_
            ? "duration-[600ms] opacity-100"
            : "duration-[200ms] opacity-0"
        }
        `}
      >
        {/* 👇👇👇 User's Address */}
        <div
          className={`
          ${hudAux_ ? "duration-[400ms]" : "duration-[1000ms]"} 
          transition-all
          `}
        >
          <div
            className={`
            ${
              hoverData_[0] != "" || showNews_
                ? "opacity-0 duration-[200ms]"
                : "opacity-100 duration-[600ms]"
            } 
            transition-all relative
            `}
          >
            <p
              className={`
              cursor-pointer 
              ${isDark_ ? "text-white" : "text-black"} 
              text-[12px] font-thin transition-all hover:opacity-70 
              ${
                viewSwitch_
                  ? "duration-[1000ms] opacity-30"
                  : "duration-[1000ms] opacity-0"
              }
              `}
            >
              {data ? data.arweave_address : ""}
            </p>
          </div>
        </div>

        <p
          className={`
          ${isDark_ ? "text-white/60" : "text-black/60"} 
          text-[12px] font-thin p-0 
          ${
            hoverData_[0] != "" || showNews_
              ? "opacity-100 duration-[800ms] top-[-2px]"
              : "opacity-0 duration-[50ms] top-[-10px]"
          } 
          text-[12px] text-center transition-all absolute w-full
          `}
        >
          {/* 👇👇👇 This block of code dictates what data's shown on the text below the nicknames */}
          {hoverData_[0] == "dashboard" || hoverData_[0] == "dashboard0"
            ? ""
            : showNews_
            ? ""
            : hoverData_[0] == "" && hoverData_[1] == 0
            ? ""
            : hoverData_[0] == "display"
            ? ""
            : hoverData_[0] == "news"
            ? ""
            : hoverData_[0] == "expand"
            ? ""
            : hoverData_[0] != "ardrive"
            ? hoverData_[1]
            : ""}
          {hoverData_[0] == "dashboard" || hoverData_[0] == "dashboard0"
            ? ""
            : showNews_
            ? ""
            : hoverData_[0] == "" && hoverData_[1] == 0
            ? ""
            : hoverData_[0] == "display"
            ? ""
            : hoverData_[0] == "news"
            ? ""
            : hoverData_[0] == "expand"
            ? ""
            : hoverData_[0] != "ardrive"
            ? " "
            : ""}
          {hoverData_[0] == "dashboard" || hoverData_[0] == "dashboard0"
            ? ""
            : showNews_
            ? ""
            : hoverData_[0] == "" && hoverData_[1] == 0
            ? ""
            : hoverData_[0] == "display"
            ? ""
            : hoverData_[0] == "ardrive"
            ? ""
            : hoverData_[0] == "news"
            ? ""
            : hoverData_[0] == "expand"
            ? ""
            : hoverData_[1].toString().includes(".")
            ? ""
            : hoverData_[0] == "transaction"
            ? "normal"
            : hoverData_[0] == ""
            ? " "
            : hoverData_[0] + ""}
          {hoverData_[0] == "dashboard" || hoverData_[0] == "dashboard0"
            ? ""
            : showNews_
            ? ""
            : hoverData_[0] == "" && hoverData_[1] == 0
            ? ""
            : hoverData_[0] == "display"
            ? ""
            : hoverData_[0] == "news"
            ? ""
            : hoverData_[0] == "expand"
            ? ""
            : hoverData_[0] != "ardrive"
            ? ""
            : " "}{" "}
          {hoverData_[0] == "" && hoverData_[1] == 0
            ? ""
            : showNews_
            ? "Latest Arweave News"
            : hoverData_[0] == "dashboard0"
            ? currentData_ == "tag" && hoverData_[1] == -99
              ? "Currently viewing tag"
              : currentData_ == "type" && hoverData_[1] == -98
              ? "Currently viewing type"
              : currentData_ == "platform" && hoverData_[1] == -97
              ? "Currently viewing platform"
              : currentData_ == "network" && hoverData_[1] == -96
              ? "Currently viewing network"
              : `Switch to ${
                  hoverData_[1] == -99
                    ? "tag"
                    : hoverData_[1] == -98
                    ? "type"
                    : hoverData_[1] == -97
                    ? "platform"
                    : hoverData_[1] == -96
                    ? "network"
                    : ""
                }..`
            : hoverData_[0] == "display"
            ? `Switch to ${viewQR_ ? "QRCode" : "DP"}`
            : hoverData_[0] == "ardrive"
            ? "Download Feature File"
            : hoverData_[0] == "expand"
            ? `Switch cover`
            : hoverData_[0] == "news"
            ? `Latest Arweave News`
            : hoverData_[1] > 1
            ? "transactions"
            : hoverData_[1] == 1
            ? "transaction"
            : hoverData_[1].toString().includes(".")
            ? "in fees"
            : hoverData_[1] == 0 &&
              !hoverData_[1].toString().includes(".") &&
              hoverData_[0] != "dashboard"
            ? "No transactions"
            : `${dash_ ? "Activate" : "Deactivate"} Dashboard
            `}
        </p>
      </div>

      {/* 👇👇👇 Expand button, HUD bottom right */}
      <div
        className={`
        absolute right-3 
        ${isDark_ ? "text-white" : "text-black"} 
        cursor-pointer w-[15px] h-[15px] bottom-4 transition-all  opacity-100 hover:opacity-70
        `}
        onClick={() => {
          setViewSwitch_(!viewSwitch_);
        }}
        onMouseEnter={() => {
          return setHoverData_(["expand", 0]);
        }}
        onMouseLeave={() => {
          if (!showNews_) {
            setHoverData_(["", 0]);
          } else {
            setHoverData_(["news", 0]);
          }
        }}
      >
        {/* 👇👇👇 Important user control element */}
        { viewSwitch_
          ? <FontAwesomeIcon icon={faStamp} />
        : <FontAwesomeIcon icon={faSliders} />}
      </div>

      {/* 👇👇👇 Stamp UI buttons, HUD bottom right */}
      <div
        className={`
        absolute right-[70px] bottom-4 
        ${isDark_ ? "text-white" : "text-black"} 
        cursor-pointer w-[15px] h-[15px] transition-all duration-300 hover:opacity-70
        ${viewSwitch_ ? 'opacity-0 pointer-events-none' : stampIndex_ == 0 ? 'opacity-50 pointer-events-auto' : 'opacity-100 pointer-events-auto'}
        `}
        onClick={() => {
          if(stampIndex_ != 0){
            setStampIndex_(stampIndex_ - 1)
          }
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </div>

      <div
        className={`
        absolute right-[45px] bottom-4 
        ${isDark_ ? "text-white" : "text-black"} 
        cursor-pointer w-[15px] h-[15px] transition-all duration-300 hover:opacity-70
        ${viewSwitch_ ? 'opacity-0 pointer-events-none' : stampIndex_ == stamps_.length-1 ? 'opacity-50 pointer-events-auto' : 'opacity-100 pointer-events-auto'}
        `}
        onClick={() => {
          if(stampIndex_ < stamps_.length-1){
            setStampIndex_(stampIndex_ + 1)
          }
        }}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </div>

      <div
        className={`
        w-[100px] h-[20px] text-center font-medium text-[12px] 
        ${isDark_ ? "text-white/40" : "text-black/60"} 
        flex flex-col justify-center 
        ${
          viewItem_ != ""
            ? "opacity-100 bottom-[37px] duration-200"
            : "opacity-0 bottom-[45px] duration-600"
        } 
        absolute right-[-15px] transition-all
        `}
      >
        {viewItem_ == "expand" ? "Expand" : viewItem_ == "news" ? "News" : ""}
      </div>

      {/* 👇👇👇 Ardrive Feature File */}
      <div
        className={`
        min-h-[23px] w-[28px] absolute bottom-[8.5px] left-[75px] flex flex-row 
        ${
          !viewSwitch_
            ? "opacity-0 duration-200 pointer-events-none"
            : "opacity-100 duration-600 pointer-events-auto"
        } 
        transition-all
        `}
      >
        <div
          className={`
          w-[28px] hover:w-[28px] cursor-pointer duration-200 transition-all m-[2px] flex flex-row relative overflow-hidden opacity-100 hover:opacity-70
          `}
          onMouseEnter={() => {
            return setHoverData_(["ardrive", 0]);
          }}
          onMouseLeave={() => {
            if (!showNews_) {
              setHoverData_(["", 0]);
            } else {
              setHoverData_(["news", 0]);
            }
          }}
          onClick={() => {}}
        >
          <img
            src={
              "https://ardrive.io/wp-content/uploads/2022/09/ArDrive-Logo-Wordmark-Dark-PS1600-768x174.png"
            }
            alt={`ardrive Logo`}
            className={`
            h-[20px] w-[28px] object-cover opacity-100 hover:opacity-80 duration-400 transition-all cursor-pointer object-left
            `}
          />
        </div>
      </div>

      {/* 👇👇👇 Arweave News */}
      <div
        className={`
        min-h-[20px] w-[24px] absolute bottom-[8.5px] left-[45px] flex flex-row 
        ${
          !viewSwitch_
            ? "opacity-0 duration-200 pointer-events-none"
            : "opacity-100 duration-600 pointer-events-auto"
        } 
        transition-all
        `}
      >
        <div
          className={`
          w-[21px] hover:w-[21px] cursor-pointer duration-200 transition-all m-[2px] flex flex-row relative overflow-hidden opacity-90 hover:opacity-70
          `}
          onMouseEnter={() => {
            return setHoverData_(["news", 0]);
          }}
          onMouseLeave={() => {
            if (!showNews_) {
              setHoverData_(["", 0]);
            }
          }}
          onClick={() => {
            setShowNews_(!showNews_);
          }}
        >
          <FontAwesomeIcon
            icon={faScroll}
            className={`
            text-center duration-[200ms] transition-all 
            ${
              isDark_
                ? "hover:text-white text-white"
                : "hover:text-black text-black"
            } 
            w-[21px] h-[21px]
            `}
          />
        </div>
      </div>

      {/* 👇👇👇 Dashboard state toggle */}
      <div
        className={`
        min-h-[20px] w-[24px] absolute bottom-[8.5px] left-[15px] flex flex-row 
        ${
          !viewSwitch_
            ? "opacity-0 duration-200 pointer-events-none"
            : "opacity-100 duration-600 pointer-events-auto"
        } 
        transition-all
        `}
      >
        <div
          className={`
          w-[21px] hover:w-[21px] cursor-pointer duration-200 transition-all m-[2px] flex flex-row relative overflow-hidden opacity-90 hover:opacity-70
          `}
          onMouseEnter={() => {
            return setHoverData_(["dashboard", 0]);
          }}
          onMouseLeave={() => {
            if (!showNews_) {
              return setHoverData_(["", 0]);
            } else {
              return setHoverData_(["news", 0]);
            }
          }}
          onClick={() => {
            setCurrentANFT_(-1);
            dash_ ? setDash_(false) : setDash_(true);
          }}
        >
          {dash_ ? (
            <FontAwesomeIcon
              icon={faPieChart}
              className={`text-center duration-[200ms] transition-all ${
                isDark_
                  ? "hover:text-white text-white"
                  : "hover:text-black text-black"
              } w-[21px] h-[21px]`}
            />
          ) : (
            <FontAwesomeIcon
              icon={faPanorama}
              className={`text-center duration-[200ms] transition-all ${
                isDark_
                  ? "hover:text-white text-white"
                  : "hover:text-black text-black"
              } w-[21px] h-[21px]`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHUD;
