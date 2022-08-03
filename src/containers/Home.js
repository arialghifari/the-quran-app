import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookmarkList from "../components/BookmarkList";
import ChapterList from "../components/ChapterList";
import Loading from "../components/Loading";
import { initialize, selectDarkmode } from "../reducers/firebaseSlice";

import { useQuranQuery } from "../services/quranApi";

function Home() {
  window.scrollTo(0, 0);
  const { data, error, isLoading } = useQuranQuery();
  const dispatch = useDispatch();

  const darkmode = useSelector(selectDarkmode);
  const localData = JSON.parse(localStorage.getItem("the_quran_app"));

  useEffect(() => {
    localData?.darkmode
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [darkmode]);

  useEffect(() => {
    dispatch(initialize(localData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      {error ? (
        <p className="text-center dark:text-zinc-300">There was an error</p>
      ) : isLoading ? (
        <Loading />
      ) : data ? (
        <>
          <p className="text-lg font-medium text-zinc-800 dark:text-zinc-300">
            📑 Bookmarks
          </p>
          <hr className="mb-4 border border-zinc-300 dark:border-zinc-800" />
          {localData?.bookmarks.length ? (
            <BookmarkList item={localData?.bookmarks} />
          ) : (
            <p className="dark:text-zinc-200">No bookmark</p>
          )}

          <p className="text-lg font-medium text-zinc-800 mt-8 dark:text-zinc-300">
            📖 Surah
          </p>
          <hr className="mb-6 border border-zinc-300 dark:border-zinc-800" />
          <ChapterList item={data} />
        </>
      ) : null}
    </div>
  );
}

export default Home;
