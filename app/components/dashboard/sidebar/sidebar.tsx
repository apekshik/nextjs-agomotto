import React from "react";
import Link from 'next/link';
import Image from "next/image";
import {RxSketchLogo, RxDashboard, RxPerson} from 'react-icons/rx';
import {HiOutlineShoppingBag} from 'react-icons/hi';
import {FiSettings } from 'react-icons/fi'

type SidebarProps = {
  children?: React.ReactNode;
};

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return (
    <div className="flex">
      <div className="fixed flex w-20 h-screen p-4 border-r-[1px] flex-col justify-between 
          bg-gradient-to-br from-black via-green-200 to-black text-white">
          <div className="flex flex-col items-center">
            <Link href={'/'}>
            <div className="bg-purple-500 text-white p-3 rounded-lg inline-block">
              <RxSketchLogo size={20} />
            </div>
            </Link>
            <span className="border-b-[1px] boder-gray-200 w-full p-2"></span>
            <Link href={'/'}>
            <div className="bg-purple-500 text-white p-3 rounded-lg inline-block">
              <RxDashboard size={20} />
            </div>
            </Link>
            <Link href={'/'}>
            <div className="bg-purple-500 text-white p-3 rounded-lg inline-block">
              <RxPerson size={20} />
            </div>
            </Link>
            <Link href={'/'}>
            <div className="bg-purple-500 text-white p-3 rounded-lg inline-block">
              <HiOutlineShoppingBag size={20} />
            </div>
            </Link>
            <Link href={'/'}>
            <div className="bg-purple-500 text-white p-3 rounded-lg inline-block">
              <FiSettings size={20} />
            </div>
            </Link>
          </div>
          <main className="ml-20 w-full">{children}</main>
      </div>
    </div>
  );
};

export default Sidebar;
