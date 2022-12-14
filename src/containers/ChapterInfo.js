import React, { useEffect } from "react";
import parse from "html-react-parser";
import {
  useChapterDetailQuery,
  useChapterInfoQuery,
} from "../services/quranApi";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import { selectDarkmode } from "../reducers/firebaseSlice";

function ChapterInfo() {
  window.scrollTo(0, 0);

  const { chapter } = useParams();
  const darkmode = useSelector(selectDarkmode);

  useEffect(() => {
    darkmode
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [darkmode]);

  const {
    data: dataChapterDetail,
    error: errorChapterDetail,
    isLoading: isLoadingChapterDetail,
  } = useChapterDetailQuery(chapter);
  const {
    data: dataChapterInfo,
    error: errorChapterInfo,
    isLoading: isLoadingChapterInfo,
  } = useChapterInfoQuery(chapter);

  return (
    <div>
      {errorChapterDetail || errorChapterInfo ? (
        <p className="text-center dark:text-zinc-300">There was an error</p>
      ) : isLoadingChapterDetail || isLoadingChapterInfo ? (
        <Loading />
      ) : dataChapterDetail || dataChapterInfo ? (
        <div className="flex gap-6">
          <div className="basis-1/4">
            <Link
              to={`/${chapter}/1`}
              className="mb-4 flex items-center py-0.5 hover:bg-zinc-300 justify-center rounded-md dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              <img src="/ic_back.svg" alt="back" className="dark:invert" />
              Read Surah
            </Link>
            <div className="chapter-info w-full h-fit text-zinc-50 p-5 text-center rounded-md flex flex-col gap-2 dark:text-zinc-200">
              <p className="text-3xl font-bold">
                {dataChapterDetail.chapter.name_arabic}
              </p>
              <p className="text-lg font-bold uppercase">
                {dataChapterDetail.chapter.name_simple}
              </p>
              <p className="uppercase">
                {dataChapterDetail.chapter.translated_name.name}
              </p>
              <hr className="my-2" />
              <p>{dataChapterDetail.chapter.verses_count} Ayahs</p>
              <p className="capitalize">
                {dataChapterDetail.chapter.revelation_place}
              </p>
            </div>
          </div>

          <div className="format-text basis-3/4">
            <h2>Source</h2>
            <p>{dataChapterInfo.chapter_info.source}</p>
            {parse(dataChapterInfo.chapter_info.text)}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ChapterInfo;
