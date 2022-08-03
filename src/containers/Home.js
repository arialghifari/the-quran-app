import { doc, getDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import BookmarkList from "../components/BookmarkList";
import ChapterList from "../components/ChapterList";
import Loading from "../components/Loading";
import { auth, db } from "../config/firebase";
import {
  initialize,
  selectBookmarks,
  selectDarkmode,
} from "../reducers/firebaseSlice";

import { useQuranQuery } from "../services/quranApi";

function Home() {
  window.scrollTo(0, 0);
  const { data, error, isLoading } = useQuranQuery();
  const bookmarks = useSelector(selectBookmarks);
  const darkmode = useSelector(selectDarkmode);
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const getData = async () => {
        const userDocRef = doc(db, "users", user.uid);
        const dataSnap = await getDoc(userDocRef);

        dispatch(initialize(dataSnap.data()));
      };

      getData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    darkmode
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [darkmode]);

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
          {bookmarks.length ? (
            <BookmarkList item={bookmarks} />
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
