import React from "react";
import SearchCard from "./SearchCard";

function SearchList({ item }) {
  return (
    <div className="flex flex-col gap-6">
      {item.search.results.map((item) => (
        <SearchCard key={item.verse_id} item={item} />
      ))}
    </div>
  );
}

export default SearchList;
