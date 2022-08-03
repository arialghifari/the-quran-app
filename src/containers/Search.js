import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import SearchList from "../components/SearchList";
import { useSearchQuery } from "../services/quranApi";

function Search() {
  // window.scrollTo(0, 0);
  const { query, page } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(page);
  const currentPageInt = parseInt(currentPage);

  const { data, error, isLoading } = useSearchQuery({
    query: query,
    page: currentPage,
  });

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const handlePrevPage = () => {
    if (currentPageInt === 1) return;

    navigate(`/search/${query}/${currentPageInt - 1}`);
  };

  const handleNextPage = () => {
    if (data.search.results.length < 20) return;

    navigate(`/search/${query}/${currentPageInt + 1}`);
  };

  return (
    <div className="container">
      {error ? (
        <p className="text-center">There was an error</p>
      ) : isLoading ? (
        <Loading />
      ) : data ? (
        <>
          <p className="text-zinc-800 font-semibold mb-4 dark:text-zinc-300">
            Search result for "{query}"
          </p>
          {data.search.total_results &&
          data.search.results.length &&
          currentPageInt > 0 ? (
            <>
              <SearchList item={data} />

              <div className="flex gap-4 mt-8 justify-center">
                <button
                  onClick={handlePrevPage}
                  className={`${
                    currentPageInt === 1
                      ? "border-2 border-primary/40 font-medium text-zinc-400 dark:text-zinc-600"
                      : "border-2 border-primary font-medium text-zinc-800 hover:bg-primary hover:text-zinc-50 dark:text-zinc-300 dark:hover:text-zinc-200"
                  }  rounded-md py-1 w-28`}
                >
                  Prev Page
                </button>
                <button
                  onClick={handleNextPage}
                  className={`${
                    data.search.results.length < 20
                      ? "border-2 border-primary/40 font-medium text-zinc-400 dark:text-zinc-600"
                      : "border-2 border-primary font-medium text-zinc-800 hover:bg-primary hover:text-zinc-50 dark:text-zinc-300 dark:hover:text-zinc-200"
                  }  rounded-md py-1 w-28`}
                >
                  Next Page
                </button>
              </div>
            </>
          ) : (
            <p className="dark:text-zinc-300">Not found</p>
          )}
        </>
      ) : null}
    </div>
  );
}

export default Search;
