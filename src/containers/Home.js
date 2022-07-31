import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import ChapterList from "../components/ChapterList";
import { pause } from "../reducers/audioSlice";
import { useQuranQuery } from "../services/quranApi";

function Home() {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const { data, error, isLoading } = useQuranQuery();

  useEffect(() => {
    dispatch(pause());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      {error ? (
        <p>Error</p>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : data ? (
        <ChapterList item={data} />
      ) : null}
    </div>
  );
}

export default Home;
