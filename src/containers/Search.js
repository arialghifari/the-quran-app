import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SearchList from "../components/SearchList";
import { useSearchQuery } from "../services/quranApi";

function Search() {
  const { query, page } = useParams();
  const [currentPage, setCurrentPage] = useState(page);

  const { data, error, isLoading } = useSearchQuery({
    query: query,
    page: currentPage,
  });

  return (
    <div className="container">
      {error ? (
        <p>Error</p>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : data ? (
        <>
          <p className="text-zinc-800 font-semibold mb-4">
            Search result for "{query}"
          </p>
          {data.search.total_results ? <SearchList item={data} /> : "Not found"}
        </>
      ) : null}
    </div>
  );
}

export default Search;
