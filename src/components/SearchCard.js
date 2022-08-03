import React from "react";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import { useChapterDetailQuery } from "../services/quranApi";

function SearchCard({ item }) {
  const verseKey = item.verse_key.replace(":", "/");
  const chapter = item.verse_key.split(":")[0];

  const {
    data: dataChapterDetail,
    error: errorChapterDetail,
    isLoading: isLoadingChapterDetail,
  } = useChapterDetailQuery(chapter);

  return (
    <>
      {errorChapterDetail ? (
        <p className="text-center dark:text-zinc-300">There was an error</p>
      ) : isLoadingChapterDetail ? (
        <></>
      ) : dataChapterDetail ? (
        <div className="search-card">
          <div
            className="border-2 flex flex-col gap-4 p-7 rounded-md bg-zinc-50 dark:bg-zinc-800 dark:border-none"
            id={item.verse_key}
          >
            <p className="text-right font-serif text-zinc-800 font-semibold text-3xl leading-relaxed dark:text-zinc-300">
              {item.text}
            </p>
            <p className="mt-2 dark:text-zinc-300">
              {parse(item.translations[0].text)}
            </p>
            <hr className="border dark:border-zinc-900" />
            <div className="flex justify-between items-center">
              <p className="text-primary font-bold">
                {dataChapterDetail.chapter.name_simple} ({item.verse_key})
              </p>

              <div className="flex gap-3">
                <Link
                  to={`/${verseKey}`}
                  className="w-fit text-zinc-800 hover:bg-zinc-300 py-0.5 px-2 rounded-md flex justify-center items-center gap-1 dark:text-zinc-300 dark:hover:bg-zinc-900"
                >
                  Go to surah
                  <img
                    src="/ic_back.svg"
                    alt="info"
                    className="rotate-180 dark:invert"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default SearchCard;
