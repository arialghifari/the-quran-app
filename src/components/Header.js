import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="bg-default z-50 fixed top-0 left-0 right-0 flex justify-center py-3 shadow-sm">
      <div className="flex justify-between items-center container px-3">
        <div>
          <Link to="/" className="flex items-center gap-2 rounded-full hover:shadow-md">
            <img src="/logo.svg" alt="The Quran logo" className="w-9" />
          </Link>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="bg-zinc-100 border border-zinc-300 text-zinc-800 p-2 pl-11 w-[28rem] max-w-sm rounded-md"
          />
          <div className="absolute top-0 left-0 h-full flex items-center justify-center px-3">
            <img src="/ic_search.svg" alt="search" />
          </div>
        </div>

        <div className="flex items-center gap-8">
          <button className="p-1 hover:bg-zinc-300 rounded-full">
            <img src="/ic_setting.svg" alt="setting" />
          </button>
          <button className="text-zinc-800 hover:underline underline-offset-2">LOGIN</button>
        </div>
      </div>
    </div>
  );
}

export default Header;
