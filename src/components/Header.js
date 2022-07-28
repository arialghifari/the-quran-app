import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="bg-default z-50 fixed top-0 left-0 right-0 flex justify-center py-5 shadow-sm">
      <div className="flex justify-between items-center container px-3">
        <div>
          <Link
            to="/"
            className="flex items-center gap-2 font-semibold text-zinc-700 text-lg"
          >
            <img src="/logo.svg" alt="The Quran logo" className="w-9" />
            The Quran
          </Link>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent border-2 border-zinc-400 text-zinc-700 p-1.5 pl-8 w-96 max-w-sm rounded-sm"
          />
          <div className="absolute top-0 left-0 h-full flex items-center justify-center px-2">
            <img src="/ic_search.svg" alt="search" className="w-5" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button>
            <img src="/ic_setting.svg" alt="setting" />
          </button>
          <button className="underline underline-offset-4 text-zinc-700">
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
