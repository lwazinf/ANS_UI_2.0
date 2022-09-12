import React from 'react';
import Poaps from './poaps';
import TabContent from './tabcontent';
import { HACKATHON_WIDGETS_TOP_PART } from '../../hackathon/api/widgets';
import { Res } from '../../../../src/types';
import { Divider } from '../reusables';

export interface WidgetType {
  children: any; // pass default component here
  canRender: boolean; // pass conditionals here
  loading?: boolean;
  loadingChildren?: any; // pass loading animation component here
}

export function Widget(props: WidgetType) {
  return (
    <>
      {props.canRender ? (
        <>
          <Divider />
          {props.children}
        </>
      ): (
        <>
          {/* for loading animations */}
          {props.loadingChildren}
        </>
      )}
    </>
  )
}

export const DEFAULT_COMPONENT_LIST: WidgetType[] = [

]


export default function Widgets({arkProfile, loading}: {arkProfile: Res | undefined, loading: boolean}) {
  if (!arkProfile) return <></>
  const defaultWidgets = [
    <Widget canRender={arkProfile?.POAPS?.length > 0} loading={loading}>
      <Poaps props={arkProfile}/>
    </Widget>,
    ...HACKATHON_WIDGETS_TOP_PART,
    <Widget canRender={!loading}>
      <TabContent arkProfile={arkProfile} loading={loading} />
    </Widget>,
  ]
  return (
    <>
      {defaultWidgets.map((w, i) => <React.Fragment key={i}>{w}</React.Fragment>)}
    </>
  )
}


// import axios from 'axios';
// import { useState, useEffect } from 'react';
// import { userInfo, Res } from '../../src/types';
// import { EditModal } from '../../components/editor/editmodal';
// import { UserInfo } from './components/userInfo';
// import { Bio } from './components/bio';
// import { Collectibles } from './components/widgets/content/collectibles';
// import { ArweaveActivity } from './components/widgets/content/activity';
// import { Selector } from './components/widgets/content/selector';
// // import { Divider } from './components/reusables';
// import { Sidebar } from './sidebar';
// import { Poaps } from './components/widgets/poaps';
// import CoverPage from './components/CoverPage';
// import GitPoapList from './components/widgets/gitpoaps/GitPoapList';
// import { Koii, ArweaveTransaction } from '../../src/types';
// import { arweaveTransactionHandler } from '../../src/utils';
// import { faSearch, faList } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { MagnifyingGlassIcon, ListBulletIcon } from '@heroicons/react/24/outline';
// import {BsGrid} from 'react-icons/bs'
