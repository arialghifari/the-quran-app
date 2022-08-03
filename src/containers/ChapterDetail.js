import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useChapterVersesQuery,
  useChapterDetailQuery,
  useQuranQuery,
} from "../services/quranApi";
import VerseList from "../components/VerseList";
import AudioPlayer from "../components/AudioPlayer";
import ChapterHeader from "../components/ChapterHeader";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import {
  initialize,
  selectDarkmode,
} from "../reducers/firebaseSlice";

function ChapterDetail() {
  const { chapter } = useParams();
  const { data, error, isLoading } = useQuranQuery();
  const darkmode = useSelector(selectDarkmode);
  const localData = JSON.parse(localStorage.getItem("the_quran_app"));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialize(localData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localData?.darkmode
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [darkmode]);

  const {
    data: dataChapterVerses,
    error: errorChapterVerses,
    isLoading: isLoadingChapterVerses,
  } = useChapterVersesQuery(chapter);
  const {
    data: dataChapterDetail,
    error: errorChapterDetail,
    isLoading: isLoadingChapterDetail,
  } = useChapterDetailQuery(chapter);

  return (
    <div>
      {error || errorChapterDetail || errorChapterVerses ? (
        <p className="text-center dark:text-zinc-300">There was an error</p>
      ) : isLoading || isLoadingChapterDetail || isLoadingChapterVerses ? (
        <Loading />
      ) : data && dataChapterDetail && dataChapterVerses ? (
        <div>
          <AudioPlayer />
          <ChapterHeader
            item={dataChapterDetail}
            verseLength={dataChapterVerses.verses.length}
          />
          <VerseList />
        </div>
      ) : null}
    </div>
  );
}

export default ChapterDetail;
