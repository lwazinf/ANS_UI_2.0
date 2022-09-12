import { BookOpenIcon, FaceSmileIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useAns } from 'ans-for-all';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { useRecoilState } from 'recoil';
import { isDarkMode } from '../../atoms';
import Favicon from '../../public/favicon.ico';
import Avatar from '../avatar';
import { Divider } from '../user/components/reusables';
import { User } from '../user/sidebar/user';
import { NavUser } from './NavUser';
import {SunIcon} from '@heroicons/react/24/outline'



function BarMenuItem() {
  const [toggle, setToggle] = useState(false);
  const {
    walletConnected,
    ansData,
    arconnectConnect,
    arconnectDisconnect,
    shortenAddress,
  } = useAns();
  
  const [isDark, setIsDark] = useRecoilState(isDarkMode);

  return (
    <section className='dropdown'>
        <button  onClick={() => setToggle(!toggle)}>
            <NavUser />
        </button>

        <article className='relative'>
            {
                toggle && (
                    <div className='dropdown-content bg-white text-black absolute z-50 py-5 px-2 right-1 shadow-xl 
                        rounded-xl mt-4 w-[272px] '>
                        <ul tabIndex={0} className='h-full'>
                            {
                                !walletConnected ? (
                                    <li className='py-2 px-2 w-full hover:bg-gray-200 h-full rounded-lg'>
                                        <Link href={"https://www.decent.land/"}  className="flex flex-row items-center ">
                                            <a target="_blank" rel="noopener noreferrer" className=' flex flex-row items-center space-x-3.5'>
                                                <Image src={Favicon} width={27} height={27} className='' alt="" />
                                                <h1>Go to Decent land</h1>
                                            </a>
                                        </Link>
                                    </li>
                                ) : (
                                    <li className="space-x-3.5 flex flex-row items-center py-3 px-2 hover:bg-gray-200 h-full rounded-lg">
                                        <Avatar ansData={ansData} options={{height:"56px", width:"56px"}}/>
                                        {/* nickname and label */}
                                        <div className="flex flex-col relative top-[0.5] ">
                                            <p className="text-lg font-semibold text-left">
                                                {ansData?.currentLabel}
                                                {/* CrazyFrog */}
                                            </p>
                                        </div>
                                    </li>
                                )
                            }
                            <Divider />
                            <li hidden={!walletConnected} className='py-2 px-2 w-full hover:bg-gray-200 h-full rounded-lg cursor-pointer'>
                                <Link href={`https://localhost:3000/p/${ansData?.currentLabel}`}  className=" flex flex-row items-center ">
                                    <div className=' flex flex-row items-center space-x-3.5'>
                                        <FaceSmileIcon height={20} width={20} color="black"/>
                                        <h1>My Profile</h1>
                                    </div>
                                </Link>
                            </li>
                            <li className='py-2 px-2 w-full hover:bg-gray-200 h-full rounded-lg'>
                                <Link href={"https://docs.decent.land/"}  className="flex flex-row items-center ">
                                    <a target="_blank" rel="noopener noreferrer" className=' flex flex-row items-center space-x-3.5'>
                                    <BookOpenIcon height={20} width={20} color="black"/>
                                        <h1>Documentation</h1>
                                    </a>
                                </Link>
                            </li>
                            <li className='py-2 px-2 w-full hover:bg-gray-200 h-full rounded-lg'>
                                {/* This is needs to be configured --> Temporarily disabled */}
                                <div onClick={() => {setIsDark(!isDark)}} className='cursor-pointer flex flex-row items-center space-x-3.5'>{ !isDark ? (
                                        <MoonIcon height={20} width={20} color="black"/>

                                    ):(
                                        <SunIcon height={20} width={20} color="black"/>
                                    )
                                }
                                    <h1>Dark Mode</h1>
                                </div>
                            </li>
                            <Divider />
                            {
                                walletConnected ? (
                                    <div onClick={() => (arconnectDisconnect as Function)()} className='cursor-pointer py-2 px-2 w-full hover:bg-gray-200 h-full rounded-lg'>
                                        <div className="flex flex-row items-center space-x-3.5">
                                        <FiLogOut height={20} width={20} color="black"/>
                                            <h1>Disconnect Wallet</h1>
                                        </div>
                                    </div>
                                ) : (
                                    <li className='cursor-pointer  py-2 px-2 w-full hover:bg-gray-200 h-full rounded-lg'>
                                        <div onClick={() => (arconnectConnect as Function)()} className="flex flex-row items-center space-x-3.5">
                                            <FiLogIn height={20} width={20} color="black"/>
                                            <h1>Connect Wallet</h1>
                                        </div>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                )
            }
        </article>
    </section>
  )
}

export default BarMenuItem