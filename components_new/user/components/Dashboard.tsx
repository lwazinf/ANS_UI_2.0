import { useState } from "react";
import { Res } from "../../../src/types";
import { extendDash, currentANFT, isDarkMode } from "../../../atoms";
import { useRecoilState } from "recoil";
import Visuals from "../Visuals";
const Converter = require("timestamp-conv");

interface DashboardProps {
  data: Res | undefined;
}

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

const Dashboard = ({ data }: DashboardProps) => {
  const [currentANFT_, setCurrentANFT_] = useRecoilState(currentANFT);
  const [viewDesc_, setViewDesc_] = useState(false);
  const ARWEAVE_URL = "/_next/image?url=https%3A%2F%2Farweave.net%2F";
  const [dash_, setDash_] = useRecoilState(extendDash);

  // Everything on this element is Light/Dark theme ready..
  const [isDark_, setIsDark_] = useRecoilState(isDarkMode);

  return (
    <div
      className={`w-[912px] h-[420px] flex flex-row justify-center items-center mx-auto`}
    >
      {/* Left Plate */}

      <div
        className={`h-[412px] ${
          dash_ ? "w-[452px]" : "w-full"
        } rounded-[4px] transition-all duration-200 overflow-hidden m-0 p-0 _container relative`}
      >
        <img
          src={`${
            currentANFT_ != -1
              ? ARWEAVE_URL + data?.ANFTS.koii[currentANFT_].id + "&w=3840&q=75"
              : ""
          }`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-[800ms] ${
            currentANFT_ != -1 ? "opacity-20" : "opacity-0"
          } `}
        />

        <d
          className={`${isDark_ ? "invert" : "invert-0"} scale-[-1] h-[412px] ${
            dash_ ? "w-[452px]" : "w-full"
          } absolute left-0 top-0 _filter opacity-20 transition-all`}
        />

        <div
          className={`w-full h-full absolute top-0 flex flex-row justify-center items-center transition-all duration-400 ${
            dash_ ? "opacity-100 left-[0px]" : "opacity-100 left-[0px]"
          }`}
        >
          {data ? <Visuals data={data.RSS3.transactions} /> : <div />}
        </div>

        <div
          className={`${
            isDark_ ? "bg-[#0f1729]/30" : "bg-white/30"
          } ${currentANFT_ == -1 ? 'duration-[1000ms] backdrop-blur-none pointer-events-none' : 'duration-200 backdrop-blur-xl pointer-events-auto'} transition-all h-full w-full absolute top-0 left-0`}
        />

        {/* Hidden Info Panel */}
        <div
          className={`w-[452px] h-[70px] flex flex-col justify-center items-center absolute bottom-0 left-0 ${
            dash_
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {currentANFT_ != -1 ? (
            <a
              href={`https://koi.rocks/content-detail/${data?.ANFTS.koii[currentANFT_].id}`}
            >
              <p
                className={`text-[14px] ${
                  isDark_ ? "text-white/30" : "text-black/30"
                } font-thin`}
              >
                View on Koii
              </p>
            </a>
          ) : (
            <div />
          )}
        </div>
        <div
          className={`absolute ${
            currentANFT_ != -1
              ? "top-0 duration-[800ms]"
              : "top-[-380px] duration-200"
          } transition-all left-0 w-[452px] h-[350px] shadow-md flex flex-col ${
            isDark_ ? "bg-[#0f1729]" : "bg-[ghostwhite]"
          } justify-center items-center ${
            dash_
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className={`w-full h-[60px] flex flex-row px-[20px] items-center`}
          >
            <div
              className={`h-[45px] w-[45px] rounded-[50%] bg-black/20 mr-2 shadow-md relative overflow-hidden`}
            >
              {data ? (
                // <img className={`w-full h-full object-cover`} src={`https://arweave.net/${data.ANS.avatar}`}/>
                // ND - using 'meson.network' for the profile pictures. May only work on xy account.
                <img
                  className={`w-full h-full object-cover absolute top-0 right-0 transition-all`}
                  src={`https://pz-prepnb.meson.network/${data.ANS.avatar}`}
                />
              ) : (
                <div />
              )}
            </div>
            <div
              className={`h-[55px] min-w-[60px] flex flex-row items-center pb-[1px]`}
            >
              {currentANFT_ != -1 ? (
                <div className={``}>
                  <p
                    className={`font-semibold ${
                      isDark_ ? "text-white/80" : "text-black/80"
                    } text-[15px] w-[250px] truncate`}
                  >
                    {data?.ANFTS.koii[currentANFT_].title}
                  </p>
                  <div className={`h-[13px] flex flex-row`}>
                    <p
                      className={`font-thin ${
                        isDark_ ? "text-white/40" : "text-black/40"
                      } text-[12px]`}
                    >
                      {`Acquired on ${new Converter.date(
                        data?.ANFTS.koii[currentANFT_].timestamp
                      ).getDay()} ${
                        // @ts-ignore
                        months_[
                          new Converter.date(
                            data?.ANFTS.koii[currentANFT_].timestamp
                          )
                            .getMonth()
                            .toString()
                        ]
                      }, ${new Converter.date(
                        data?.ANFTS.koii[currentANFT_].timestamp
                      ).getYear()}`}
                    </p>
                    <p
                      className={`ml-1 font-medium italic ${
                        isDark_ ? "text-white/80" : "text-black/80"
                      } text-[12px]`}
                    >
                      {"(" +
                        data?.ANFTS.koii[currentANFT_].poster.slice(0, 4) +
                        "..." +
                        data?.ANFTS.koii[currentANFT_].poster.slice(-4) +
                        ")"}
                    </p>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div
            className={`w-[430px] h-[250px] rounded-[6px] overflow-hidden relative cursor-pointer`}
            onClick={() => {
              setViewDesc_(!viewDesc_);
            }}
          >
            {currentANFT_ != -1 ? (
              <img
                className={`w-full h-full object-cover transition-all ${
                  viewDesc_
                    ? "duration-[200ms] opacity-60"
                    : "duration-[500ms] opacity-100"
                }`}
                src={
                  ARWEAVE_URL +
                  data?.ANFTS.koii[currentANFT_].id +
                  "&w=3840&q=75"
                }
              />
            ) : (
              <div />
            )}
            <div
              className={`backdrop-blur-xl ${
                isDark_ ? "bg-[#0f1729]/30" : "bg-white/30"
              } w-full h-full absolute top-0 left-0
            ${
              viewDesc_
                ? "duration-[200ms] opacity-100"
                : "duration-[500ms] opacity-0"
            }`}
            />
            <div
              className={`h-full w-full absolute top-0 left-0 flex flex-col justify-center items-center  ${
                !viewDesc_
                  ? "duration-[200ms] opacity-0"
                  : "duration-[800ms] opacity-100"
              }`}
            >
              {currentANFT_ != -1 ? (
                <div
                  className={`w-[320px] h-full text-center mx-auto font-black ${
                    isDark_ ? "text-white/60" : "text-black/60"
                  } text-[15px] flex flex-col justify-center items-center`}
                >
                  {data?.ANFTS.koii[currentANFT_].description}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className={`w-full h-[38px]`} />
        </div>
      </div>

      {/* Right Plate */}

      <div
        className={`h-[412px] ${
          dash_ ? "w-[457px] m-1 p-1" : "w-0 m-0 p-0"
        } transition-all rounded-[4px] relative`}
      >
        <div
          className={`${
            isDark_ ? "invert" : "invert-0"
          } h-full w-full scale-y-[-1] _filter opacity-20 transition-all rounded-[4px] absolute top-0 right-0`}
        ></div>
        <div
          className={`w-full h-full rounded-[4px] transition-all duration-200 _container _grid absolute top-0 right-0 m-0 pt-[1px] pl-[1px]`}
        >
          {data?.ANFTS.koii.map((nft, i) => {
            return (
              <div
                key={nft.id}
                className={`w-[145px] h-[145px] overflow-hidden relative rounded-[3px] cursor-pointer flex flex-row justify-center items-center transition-all ${
                  currentANFT_ == i
                    ? "opacity-100 duration-[500ms]"
                    : "opacity-80 duration-[200ms]"
                }`}
                onClick={() => {
                  if (currentANFT_ == i) {
                    setCurrentANFT_(-1);
                    setViewDesc_(false);
                  } else {
                    setCurrentANFT_(i);
                    setViewDesc_(false);
                  }
                }}
              >
                <img
                  className={`w-full h-full object-cover`}
                  src={ARWEAVE_URL + nft.id + "&w=3840&q=75"}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
