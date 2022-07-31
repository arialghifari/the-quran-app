import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { pause, play, selectIsPlaying } from "../reducers/audioSlice";

function ChapterHeader({ item, verseLength }) {
  const dispatch = useDispatch();
  const { chapter } = useParams();
  const isPlaying = useSelector(selectIsPlaying);

  const togglePlay = () => {
    dispatch(play());
  };

  const togglePause = () => {
    dispatch(pause());
  };

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
          <button
            onClick={isPlaying ? togglePause : togglePlay}
            className="w-fit bg-primary hover:bg-primary_hover text-zinc-50 py-1 px-2 rounded-md flex items-center gap-1"
          >
            <img
              src={`/ic_${isPlaying ? "pause" : "play"}_white.svg`}
              alt="play"
            />
            {isPlaying ? "Pause" : "Play"} Audio
          </button>
          <Link
            to={`/${chapter}`}
            className="w-fit text-zinc-800 hover:bg-zinc-300 py-1 px-2 rounded-md flex justify-center items-center gap-1"
          >
            <img src="/ic_info.svg" alt="info" />
            Surah Info
          </Link>
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
