import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchOnClick = () => {
    if (!searchQuery) return;
    navigate(`/search/${searchQuery}/1`);
  };

  const handleSearchOnEnter = (key) => {
    if (!searchQuery) return;
    if (key === "Enter") navigate(`/search/${searchQuery}/1`);
  };

  return (
    <div className="bg-default z-50 fixed top-0 left-0 right-0 flex justify-center py-3 shadow-sm">
      <div className="flex justify-between items-center container px-3">
        <div>
          <Link to="/" className="logo flex items-center gap-2 rounded-full">
            <img src="/logo.svg" alt="The Quran logo" className="w-9" />
          </Link>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="bg-zinc-100 border border-zinc-300 text-zinc-800 p-2 pl-11 w-[28rem] max-w-sm rounded-md"
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={(e) => handleSearchOnEnter(e.key)}
          />
          <div className="absolute top-0 left-0 h-full flex items-center justify-center px-3">
            <button onClick={handleSearchOnClick}>
              <img src="/ic_search.svg" alt="search" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="p-1 hover:bg-zinc-300 rounded-full">
            <img src="/ic_setting.svg" alt="setting" />
          </button>
          
          <Link to="/login" className="text-zinc-800 py-1 px-2 rounded-md hover:bg-zinc-300">
            LOGIN
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
