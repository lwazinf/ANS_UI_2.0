import axios from 'axios';
import { useState, useEffect } from 'react';
import { userInfo, Res } from '../../src/types';
import { EditModal } from '../../components/editor/editmodal';
import { Labels } from './components/labels';
import { UserInfo } from './components/userInfo';
import { Bio } from './components/bio';
import { Collectibles } from './components/collectibles';
import { ArweaveActivity } from './components/activity';
import { Selector } from './components/selector';
import { Divider } from './components/reusables';
import { Sidebar } from './sidebar';
import { Poaps } from './components/poaps';
import CoverPage from './components/CoverPage';
import GitPoapList from './components/gitpoaps/GitPoapList';
import { Koii, ArweaveTransaction } from '../../src/types';
import { arweaveTransactionHandler } from '../../src/utils';
import { faSearch, faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function PageContent(props: userInfo) {
  const bio = typeof props.userInfo.bio === 'string' ? 
  props.userInfo.bio : "";
  const info = props.userInfo;

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

  const [arkProfile, setArkProfile] = useState<Res | undefined>();

  const [KoiiNFTs, setKoiiNFTs] = useState<Koii[]>([]);
  const [filteredKoiis, setFilteredKoiis] = useState<Koii[]>([]);

  const [transactions, setTransactions] = useState<ArweaveTransaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<ArweaveTransaction[]>([]);

  // fetches user info by arweave wallet address
  const fetchData = async (address: string) => {
    const result = await axios(`https://ark-api.decent.land/v1/profile/arweave/${address}`)
    const resobject: Res = result?.data?.res;
    if (resobject) {
      setLoading(true)

      setArkProfile(resobject);
      const koiis = resobject.ANFTS?.koii || []
      setKoiiNFTs(koiis);
      setFilteredKoiis(koiis);
      const txs = resobject.ARWEAVE_TRANSACTIONS
      setTransactions(txs);
      setFilteredTransactions(txs)

      setLoading(false)
    }
  };

  const [ascending, setAscending] = useState<boolean>(true); 
  const filter = (items: any) => items.sort((a: any, b: any) => ascending ? a.timestamp - b.timestamp: b.timestamp - a.timestamp)

  const onSearch = (e: any) => {
    setSearch(e.target.value);

    if (selected === 0) {
      setFilteredKoiis(KoiiNFTs.filter((koii) => koii.title.toLowerCase().includes(e.target.value.toLowerCase())));
    }
    else if (selected === 1) {
      setFilteredTransactions(transactions.filter((tx) => arweaveTransactionHandler(tx).toLowerCase().includes(e.target.value.toLowerCase())));
    }
  };

  useEffect(() => {
    if (props.userInfo.user) {
      fetchData(props.userInfo.user)
    };
  }, [])

  const [selected, setselected] = useState<number>(0);

  const setSelectedClear = (idx: number) => setselected(() => {
    setSearch('');
    setFilteredKoiis(KoiiNFTs);
    setFilteredTransactions(transactions);
    return idx;
  });

  const items = [
    {
      name: "Collectibles",
      total: filteredKoiis.length,
      component: <Collectibles NFTs={filteredKoiis} loading={loading} />
    },
    {
      name: "Activity",
      total: filteredTransactions.length,
      component: <ArweaveActivity transactions={filteredTransactions} loading={loading} />
    }
  ];

  return (
    <div className="h-9 w-full ">
      <CoverPage userInfo={props.userInfo} />
      <div className="flex flex-wrap max-w-full rounded-lg px-16">
        <UserInfo user={{userInfo: info}} profile={arkProfile} />
        {/* These are temporary changes, most likely will need to bring them back as they would be helpful for contributros */}
        {/* <Labels userInfo={info} /> */}
        {/* <EditModal userColor={info.address_color} wallet={info.user} userInfo={props} />  */}
          <Divider /> 
        <div className=''>
          {(arkProfile && arkProfile.POAPS.length > 0) && 
            <Poaps props={arkProfile} />
          }
          {/* <GitPoapList list={arkProfile?.GITPOAPS!} />  */} {/* it's basically the same as poaps, hide it for now */}
        </div>
        <Divider />
        <div className="flex flex-col w-full h-full">
          <Selector items={items} selected={selected} setSelected={setSelectedClear} />
          <div className="flex items-center my-3">
            {/* TODO: MAKE REUSABLE SEARCHBAR */}
            <div className="relative w-full mr-8">
              <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-3 w-4 h-4" />
              <input
                value={search}
                onChange={(e) => onSearch(e)}
                className={`bg-gray-400/40 placeholder:text-black font-medium font-sans px-10 py-2 rounded-3xl transition-all duration-500 ease-in-out w-60 md:focus:w-[360px]`}
                placeholder={"Search " + items[selected].name}
              />
            </div>
            <div className="flex items-center pr-4">
              <button className="bg-primary/20 text-primary rounded-lg hover:bg-primary/30 p-2 flex items-center mr-2">
                <FontAwesomeIcon icon={faList} className="w-5 h-5" />
              </button>
              <button 
                className="bg-primary/20 text-primary rounded-lg hover:bg-primary/30 py-1.5 px-2.5 flex items-center"
                onClick={() => setAscending(() => {
                  if (selected === 0) setFilteredKoiis(filter(filteredKoiis))
                  if (selected === 1) setFilteredTransactions(filter(filteredTransactions))
                  return !ascending
                })}
              >
                {ascending ? "Newest" : "Oldest"}
              </button>
            </div>
          </div>
          {/* limiting the size to 44.65vw instead of 94vw to not have weird scroll logic due to content not fitting on the page*/}
          <div className="mt-4 mb-20 max-h-[44.65vw] scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-base-100 overflow-y-scroll pr-4">
            {items[selected].component}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UserPage (props: userInfo) {
  return (
    <div className="md:flex h-full w-full relative">
      {/* <div className="h-full max-h-full overflow-clip w-[250px] md:block hidden bg-base-100">
        <Sidebar />
      </div> */}
      <div className="w-full h-body overflow-y-scroll bg-base-200/25">
        <PageContent userInfo={props.userInfo} />
      </div>
    </div>
  )
}
