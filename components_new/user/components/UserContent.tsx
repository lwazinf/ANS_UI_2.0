import axios from "axios";
import { useEffect, useState } from "react";
import { Nfts } from "../../../components/Nfts";
import { Res } from "../../../src/types";

interface UserContentProps {
  data : Res | undefined,
}

const UserContent = ({data}: UserContentProps) => {
    const [currentANFT_, setCurrentANFT_] = useState(-1)
    const ARWEAVE_URL = '/_next/image?url=https%3A%2F%2Farweave.net%2F'
  return (
    <div
      className={`w-[912px] h-[420px] flex flex-row justify-center items-center mx-auto`}
    >
      <div className={`_container m-1`}>
        {currentANFT_}
      </div>
      <div className={`_container m-1`}>
        {
          data?.ANFTS.koii.map((nft, i) => {
            return (
              <div key={nft.id} className={`_gridPost overflow-hidden relative rounded-[4px] flex flex-row justify-center items-center`} onClick={() => {
                if(currentANFT_ == i){
                  setCurrentANFT_(-1)
                }else{
                  setCurrentANFT_(i)
                }
              }}>
                <img className={`w-full h-full object-cover`} src={ARWEAVE_URL + nft.id + '&w=3840&q=75'} />
              </div>
            )
          })
        } 
      </div>
    </div>
  );
};

export default UserContent;
