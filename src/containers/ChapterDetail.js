import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  useChapterVersesQuery,
  useChapterTranslationQuery,
  useChapterDetailQuery,
} from "../services/quranApi";
import VerseList from "../components/VerseList";
import AudioPlayer from "../components/AudioPlayer";

function ChapterDetail() {
  const { chapter } = useParams();

  const { data, error, isLoading } = useChapterVersesQuery(chapter);
  const {
    data: dataTranslation,
    error: errorTranslation,
    isLoading: isLoadingTranslation,
  } = useChapterTranslationQuery(chapter);
  const {
    data: dataChapterDetail,
    error: errorChapterDetail,
    isLoading: isLoadingChapterDetail,
  } = useChapterDetailQuery(chapter);

  return (
    <div>
      {error || errorTranslation || errorChapterDetail ? (
        <p>There was an error</p>
      ) : isLoading || isLoadingTranslation || isLoadingChapterDetail ? (
        <p>Loading...</p>
      ) : (data && dataTranslation) || dataChapterDetail ? (
        <div>
          <AudioPlayer />
          <div className="flex justify-between items-start mb-6">
            <div className="flex gap-4 items-start">
              <Link to="/" className="bg-zinc-50 rounded-full hover:bg-zinc-100">
                <img src="/ic_back.svg" alt="back" />
              </Link>
              <div className="text-zinc-800 uppercase">
                <p className="font-bold text-xl mb-1">
                  {dataChapterDetail.chapter.name_simple} ({" "}
                  {dataChapterDetail.chapter.name_arabic} )
                </p>
                <p>
                  {dataChapterDetail.chapter.translated_name.name}{" "}
                  <span className="text-zinc-600">•</span> 1-
                  {data.verses.length}{" "}
                  <span className="normal-case">Ayahs</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button className="w-fit bg-primary hover:bg-primary_hover text-zinc-50 py-1 px-2 rounded-md flex items-center gap-1">
                <img src="/ic_play_white.svg" alt="play" />
                Play Audio
              </button>
              <button className="w-fit hover:underline hover:text-underline underline-offset-2">
                Surah Info
              </button>
            </div>
          </div>
          {dataChapterDetail.chapter.bismillah_pre && (
            <div className="flex justify-center mb-10">
              <img
                src="/bismillah.svg"
                alt="Bismillahirrahmanirrahim"
                className="w-72"
              />
            </div>
          )}
          <VerseList data={data} dataTranslation={dataTranslation} />
        </div>
      ) : null}
    </div>
  );
}

export default ChapterDetail;
