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
import { useSelector } from "react-redux";
import { selectDarkmode } from "../reducers/firebaseSlice";

function ChapterDetail() {
  const { chapter } = useParams();
  const { data, error, isLoading } = useQuranQuery();
  const darkmode = useSelector(selectDarkmode);

  useEffect(() => {
    darkmode
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
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
