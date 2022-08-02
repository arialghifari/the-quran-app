import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookmarkList from "../components/BookmarkList";
import ChapterList from "../components/ChapterList";
import Loading from "../components/Loading";
import { pause } from "../reducers/audioSlice";
import { selectBookmarks } from "../reducers/firebaseSlice";
import { useQuranQuery } from "../services/quranApi";

function Home() {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const { data, error, isLoading } = useQuranQuery();

  const bookmarks = useSelector(selectBookmarks);

  useEffect(() => {
    dispatch(pause());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      {error ? (
        <p className="text-center">There was an error</p>
      ) : isLoading ? (
        <Loading />
      ) : data ? (
        <>
          <p className="text-lg font-medium text-zinc-800">📑 Bookmarks</p>
          <hr className="mb-4 border-2 border-b-zinc-300" />
          {bookmarks.length ? (
            <BookmarkList item={bookmarks} />
          ) : (
            <p>No bookmark</p>
          )}

          <p className="text-lg font-medium text-zinc-800 mt-8">📖 Surah</p>
          <hr className="mb-6 border-2 border-b-zinc-300" />
          <ChapterList item={data} />
        </>
      ) : null}
    </div>
  );
}

export default Home;
