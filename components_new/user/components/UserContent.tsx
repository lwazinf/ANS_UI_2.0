import axios from "axios";
import { useEffect, useState } from "react";
import { Nfts } from "../../../components/Nfts";
import { Res } from "../../../src/types";

interface UserContentProps {
  data : Res | undefined,
}

const UserContent = ({data}: UserContentProps) => {
    const [data_, setData_] = useState({})
    const ARWEAVE_URL = 'https://arweave.net/'
  return (
    <div
      className={`w-[912px] h-[420px] flex flex-row justify-center items-center mx-auto`}
    >
      <div className={`_container m-1`} />
      <div className={`_container m-1`}>
        {
          data?.ANFTS.koii.map((nft, i) => {
            return (
              <div key={nft.id} className={`_gridPost overflow-hidden relative`} onClick={() => {
                console.log(nft.id)
              }}>
                <img className={`w-full object-cover`} src={ARWEAVE_URL + nft.id} />
              </div>
            )
          })
        } 
      </div>
    </div>
  );
};

export default UserContent;
