import React from "react";
import { Link } from "react-router-dom";
import { useChapterDetailQuery } from "../services/quranApi";

function BookmarkCard({ item }) {
  const chapter = item.split(":")[0];
  const verse = item.split(":")[1];

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
        <div className="w-fit whitespace-nowrap">
          <Link to={`/${chapter}/${verse}`}>
            <div className="logo w-fit text-zinc-50 py-1 px-4 rounded-md text-center dark:text-zinc-200">
              <p>{item}</p>
              <p>{dataChapterDetail.chapter.name_simple}</p>
            </div>
          </Link>
        </div>
      ) : null}
    </>
  );
}

export default BookmarkCard;
