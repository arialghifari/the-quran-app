import React from "react";

function ChapterHeader({ item, verseLength }) {
  return (
    <>
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-4 items-start">
          <div className="text-zinc-800 uppercase">
            <p className="font-bold text-xl mb-1">
              {item.chapter.name_simple} ( {item.chapter.name_arabic} )
            </p>
            <p>
              {item.chapter.translated_name.name}{" "}
              <span className="text-zinc-600">•</span> 1-
              {verseLength} <span className="normal-case">Ayahs</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <button className="w-fit bg-primary hover:bg-primary_hover text-zinc-50 py-1 px-2 rounded-md flex items-center gap-1">
            <img src="/ic_play_white.svg" alt="play" />
            Play Audio
          </button>
          <button className="w-fit hover:underline hover:text-underline underline-offset-2">
            More Surah Info
          </button>
        </div>
      </div>

      {item.chapter.bismillah_pre && (
        <div className="flex justify-center mb-10">
          <img
            src="/bismillah.svg"
            alt="Bismillahirrahmanirrahim"
            className="w-72"
          />
        </div>
      )}
    </>
  );
}

export default ChapterHeader;
